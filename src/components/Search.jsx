const Search = () => {
  return (
    <div className="text-center mb-5">
      <h1 className="text-xl font-semibold mb-2">What are you looking for?</h1>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-2 mb-2 md:mb-0 md:mr-2"
        />
        <button className="bg-pink-500 text-white rounded-lg px-4 py-2">Search</button>
      </div>
      <div className="mt-4">
        <span className="font-medium">Trending searches:</span>
        <div className="flex flex-wrap justify-center mt-2">
          <button className="bg-gray-200 rounded-lg px-3 py-1 m-1">landing page</button>
          <button className="bg-gray-200 rounded-lg px-3 py-1 m-1">e-commerce</button>
          <button className="bg-gray-200 rounded-lg px-3 py-1 m-1">mobile app</button>
          <button className="bg-gray-200 rounded-lg px-3 py-1 m-1">logo design</button>
          <button className="bg-gray-200 rounded-lg px-3 py-1 m-1">dashboard</button>
          <button className="bg-gray-200 rounded-lg px-3 py-1 m-1">icons</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
