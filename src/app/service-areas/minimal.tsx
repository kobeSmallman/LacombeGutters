export default function MinimalServiceAreas() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Service Areas - Minimal Version
      </h1>
      <div className="space-y-4">
        {['Red Deer', 'Lacombe', 'Blackfalds', 'Sylvan Lake', 'Bentley', 'Ponoka'].map(city => (
          <div key={city} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {city}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
