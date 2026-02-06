"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

export function UsedPhoneGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [zoomIndex, setZoomIndex] = useState(0)
  const activeImage = images[activeIndex] || images[0]

  const openZoom = (index: number) => {
    setZoomIndex(index)
    setZoomOpen(true)
  }

  const closeZoom = () => {
    setZoomOpen(false)
  }

  const showPrev = () => {
    setZoomIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setZoomIndex((prev) => (prev + 1) % images.length)
  }

  useEffect(() => {
    if (!zoomOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeZoom()
      if (event.key === "ArrowLeft") showPrev()
      if (event.key === "ArrowRight") showNext()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [zoomOpen, images.length])

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => openZoom(activeIndex)}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      >
        <Image src={activeImage} alt={alt} fill className="object-cover" />
        <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" />
          Zoom
        </span>
      </button>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => {
                setActiveIndex(index)
                setZoomIndex(index)
              }}
              className={`relative h-20 w-20 flex-none overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 transition ${
                activeIndex === index
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-emerald-500/40"
              }`}
            >
              <Image src={image} alt={`${alt} ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={closeZoom}
            className="absolute inset-0 h-full w-full"
            aria-label="Close zoom"
          />
          <div className="relative z-[81] w-full max-w-5xl">
            <div className="relative h-[70vh] w-full overflow-hidden rounded-3xl bg-black">
              <Image
                src={images[zoomIndex]}
                alt={`${alt} zoom`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <button
              type="button"
              onClick={closeZoom}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 backdrop-blur dark:bg-slate-900/30 dark:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    showPrev()
                  }}
                  className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 backdrop-blur dark:bg-slate-900/30 dark:text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    showNext()
                  }}
                  className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 backdrop-blur dark:bg-slate-900/30 dark:text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
