import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">
        <FaSearch />
      </span>

      <input
        type="text"
        className="form-control"
        placeholder="Search Company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;