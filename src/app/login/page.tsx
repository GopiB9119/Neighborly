"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

// --- Logo Component ---
export function NeighborlyLogo({
  className = '',
  size = 56,
  animated = false,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  const [blink, setBlink] = useState(false);
  const [blinkingDone, setBlinkingDone] = useState(false);

  // Remove isClient state entirely, only useEffect for animation
  useEffect(() => {
    if (!animated || blinkingDone) return;

    const blinkOnce = async () => {
      setBlink(true); // close
      setTimeout(() => {
        setBlink(false); // open again
        setBlinkingDone(true);
      }, 80); // eye stays closed for 80ms (faster blink)
    };

    // blink once after 1 second
    const timer = setTimeout(blinkOnce, 1000);

    return () => clearTimeout(timer);
  }, [animated, blinkingDone]);

  // Always render eyes open on initial render (SSR/CSR match)
  const eyeHeight = animated && blink ? 0.8 : 5;

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      style={animated ? { willChange: 'transform' } : undefined}
    >
      <div className="relative mb-2">
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="#000" />
          <path
            d="M16 36V24.5C16 21.4624 18.4624 19 21.5 19H34.5C37.5376 19 40 21.4624 40 24.5V36"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated Human-like Green Eyes (blink once) */}
          <rect
            x="21"
            y="31"
            width="4"
            height={eyeHeight}
            rx="1.5"
            fill="#86BC25"
            stroke="#fff"
            strokeWidth="0.5"
          />
          <rect
            x="31"
            y="31"
            width="4"
            height={eyeHeight}
            rx="1.5"
            fill="#86BC25"
            stroke="#fff"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800 font-logo drop-shadow-sm select-none" style={{ color: 'white' }}>
  Neighborly
  <span className="ml-1 animate-heartbeatColorCycle">.</span>
</span>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [logoScale, setLogoScale] = useState(0.6);
  const router = useRouter();

  useEffect(() => {
    // Animate logo from small to big
    if (showSplash) {
      setTimeout(() => setLogoScale(1.2), 100); // grow
      setTimeout(() => setLogoScale(1), 500);   // settle
      setTimeout(() => setShowSplash(false), 1200); // hide splash
    }
  }, [showSplash]);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <div
          style={{
            transform: `scale(${logoScale})`,
            transition: "transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.3s",
            opacity: 1,
          }}
        >
          <NeighborlyLogo size={96} animated />
        </div>
        <span className="mt-6 text-lg text-foreground font-semibold tracking-wide animate-pulse">
          Building stronger communities...
        </span>
      </div>
    );
  }

  // Main login UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card-bg rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-card-border">
        {/* Logo */}
        <NeighborlyLogo className="mb-4" />
        <p className="mb-6 text-secondary text-center text-base md:text-lg">
          Sign in or create an account to connect with your neighbors
        </p>
        <form className="w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-card-border rounded-md p-3 mb-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground bg-card-bg"
          />
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-card-border rounded-md p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground bg-card-bg"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary-dark focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675m1.675-2.175A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.336 3.236-.938 4.675m-1.675 2.175A9.956 9.956 0 0112 21c-1.657 0-3.236-.336-4.675-.938m-2.175-1.675A9.956 9.956 0 013 12c0-1.657.336-3.236.938-4.675m1.675-2.175A9.956 9.956 0 0112 3c1.657 0 3.236.336 4.675.938m2.175 1.675A9.956 9.956 0 0121 12c0 1.657-.336 3.236-.938 4.675m-1.675 2.175A9.956 9.956 0 0112 21c-1.657 0-3.236-.336-4.675-.938" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a6 6 0 1112 0 6 6 0 01-12 0z" /></svg>
              )}
            </button>
          </div>
          <div className="flex gap-2 w-full mb-3">
            <button
              onClick={async () => {
                try {
                  await signInWithEmailAndPassword(auth, email, password);
                  router.push("/");
                } catch (err: unknown) {
                  setError(err instanceof Error ? err.message : "An error occurred");
                }
              }}
              className="flex-1 bg-card-bg text-foreground py-2 rounded-md font-semibold border border-card-border hover:bg-primary hover:text-white transition-colors shadow-sm"
              type="button"
            >
              Login
            </button>
            <button
              onClick={async () => {
                try {
                  await createUserWithEmailAndPassword(auth, email, password);
                  router.push("/");
                } catch (err: unknown) {
                  setError(err instanceof Error ? err.message : "An error occurred");
                }
              }}
              className="flex-1 bg-primary text-white py-2 rounded-md font-semibold border border-primary-dark hover:bg-primary-dark hover:text-white transition-colors shadow-sm"
              type="button"
            >
              Signup
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-600 bg-red-50 border border-red-300 rounded-md p-3 w-full text-center mt-2">
            {error}
          </p>
        )}
        <div className="mt-6 flex flex-col items-center gap-1">
          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary-dark hover:underline"
          >
            <svg width={18} height={18} viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="#6366F1" />
              <path d="M7 10a3 3 0 106 0 3 3 0 00-6 0zm8 0a8 8 0 11-16 0 8 8 0 0116 0z" fill="#fff" />
            </svg>
            Visit our website
          </a>
        </div>
      </div>
    </div>
  );
}