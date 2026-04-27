import Link from "next/link";

// Carrinho mockado
const cartItems = [
  { id: 1, name: "Pizza Margherita", restaurant: "Pizza do Chef", price: 35.90, quantity: 1 },
  { id: 2, name: "Coca-Cola 2L", restaurant: "Pizza do Chef", price: 8.50, quantity: 2 },
];

export default function CartPage() {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
          <Link
            href="/restaurants"
            className="text-orange-600 font-medium hover:underline"
          >
            Ver restaurantes
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.restaurant}</p>
                <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
              </div>
              <span className="text-lg font-bold text-gray-800">
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-xl font-bold text-orange-600">
              R$ {total.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition shadow">
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
}
