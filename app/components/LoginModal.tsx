"use client";

import React, { useState } from "react";
import "../styles/body.css";
import "../styles/login-popup.css";
import "../styles/fonts.css";
import Image from "next/image";
import styles from "./SignupModal.module.css";
import axios from "axios";

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: (userData: any) => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.pulsetv.app/api/auth/login",
        {
          identifier: email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;

      sessionStorage.setItem("userToken", data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(data.user)); 

      if (onSuccess) onSuccess(data);

      onClose();
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login popup">
      <div className="close" onClick={onClose}>
        <Image
          src="/assets/login/close-small.svg"
          alt="Close Icon"
          width={40}
          height={40}
        />
      </div>

      <form className="info-form" onSubmit={handleLogin}>
        <div className="form">
          <div className="textbox" tabIndex={0}>
            <Image
              src="/assets/login/email.svg"
              alt="Email Icon"
              width={33}
              height={33}
            />
            <div className="divider" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form">
          <div className="textbox" tabIndex={0}>
            <Image
              src="/assets/login/password.svg"
              alt="Password Icon"
              width={33}
              height={33}
            />
            <div className="divider" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="actions">
          <label
            className={styles.remember}
            onClick={() => setRemember(!remember)}
          >
            <input
              type="checkbox"
              checked={remember}
              readOnly
              className={styles.hiddenCheckbox}
            />
            <span className={styles.checkbox}>
              {remember && (
                <svg viewBox="0 0 24 24" className={styles.checkIcon}>
                  <path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            Remember Me
          </label>

          <button
            type="submit"
            className="button"
            disabled={loading}
          >
            <h3 className="font-strong">{loading ? "Logging In..." : "Log In"}</h3>
          </button>

          <h5 className="font-semistrong forgpass">Forgot Password?</h5>
        </div>
      </form>
    </div>
  );
}
