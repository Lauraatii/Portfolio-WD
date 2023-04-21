import styles from "./Home.module.css";
import Footer from "./shared/Footer";
import Navigation from "./shared/Navigation";
import PostCard from "./shared/PostCard";
import SearchBar from "./shared/SearchBar";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFilteredEns = (query) => {
    setIsLoading(true);

    fetch(`http://localhost:3000/ensembles/filter?search=${query}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const posts = [];

        for (const key in data) {
          const post = {
            id: key,
            ...data[key],
          };

          posts.push(post);
        }
        setPosts(posts);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      })
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    getFilteredEns("");
  }, []);

  return (
    <>
      <Navigation></Navigation>
      <div className={styles.landing}>
        <p className={styles.headline}>
          Stedet hvor amatørmusikere finder hinanden og spiller musik sammen
        </p>
        <img
          src="./assets/landing-img.png"
          alt="music notes"
          className={styles.picLand}
        ></img>
      </div>
      <SearchBar onSearch={getFilteredEns}></SearchBar>
      <div className={styles.cards}>
        
        <PostCard posts={posts} isLoading={isLoading} />
      </div>

      <Footer></Footer>
    </>
  );
}
