const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por marca o modelo..."
          className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
        <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
      </div>
    </div>
  );
};

export default SearchBar;