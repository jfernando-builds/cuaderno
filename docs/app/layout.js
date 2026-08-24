export const metadata = {
  title: "Evidence Organizer",
  description: "Applicant-controlled evidence organization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
