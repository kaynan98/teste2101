import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Peça sua comida favorita
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Escolha entre os melhores restaurantes da cidade e receba em casa.
      </p>
      <Link
        href="/restaurants"
        className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition shadow"
      >
        Ver Restaurantes
      </Link>
    </div>
  );
}
