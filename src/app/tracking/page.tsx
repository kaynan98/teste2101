// Página de rastreamento mockada

export default function TrackingPage() {
  // Simula um pedido em andamento
  const order = {
    id: "#12345",
    status: "Em preparo",
    restaurant: "Pizza do Chef",
    estimatedTime: "30-40 min",
    steps: [
      { label: "Pedido confirmado", done: true },
      { label: "Em preparo", done: true },
      { label: "Saiu para entrega", done: false },
      { label: "Entregue", done: false },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rastrear Pedido</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
        <div className="mb-4">
          <p className="text-sm text-gray-500">Pedido {order.id}</p>
          <p className="text-lg font-semibold text-gray-800">{order.restaurant}</p>
          <p className="text-sm text-gray-600">Tempo estimado: {order.estimatedTime}</p>
        </div>
        <div className="space-y-3">
          {order.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.done
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.done ? "✓" : index + 1}
              </div>
              <span
                className={`text-sm ${
                  step.done ? "text-gray-800 font-medium" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-3 bg-orange-50 rounded-lg text-center">
          <p className="text-sm text-orange-700 font-medium">
            Status atual: {order.status}
          </p>
        </div>
      </div>
    </div>
  );
}
