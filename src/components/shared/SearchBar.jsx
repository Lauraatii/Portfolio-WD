import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const onQueryChange = (e) => setQuery(e.target.value);

  useEffect(() => {
    onSearch(query);
  }, [query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Type in to search"
        className={styles.searchBar}
        value={query}
        onChange={onQueryChange}
      />
    </div>
  );
}
