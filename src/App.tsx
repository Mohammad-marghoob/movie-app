import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Search from "./components/Search";
import { API_BASE_URL, API_OPTIONS } from "./api/config";
import Spinner from "./components/Spinner";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

const fetchMovies = async () => {
  const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to get movies");

  const data = await response.json();
  return data;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMovies"],
    queryFn: fetchMovies,
  });

  console.log(data);

  return (
    <>
      <main>
        <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You Enjoy
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="all-movies">
            <h2>All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              <ul>
                {data.results.map((movie: Movie) => (
                  <li key={movie.id} className="text-white">
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
