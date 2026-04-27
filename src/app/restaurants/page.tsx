import Link from "next/link";

// Dados mockados para listagem
const restaurants = [
  { id: 1, name: "Pizza do Chef", rating: 4.5, deliveryTime: "30-40 min", image: "/placeholder.svg" },
  { id: 2, name: "Sushi House", rating: 4.8, deliveryTime: "20-30 min", image: "/placeholder.svg" },
  { id: 3, name: "Burger King", rating: 4.2, deliveryTime: "15-25 min", image: "/placeholder.svg" },
  { id: 4, name: "China Town", rating: 4.6, deliveryTime: "25-35 min", image: "/placeholder.svg" },
];

export default function RestaurantsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Restaurantes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
          >
            <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400">
              {/* Placeholder para imagem */}
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{restaurant.name}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <span className="text-yellow-500">★ {restaurant.rating}</span>
                <span>•</span>
                <span>{restaurant.deliveryTime}</span>
              </div>
              <Link
                href={`/restaurants/${restaurant.id}`}
                className="mt-3 inline-block text-orange-600 font-medium text-sm hover:underline"
              >
                Ver cardápio
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
