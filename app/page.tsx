"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="container-wrapper">
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

        <footer>
          © 2026 Pulse Streaming — Early Access Build
        </footer>
      </div>
    </main>
  );
}
