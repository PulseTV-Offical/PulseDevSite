"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./SignupModal.module.css";
import { jsx } from "react/jsx-runtime";

interface SignupModalProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function SignupModal({ onClose, onSuccess }: SignupModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    country: "",
    currency: "USD",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      onSuccess(formData.email);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#060606] overflow-clip relative rounded-[20px] size-full" data-name="Desktop">
      <div className="absolute bg-[#101011] h-[50px] left-[92px] rounded-[15px] top-[80px] w-[435px]" />
      <div className="absolute bg-[#101011] h-[50px] right-[58px] rounded-[15px] top-[80px] w-[435px]" />
      <div className="absolute bg-[#101011] h-[50px] right-[58px] rounded-[15px] top-[163px] w-[435px]" />
      <div className="absolute bg-[#101011] border-2 border-[#db2424] border-solid h-[50px] left-[92px] rounded-[15px] top-[163px] w-[435px]" />
      <div className="absolute bg-[#101011] h-[50px] left-[92px] rounded-[15px] top-[245px] w-[435px]" />

      <div
        className="absolute right-[10px] size-[30px] top-[8px] cursor-pointer"
        onClick={onClose}
      >
        <Image
          src="/assets/icons/icons8-cross-30-1.svg"
          style={{ backgroundColor: "#e53935" }}
          alt="Close icon"
          width={30}
          height={30}
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        />
      </div>

      <div className="absolute left-[104px] size-[30px] top-[173px]">
        <Image
          src="/assets/icons/icons8-user-30-1.svg"
          alt="Email icon"
          width={30}
          height={30}
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        />
      </div>

      <div className="absolute left-[104px] size-[30px] top-[91px]">
        <Image
          src="/assets/icons/icons8-user-30-4.svg"
          alt="Name icon"
          width={30}
          height={30}
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        />
      </div>

      <div className="absolute left-[588px] size-[30px] top-[91px]">
        <Image
          src="/assets/icons/icons8-user-30-2.svg"
          alt="Username icon"
          width={30}
          height={30}
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        />
      </div>

      <div className="absolute left-[102px] size-[26px] top-[257px]">
        <Image
          src="/assets/icons/icons8-lock-26-2.svg"
          alt="Lock icon"
          width={26}
          height={26}
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        />
      </div>

      <div className="absolute left-[588px] size-[30px] top-[261px]">
        <Image
          src="/assets/icons/icons8-user-30-3.svg"
          alt="Currency icon"
          width={30}
          height={30}
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        />
      </div>

    </div>
  );
}
