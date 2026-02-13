"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import SignupModal from "./components/SignupModal";
import VerifyModal from "./components/VerifyModal";
import LoginModal from "./components/LoginModal"; 
import "./styles/fonts.css"
const { version } = require("../package.json")

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showLogin, setShowLogin] = useState(false); 
  const [userEmail, setUserEmail] = useState("");

  const handleSignupSuccess = (email: string) => {
    setUserEmail(email);
    setShowSignup(false);
    setShowVerify(true);
  };

  useEffect(() => {
    document.body.style.overflow =
      showSignup || showVerify || showLogin ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSignup, showVerify, showLogin]);

  return (
    <main className="container-wrapper">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8986377482700205"
        crossOrigin="anonymous"
      />

      <div className="top-right">
        <button className="btn" onClick={() => setShowLogin(true)}>
          Login
        </button>
        <button className="btn signup-btn" onClick={() => setShowSignup(true)}>
          Sign Up
        </button>
      </div>

      <div className="container">
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

        <div className="ad-container">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8986377482700205"
            data-ad-slot="9477938028"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
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

        <footer>
          App Version: {version} © 2026 Pulse Streaming — Early Access Build
        </footer>
      </div>

      {showSignup && (
        <div className="modal-overlay">
          <SignupModal
            onClose={() => setShowSignup(false)}
            onSuccess={handleSignupSuccess}
          />
        </div>
      )}

      {showVerify && (
        <div className="modal-overlay">
          <VerifyModal
            email={userEmail}
            onClose={() => setShowVerify(false)}
            onSuccess={() => {
              setShowVerify(false);
              alert("Account verified! You can now login.");
            }}
          />
        </div>
      )}

      {showLogin && (
        <div className="modal-overlay">
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSuccess={() => {
              setShowLogin(false);
              alert("Logged in successfully!");
            }}
          />
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .top-right {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 12px;
        }

        .signup-btn {
          background-color: #e53935;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }

        .signup-btn:hover {
          background-color: #d32f2f;
        }

        .container-wrapper {
          min-height: 100vh;
          position: relative;
        }

        .ad-container {
          margin: 20px 0;
          text-align: center;
        }
      `}</style>
    </main>
  );
}
