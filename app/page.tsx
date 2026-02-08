"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import SignupModal from "./components/SignupModal";
import VerifyModal from "./components/VerifyModal";

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSignupSuccess = (email: string) => {
    setUserEmail(email);
    setShowSignup(false);
    setShowVerify(true);
  };

  // Run adsbygoogle push after component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      (window as any).adsbygoogle.push({});
    }
  }, []);

  return (
    <main className="container-wrapper">
      {/* Google AdSense script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8986377482700205"
        crossOrigin="anonymous"
      />

      <div className="container">
        <div className="top-right">
          <button className="btn login-btn disabled">Login</button>
          <button className="btn signup-btn disabled">Sign Up</button>
        </div>

        <Image
          src="/logo.png"
          alt="Pulse TV Logo"
          width={140}
          height={140}
          className="logo"
          priority
        />

        <h1>Pulse TV</h1>
        <p className="subtitle">
          Live streaming is coming soon.
          <br />
          Early supporters will get access first.
        </p>

        <div className="construction" />

        {/* Ad Container */}
        <div className="ad-container">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8986377482700205"
            data-ad-slot="1234567890" // replace with your Ad Slot ID
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <div className="buttons">
          <a
            href="https://www.patreon.com/cw/PulseStreaming"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Become an Early Supporter
          </a>

          <button
            className="btn"
            onClick={() =>
              window.open(
                "https://rootapp.gg/ACzbZCfBhQqxkhEqg-WftA",
                "_blank",
                "noopener"
              )
            }
          >
            Join Root Server
          </button>
        </div>

        <footer>App Verison: 0.0.5 © 2026 Pulse Streaming — Early Access Build</footer>
      </div>

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSuccess={handleSignupSuccess}
        />
      )}

      {showVerify && (
        <VerifyModal
          email={userEmail}
          onClose={() => setShowVerify(false)}
          onSuccess={() => {
            setShowVerify(false);
            alert("Account verified! You can now login.");
          }}
        />
      )}

      <style jsx>{`
        .top-right {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 12px;
        }

        .login-btn.disabled {
          background-color: #555;
          color: #888;
          cursor: not-allowed;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          border: none;
        }

        .signup-btn {
          background-color: #ef4444;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .signup-btn:hover {
          background-color: #dc2626;
        }

        .ad-container {
          margin: 20px 0;
          text-align: center;
        }
      `}</style>
    </main>
  );
}
