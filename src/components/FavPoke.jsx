/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./../App.scss";
import LikePoke from "./LikePoke";

function FavPoke(props) {
  const { favPoke, remove, filterPokemon } = props;

  return (
    <div className="poke_fav_con">
      {filterPokemon?.map((poke, index) => (
        <div key={index}>
          <h3>{poke.name}</h3>
          <img
            src={poke?.sprites?.other?.home?.front_default}
            alt={poke.name}
            width={120}
          />
          <div className="buttom_group">
            <button
              className="remove_btn"
              onClick={() => remove(poke)}
              title="remove"
            >
              X
            </button>
            <LikePoke />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavPoke;
