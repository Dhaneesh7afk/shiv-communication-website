import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"

const formatOrderNumber = (id: string) => {
  try {
    const hex = id.replace(/[^a-fA-F0-9]/g, "")
    const digits = BigInt(`0x${hex}`).toString().slice(-17).padStart(17, "0")
    return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10)}`
  } catch {
    return id.slice(-12)
  }
}

const formatINR = (value: number) => {
  const formatted = new Intl.NumberFormat("en-IN").format(value)
  return `INR ${formatted}`
}

const wrapText = (
  text: string,
  maxWidth: number,
  font: any,
  size: number
) => {
  const words = text.split(" ")
  const lines: string[] = []
  let line = ""
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, size)
    if (width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = testLine
    }
  }
  if (line) lines.push(line)
  return lines
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()
  const order = await Order.findOne({ _id: id, userId: session.user.id }).lean()
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  if (order.status !== "DELIVERED") {
    return NextResponse.json({ error: "Invoice available after delivery." }, { status: 403 })
  }

  const orderNumber = formatOrderNumber(order._id.toString())
  const invoiceDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const paymentMethod =
    order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id
      ? "Online – Razorpay"
      : "Pay on Delivery"

  const shippingName = order.userSnapshot?.name || order.customer?.name || "Customer"
  const shippingPhone = order.userSnapshot?.phone || order.customer?.phone || ""
  const customerEmail = session.user?.email || ""

  const addressLines = order.userSnapshot?.address
    ? [
        order.userSnapshot.address.line1,
        order.userSnapshot.address.area,
        order.userSnapshot.address.city,
        order.userSnapshot.address.pincode,
      ].filter(Boolean)
    : order.customer?.address
      ? [order.customer.address]
      : []

  const items = order.items || []
  const subtotal = items.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0),
    0
  )
  const shippingCharge = 0
  const discount = 0
  const grandTotal = order.amount ?? subtotal

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89])
  const { width, height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const margin = 40
  let y = height - margin

  const drawText = (
    text: string,
    x: number,
    yPos: number,
    size = 11,
    bold = false,
    color = rgb(0.06, 0.09, 0.16)
  ) => {
    page.drawText(text, {
      x,
      y: yPos,
      size,
      font: bold ? fontBold : font,
      color,
    })
  }

  const drawRightText = (
    text: string,
    yPos: number,
    size = 11,
    bold = false,
    color = rgb(0.06, 0.09, 0.16)
  ) => {
    const useFont = bold ? fontBold : font
    const textWidth = useFont.widthOfTextAtSize(text, size)
    drawText(text, width - margin - textWidth, yPos, size, bold, color)
  }

  const muted = rgb(0.39, 0.45, 0.54)
  const lightGray = rgb(0.89, 0.91, 0.94)
  const accent = rgb(0.96, 0.55, 0.12)

  drawText("Shiv Communication", margin, y, 18, true)
  y -= 20
  const addressLinesStatic = [
    "Shop No. 18",
    "Sector 22, Block B",
    "Sangatpura Chowk",
    "Mandi Gobindgarh, Punjab 147301",
    "India",
  ]
  addressLinesStatic.forEach((line) => {
    drawText(line, margin, y, 10, false, muted)
    y -= 14
  })

  const headerRightY = height - margin
  drawRightText("INVOICE", headerRightY, 18, true, accent)
  drawRightText(`Invoice Number: ${orderNumber}`, headerRightY - 18, 10, false, muted)
  drawRightText(`Order ID: ${order._id.toString()}`, headerRightY - 32, 10, false, muted)
  drawRightText(`Invoice Date: ${invoiceDate}`, headerRightY - 46, 10, false, muted)
  drawRightText(`Payment Method: ${paymentMethod}`, headerRightY - 60, 10, false, muted)

  y = Math.min(y, headerRightY - 80)
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: lightGray,
  })
  y -= 24

  const columnGap = 24
  const columnWidth = (width - margin * 2 - columnGap) / 2

  drawText("Billed To", margin, y, 11, true)
  drawText("Ship To", margin + columnWidth + columnGap, y, 11, true)
  y -= 16

  const leftStartY = y
  let leftY = leftStartY
  drawText(shippingName, margin, leftY, 10, true)
  leftY -= 14
  if (shippingPhone) {
    drawText(shippingPhone, margin, leftY, 10, false, muted)
    leftY -= 14
  }
  if (customerEmail) {
    drawText(customerEmail, margin, leftY, 10, false, muted)
    leftY -= 14
  }

  let rightY = leftStartY
  if (addressLines.length) {
    addressLines.forEach((line) => {
      drawText(line, margin + columnWidth + columnGap, rightY, 10, false, muted)
      rightY -= 14
    })
  } else {
    drawText("No address provided.", margin + columnWidth + columnGap, rightY, 10, false, muted)
    rightY -= 14
  }

  y = Math.min(leftY, rightY) - 18
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: lightGray,
  })
  y -= 18

  const tableHeaderHeight = 24
  const rowPadding = 8
  const colWidths = [30, 235, 60, 90, 100]
  const tableX = margin

  const drawTableHeader = () => {
    page.drawRectangle({
      x: tableX,
      y: y - tableHeaderHeight,
      width: width - margin * 2,
      height: tableHeaderHeight,
      color: lightGray,
    })
    const headers = ["#", "Item Description", "Qty", "Unit Price (INR)", "Total (INR)"]
    let x = tableX + 6
    headers.forEach((header, idx) => {
      drawText(header, x, y - 16, 9, true)
      x += colWidths[idx]
    })
    y -= tableHeaderHeight + 6
  }

  drawTableHeader()

  const addPageIfNeeded = (minHeight: number) => {
    if (y - minHeight < margin + 60) {
      const newPage = pdfDoc.addPage([595.28, 841.89])
      y = newPage.getSize().height - margin
      page.drawText("", { x: 0, y: 0 }) // keep TS happy for page type
      return newPage
    }
    return page
  }

  let currentPage = page
  items.forEach((item: any, index: number) => {
    const description = item.title || "Item"
    const lines = wrapText(description, colWidths[1] - 12, font, 10)
    const rowHeight = Math.max(20, lines.length * 12 + rowPadding)

    if (y - rowHeight < margin + 120) {
      currentPage = pdfDoc.addPage([595.28, 841.89])
      y = currentPage.getSize().height - margin
      currentPage.drawLine({
        start: { x: margin, y },
        end: { x: width - margin, y },
        thickness: 1,
        color: lightGray,
      })
      y -= 12
      drawTableHeader()
    }

    let x = tableX + 6
    drawText(String(index + 1), x, y - 12, 9)
    x += colWidths[0]
    lines.forEach((line: string, lineIndex: number) => {
      drawText(line, x, y - 12 - lineIndex * 12, 10)
    })
    x += colWidths[1]
    drawText(String(item.quantity || 0), x, y - 12, 10)
    x += colWidths[2]
    drawText(String(item.price || 0), x, y - 12, 10)
    x += colWidths[3]
    const total = (item.price || 0) * (item.quantity || 0)
    drawText(String(total), x, y - 12, 10)

    y -= rowHeight
  })

  y -= 12

  const summaryWidth = 200
  const summaryX = width - margin - summaryWidth
  const summaryY = Math.max(y, margin + 120)
  currentPage.drawRectangle({
    x: summaryX,
    y: summaryY - 120,
    width: summaryWidth,
    height: 120,
    borderColor: lightGray,
    borderWidth: 1,
    color: rgb(0.98, 0.99, 1),
  })
  drawText("Subtotal", summaryX + 12, summaryY - 24, 10, false, muted)
  drawRightText(formatINR(subtotal), summaryY - 24, 10, false, muted)
  drawText("Shipping", summaryX + 12, summaryY - 44, 10, false, muted)
  drawRightText(formatINR(shippingCharge), summaryY - 44, 10, false, muted)
  drawText("Discount", summaryX + 12, summaryY - 64, 10, false, muted)
  drawRightText(formatINR(discount), summaryY - 64, 10, false, muted)
  drawText("Grand Total", summaryX + 12, summaryY - 90, 11, true)
  drawRightText(formatINR(grandTotal), summaryY - 90, 11, true)

  y = summaryY - 140
  drawText("Payment Status: Paid", margin, y, 10, true, rgb(0.06, 0.52, 0.27))
  drawText(`Gateway: ${paymentMethod}`, margin, y - 14, 10, false, muted)

  y -= 40
  currentPage.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: lightGray,
  })
  y -= 14
  drawText(
    "This is a computer generated invoice and does not require signature.",
    margin,
    y,
    9,
    false,
    muted
  )
  y -= 12
  drawText("For support, contact Shiv Communication.", margin, y, 9, false, muted)
  drawText("Thank you for shopping with Shiv Communication.", margin, y - 12, 9, false, muted)

  const pdfBytes = await pdfDoc.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice-${orderNumber}.pdf"`,
    },
  })
}
