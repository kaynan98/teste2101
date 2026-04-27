import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Food Delivery - Cliente",
  description: "Peça comida dos melhores restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-orange-600">
              FoodDelivery
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-gray-700">
              <Link href="/restaurants" className="hover:text-orange-600 transition">
                Restaurantes
              </Link>
              <Link href="/cart" className="hover:text-orange-600 transition">
                Carrinho
              </Link>
              <Link href="/tracking" className="hover:text-orange-600 transition">
                Rastrear
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
