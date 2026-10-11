import "./globals.css";

export const metadata = {
  title: "First-Proof | Pilot Economics",
  description: "A transparent, fictional pilot review-cost calculator for Mexican small businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
