const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full py-4 placeholder:text-lg pr-2 placeholder:font-light border-gray-400 pl-14 border-[2px] focus:border-gray-800 outline-none rounded-[6px]"
        placeholder="Search"
      />

      <img
        src={"/public/magnifying-glass.png"}
        alt="Search Icon"
        className="absolute w-[38px] top-1/2 -translate-y-1/2 left-3 cursor-pointer
        "
      />
    </div>
  );
};

export default Search;
