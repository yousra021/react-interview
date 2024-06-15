import React, { useState, useEffect } from "react";
import { movies$ } from "../data/movies";
import "../style/display.css";

const Display = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    movies$
      .then((data) => setData(data))
      .catch((error) =>
        console.error("There was a problem fetching the movies:", error)
      );
  }, []);

  const calculateRatio = (likes, dislikes) => {
    const total = likes + dislikes;
    let likePercentage;
    if (total === 0) {
      likePercentage = 0;
    } else {
      likePercentage = (likes / total) * 100;
    }
    return likePercentage;
  };

  const deleteItem = (id) => {
    const newMovie = data.filter((movie) => movie.id !== id);
    setData(newMovie);
  };

  return (
    <div className="movies-container">
      {data ? (
        data.map((movie) => (
          <div key={movie.id} className="movie">
            <h2>{movie.title}</h2>
            <p>Categorie : {movie.category}</p>
            <div className="ratio-bar">
              <div
                className="likes"
                style={{
                  width: `${calculateRatio(movie.likes, movie.dislikes)}%`,
                }}
              ></div>
              <div
                className="dislikes"
                style={{
                  width: `${
                    100 - calculateRatio(movie.likes, movie.dislikes)
                  }%`,
                }}
              ></div>
            </div>
            <p>Likes : {movie.likes} </p>
            <p>Dislikes : {movie.dislikes}</p>
            <button onClick={() => deleteItem(movie.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Display;
