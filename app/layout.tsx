import "./globals.css";

export const metadata = {
  title: "EvoWeb",
  description: "Timeline de la evolución web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}