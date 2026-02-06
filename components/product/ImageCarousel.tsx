"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface Props {
  images: string[]
  title: string
}

export default function ImageCarousel({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const activeImage = images[activeIndex]

  // ✅ Auto change image every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div>
      {/* MAIN IMAGE */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative aspect-square w-full rounded-2xl overflow-hidden border bg-muted cursor-zoom-in"
        aria-label="Open image fullscreen"
        disabled={!activeImage}
      >
        {activeImage ? (
          <img
            src={activeImage}
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
            No image
          </div>
        )}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 border-0 rounded-none bg-black/90 !top-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-full w-full items-center justify-center cursor-zoom-out"
            aria-label="Close image fullscreen"
          >
            {activeImage && (
              <img
                src={activeImage}
                alt={title}
                onClick={(event) => event.stopPropagation()}
                className={`max-h-[80vh] max-w-[94vw] object-contain transition-transform duration-300 ease-out sm:max-h-[90vh] ${
                  isOpen ? "scale-100" : "scale-95"
                }`}
              />
            )}
          </button>
        </DialogContent>
      </Dialog>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-16 w-16 shrink-0 rounded-xl overflow-hidden border transition sm:h-20 sm:w-20
                ${
                  i === activeIndex
                    ? "ring-2 ring-primary"
                    : "opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
