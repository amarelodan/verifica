import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VERIFICA — Antes de compartilhar, verifique",
  description: "Uma plataforma para investigar informações, comparar evidências e consultar fontes confiáveis.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
