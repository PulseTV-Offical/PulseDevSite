"use client";

import { useState } from "react";
import Image from "next/image";
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

  return (
    <main className="container-wrapper">
      <div className="container">
        <div className="top-right">
          <button className="btn login-btn disabled">Login</button>
          <button className="btn signup-btn disabled">
            Sign Up
          </button>
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
              window.open("https://rootapp.gg/ACzbZCfBhQqxkhEqg-WftA", "_blank", "noopener")
            }
          >
            Join Root Server
          </button>
        </div>

        <footer>© 2026 Pulse Streaming — Early Access Build</footer>
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
      `}</style>
    </main>
  );
}