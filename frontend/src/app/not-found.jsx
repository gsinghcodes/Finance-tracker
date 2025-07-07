export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-blue-50 to-indigo-100 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-red-100 p-8 w-full max-w-2xl text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-red-700">404</h2>
        <p className="text-lg text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold">Go Home</a>
      </div>
    </div>
  );
}
