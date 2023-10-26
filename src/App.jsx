import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import ReactLoading from "react-loading";

import FavPoke from "./components/FavPoke";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [loadding, setLoadding] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [favPoke, setFavPoke] = useState([]);
  // const [searchText, setSearchText] = useState("");
  const [filterPoke, setfilterPoke] = useState("");

  // Request Pokemon Data in API
  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoadding(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );
        setPokemon(response.data);
        setError("");
      } catch (error) {
        setError("Some ting went wrong", error);
      } finally {
        setLoadding(false);
      }
    };

    loadPoke();

    return () => abortController.abort;
  }, [number]);

  // function
  const previousNumber = () => {
    setNumber((number) => (number <= 1 ? setNumber(1) : number - 1));
  };

  const nextNumber = () => {
    setNumber((number) => number + 1);
  };

  const addFavPoke = () => {
    if (!favPoke.includes(pokemon)) {
      setFavPoke((oldPoke) => [...oldPoke, pokemon]);
    }
  };

  const removeAllFavPoke = () => {
    setFavPoke([]);
  };

  const removeFromFavPoke = (pokemon) => {
    setFavPoke((oldPoke) => oldPoke.filter((p) => p !== pokemon));
  };

  const filterPokemon = favPoke.filter((pokemon) => {
    return pokemon.name.includes(filterPoke);
  });

  console.log(pokemon);
  console.log("Your Pokemon Favourite =>", favPoke);

  return (
    <div className="pokemom">
      <div>
        {/* <input
          type="text"
          placeholder="ค้นหา Pokemon..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        /> */}
        {loadding ? (
          <ReactLoading type="spin" color="red" height={"20%"} width={"20%"} />
        ) : (
          <>
            <h1>{pokemon?.name}</h1>
            <button onClick={addFavPoke}>Add to favourite</button>
            <br />
            <img
              src={pokemon?.sprites?.other?.home?.front_default}
              alt={pokemon?.name}
              width={300}
            />
            <ul>
              {pokemon?.abilities?.map((abil, index) => (
                <li key={index}>{abil.ability.name}</li>
              ))}
            </ul>
            <button onClick={previousNumber}>Previous</button>
            <button onClick={nextNumber}>Next</button>
          </>
        )}
      </div>
      <div className="poke_fav">
        <h2>My Favourite Pokemon</h2>
        <div className="filter">
          <input
            type="text"
            className="filterText"
            placeholder="Pokemon"
            value={filterPoke}
            onChange={(e) => setfilterPoke(e.target.value)}
          />
          <button onClick={removeAllFavPoke}>Remove All</button>
        </div>
        {favPoke.length > 0 ? (
          <FavPoke
            favPoke={favPoke}
            filterPokemon={filterPokemon}
            remove={removeFromFavPoke}
          />
        ) : (
          <div style={{ marginTop: "250px" }}>
            <p>No favourite pokemon....</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
