"use client";

import { useState, useEffect } from "react";

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  createdAt: string;
}

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customer: "João Silva",
      items: ["Pizza Margherita", "Coca-Cola"],
      total: 45.90,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      customer: "Maria Souza",
      items: ["Hambúrguer Artesanal", "Batata Frita", "Suco de Laranja"],
      total: 62.50,
      status: "preparing",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      customer: "Carlos Pereira",
      items: ["Salada Caesar", "Água"],
      total: 28.00,
      status: "ready",
      createdAt: new Date().toISOString(),
    },
  ]);

  const updateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "preparing":
        return "Preparando";
      case "ready":
        return "Pronto";
      case "delivered":
        return "Entregue";
      default:
        return status;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pedidos em Tempo Real</h1>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Em Preparo</p>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter((o) => o.status === "preparing").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Prontos</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === "ready").length}
          </p>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{order.customer}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{order.items.join(", ")}</p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                R$ {order.total.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2">
              {order.status === "pending" && (
                <button
                  onClick={() => updateStatus(order.id, "preparing")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Iniciar Preparo
                </button>
              )}
              {order.status === "preparing" && (
                <button
                  onClick={() => updateStatus(order.id, "ready")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  Marcar como Pronto
                </button>
              )}
              {order.status === "ready" && (
                <button
                  onClick={() => updateStatus(order.id, "delivered")}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
                >
                  Confirmar Entrega
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
