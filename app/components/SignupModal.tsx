"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./SignupModal.module.css";
import axios from "axios";
import "../styles/fonts.css";
import Select from "react-select";

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "MXN", label: "MXN - Mexican Peso" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "BRL", label: "BRL - Brazilian Real" },
  { value: "ZAR", label: "ZAR - South African Rand" },
];

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface SignupModalProps {
  onClose: () => void;
  onSuccess: (userData: any) => void;
}

interface CurrencyOption {
  value: string;
  label: string;
}

// Inner form component with captcha
function SignupForm({ onClose, onSuccess }: SignupModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();

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

  const [errors, setErrors] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCurrencyChange = (selected: CurrencyOption | null) => {
    setFormData((prev) => ({
      ...prev,
      currency: selected?.value || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");

    const { username, password, email, day, month, year, country, currency } = formData;

    if (!username || !email || !password || !day || !month || !year || !country) {
      setErrors("All required fields must be filled");
      return;
    }

    if (!currency) {
      setErrors("Please select a currency");
      return;
    }

    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setErrors("Day, month, and year must be numbers");
      return;
    }

    const dateOfBirth = new Date(yearNum, monthNum - 1, dayNum).getTime();

    const countryCode = country.trim().toUpperCase();
    if (countryCode.length !== 2) {
      setErrors("Country must be 2-letter ISO code (e.g., US, GB)");
      return;
    }

    if (!executeRecaptcha) {
      setErrors("reCAPTCHA not yet available");
      return;
    }

    try {
      const token = await executeRecaptcha("signup");

      const res = await axios.post(
        "https://api.pulsetv.app/api/auth/register",
        {
          username,
          email,
          password,
          dateOfBirth,
          country: countryCode,
          currency,
          captchaToken: token,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      onSuccess(res.data);
    } catch (err: any) {
      if (err.response) {
        setErrors(err.response.data.message || "Signup failed");
      } else {
        setErrors(err.message || "An error occurred");
      }
    }
  };

  return (
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
              value={formData[name as keyof typeof formData] as string}
            />
          </div>
        </div>
      ))}

      <div className={`${styles.form} ${styles.dob}`}>
        <div className={styles.textbox}>
          <Image src="/assets/login/dob.svg" alt="" width={33} height={33} />
          <div className={styles.divider} />
          <input 
            name="day" 
            placeholder="Day" 
            onChange={handleChange}
            value={formData.day}
          />
          <div className={styles.dividerInp} />
          <input 
            name="month" 
            placeholder="Month" 
            onChange={handleChange}
            value={formData.month}
          />
          <div className={styles.dividerInp} />
          <input 
            name="year" 
            placeholder="Year" 
            onChange={handleChange}
            value={formData.year}
          />
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
            value={formData.country}
          />
        </div>
      </div>

      <div className={styles.currencyWrapper}>
        <div className={styles.textbox}>
          <Image src="/assets/login/currency.svg" alt="" width={33} height={33} />
          <div className={styles.divider} />

          <div className={styles.selectContainer}>
            <Select
              options={currencyOptions}
              placeholder="Select Currency"
              onChange={handleCurrencyChange}
              isClearable={false}
              isSearchable={true}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#170000" : "transparent",
                  border: "none",
                  boxShadow: state.isFocused 
                    ? "inset 0 0 0 3px #db2424" 
                    : "none",
                  minHeight: "40px",
                  cursor: "pointer",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  backgroundColor: "#1c1c25",
                  border: "2px solid #db2424",
                  borderRadius: "10px",
                  marginTop: "5px",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: "300px",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#db2424"
                    : state.isFocused
                    ? "#2a2a35"
                    : "#1c1c25",
                  color: state.isSelected ? "white" : "#fff",
                  cursor: "pointer",
                  padding: "12px 15px",
                  "&:active": {
                    backgroundColor: "#db2424",
                  },
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                  fontFamily: "HarmonyOS",
                  fontSize: "16px",
                }),
                input: (base) => ({
                  ...base,
                  color: "white",
                  fontFamily: "HarmonyOS",
                  fontSize: "16px",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#999",
                  fontFamily: "HarmonyOS",
                  fontSize: "16px",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#db2424",
                  "&:hover": {
                    color: "#ff3333",
                  },
                }),
                clearIndicator: (base) => ({
                  ...base,
                  color: "#db2424",
                  "&:hover": {
                    color: "#ff3333",
                  },
                }),
              }}
            />
          </div>
        </div>
      </div>

      {errors && <div className={styles.error}>{errors}</div>}

      <div className={styles.actions}>
        <label className={styles.remember}>
          <input 
            type="checkbox" 
            name="remember" 
            onChange={handleChange}
            checked={formData.remember}
          />
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
  );
}

export default function SignupModal({ onClose, onSuccess }: SignupModalProps) {
  return (
    <div className={styles.popup}>
      <div className={styles.close} onClick={onClose}>
        <Image src="/assets/login/close-small.svg" alt="Close" width={40} height={40} />
      </div>

      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        useRecaptchaNet={true}
        scriptProps={{ async: true, defer: true, appendTo: "head", nonce: undefined }}
      >
        <SignupForm onClose={onClose} onSuccess={onSuccess} />
      </GoogleReCaptchaProvider>
    </div>
  );
}