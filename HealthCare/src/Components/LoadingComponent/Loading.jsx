function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4 text-lg text-gray-700 font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export { Loading };
