import "./globals.css";

export const metadata = {
  title: "Pulse TV — Under Construction",
  description: "Pulse TV early access landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
