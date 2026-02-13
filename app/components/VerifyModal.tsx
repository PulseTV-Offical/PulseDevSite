"use client";

import { useState, useRef } from "react";
import styles from "./VerifyModal.module.css";
import axios from "axios";

interface VerifyModalProps {
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function VerifyModal({ email, onClose, onSuccess }: VerifyModalProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    // @ts-ignore
    const correctEmail = email.user.email
    console.log(verificationCode)
    if (verificationCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://api.pulsetv.app/api/auth/verify", 
        {
          email: correctEmail,
          code: verificationCode 
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )

      const data = response.data

      console.log(response.status)

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      alert("Verification code resent!");
    } catch (err) {
      alert("Failed to resend code");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.codeInputs}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={styles.codeBox}
            />
          ))}
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button
          onClick={handleVerify}
          className={styles.verifyBtn}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <button onClick={handleResend} className={styles.resendBtn}>
          Resend code
        </button>
      </div>
    </div>
  );
}