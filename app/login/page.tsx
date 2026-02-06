"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth"
import { firebaseApp } from "@/lib/firebaseClient"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier
  }
}

export default function LoginPage() {
  const next = useSearchParams().get("next") || "/"
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState("")
  const recaptchaRef = useRef<HTMLDivElement | null>(null)
  const auth = getAuth(firebaseApp)
  const { data: session } = useSession()

  useEffect(() => {
    if (!window.recaptchaVerifier && recaptchaRef.current) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaRef.current,
        { size: "invisible" }
      )
    }
  }, [auth])

  const handleGoogle = async () => {
    await signIn("google", { callbackUrl: next })
  }

  const sendOtp = async () => {
    setLoading(true)
    try {
      setPhoneError("")
      const trimmed = phone.trim()
      const isPlus = trimmed.startsWith("+")
      const digitsOnly = trimmed.replace(/\D/g, "")
      const stripped = digitsOnly.startsWith("0") && digitsOnly.length === 11 ? digitsOnly.slice(1) : digitsOnly
      const normalized = isPlus ? `+${digitsOnly}` : stripped.length === 10 ? `+91${stripped}` : `+${stripped}`
      if (!/^\+\d{10,15}$/.test(normalized)) {
        setPhoneError("Enter a valid phone number with country code (e.g. +919876543210).")
        return
      }
      const appVerifier = window.recaptchaVerifier!
      const confirmation = await signInWithPhoneNumber(auth, normalized, appVerifier)
      setConfirmationResult(confirmation)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    setLoading(true)
    try {
      if (!confirmationResult) return
      const userCredential = await confirmationResult.confirm(otp)
      const idToken = await userCredential.user.getIdToken()
      if (session?.user?.id) {
        await fetch("/api/auth/phone/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        })
        window.location.href = next
      } else {
        await signIn("credentials", { idToken, callbackUrl: next })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md cta-glass p-8 md:p-10">
        <div className="inline-flex items-center rounded-full border bg-background/60 backdrop-blur-sm px-4 py-1.5 mb-6 text-[10px] font-black tracking-wide text-muted-foreground">
          Customer Access
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-2">Login</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in with Google or verify your phone number.
        </p>

        <Button
          onClick={handleGoogle}
          className="w-full rounded-full font-black tracking-wide text-xs mb-4"
          variant="outline"
        >
          Continue with Google
        </Button>

        <div className="rounded-2xl bg-secondary/20 p-4 space-y-3">
          <input
            placeholder="Phone number (+91...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30"
          />
          {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
          {confirmationResult && (
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}
          {!confirmationResult ? (
            <Button
              onClick={sendOtp}
              className="w-full rounded-full font-black tracking-wide text-xs"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          ) : (
            <Button
              onClick={verifyOtp}
              className="w-full rounded-full font-black tracking-wide text-xs"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          )}
        </div>

        <div ref={recaptchaRef} id="recaptcha-container" />
      </div>
    </div>
  )
}
