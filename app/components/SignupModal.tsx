"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./SignupModal.module.css";
import axios from "axios";
import "../styles/fonts.css";

interface SignupModalProps {
  onClose: () => void;
  onSuccess: (userData: any) => void;
}

export default function SignupModal({ onClose, onSuccess }: SignupModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    day: "",
    month: "",
    year: "",
    country: "",
    currency: "",
    remember: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, password, email, day, month, year, country, currency } = formData;

    if (!username || !email || !password || !day || !month || !year || !country) {
      console.error("All required fields must be filled");
      return;
    }

    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      console.error("Day, month, and year must be numbers");
      return;
    }

    const dateOfBirth = new Date(yearNum, monthNum - 1, dayNum).getTime();

    const countryCode = country.trim().toUpperCase();
    if (countryCode.length !== 2) {
      console.error("Country must be 2-letter ISO code (e.g., US, GB)");
      return;
    }

    try {
      const res = await axios.post(
        "https://api.pulsetv.app/api/auth/register",
        {
          username,
          email,
          password,
          dateOfBirth,
          country: countryCode,
          currency,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onSuccess(res.data);
    } catch (err: any) {
      if (err.response) {
        console.error("Signup failed:", err.response.data);
      } else {
        console.error("Signup error:", err.message);
      }
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.close} onClick={onClose}>
        <Image
          src="/assets/login/close-small.svg"
          alt="Close"
          width={40}
          height={40}
        />
      </div>

      <form className={styles.infoForm} onSubmit={handleSubmit}>
        {[
          ["email", "Email", "/assets/login/email.svg"],
          ["username", "Username", "/assets/login/username.svg"],
          ["password", "Password", "/assets/login/password.svg"],
        ].map(([name, placeholder, icon]) => (
          <div className={styles.form} key={name}>
            <div className={styles.textbox}>
              <Image src={icon} alt="" width={33} height={33} />
              <div className={styles.divider} />
              <input
                name={name}
                type={name === "password" ? "password" : "text"}
                placeholder={placeholder}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}

        <div className={`${styles.form} ${styles.dob}`}>
          <div className={styles.textbox}>
            <Image src="/assets/login/dob.svg" alt="" width={33} height={33} />
            <div className={styles.divider} />
            <input name="day" placeholder="Day" onChange={handleChange} />
            <div className={styles.dividerInp} />
            <input name="month" placeholder="Month" onChange={handleChange} />
            <div className={styles.dividerInp} />
            <input name="year" placeholder="Year" onChange={handleChange} />
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.textbox}>
            <Image src="/assets/login/country.svg" alt="" width={33} height={33} />
            <div className={styles.divider} />
            <input
              name="country"
              placeholder="Country (2-letter code)"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.textbox}>
            <Image
              src="/assets/login/currency.svg"
              alt=""
              width={33}
              height={33}
            />
            <div className={styles.divider} />
            <select name="currency" onChange={handleChange}>
              <option value="">Select Currency</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="PHP">PHP</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <label className={styles.remember}>
            <input type="checkbox" name="remember" onChange={handleChange} />
            <span className={styles.checkbox}>
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
            </span>
            Remember Me
          </label>

          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
