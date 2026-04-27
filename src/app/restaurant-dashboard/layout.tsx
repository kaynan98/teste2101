import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Painel do Restaurante",
  description: "Gerencie seus pedidos e produtos",
};

export default function RestaurantDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/restaurant-dashboard" className="text-xl font-bold text-orange-600">
            Painel do Restaurante
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-gray-700">
            <Link href="/restaurant-dashboard" className="hover:text-orange-600 transition">
              Pedidos
            </Link>
            <Link href="/restaurant-dashboard/products" className="hover:text-orange-600 transition">
              Produtos
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
