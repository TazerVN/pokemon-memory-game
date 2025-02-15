import RenderPokemon from "./components";
import { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  sprite: string;
}

interface PokemonData {
  name: string;
  url: string;
}

interface ScoreBoard {
  currentScore: number;
  bestScore: number;
  round: number;
  winCondition: boolean;
}

let RNGlist: Array<number> = [];
async function getPokemonData() {
  try {
    let RNG = Math.floor(Math.random() * 20) + 1;
    while (RNGlist.includes(RNG)) {
      RNG = Math.floor(Math.random() * 20) + 1;
    }
    RNGlist.push(RNG);
    const pokemonData = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + RNG.toString(),
      {
        method: "GET",
      }
    );
    const json = await pokemonData.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

function GeneratePokemon(length: number) {
  const [inMemory, setInMemory] = useState<string[]>([]);
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard>({
    currentScore: 0,
    bestScore: 0,
    round: 0,
    winCondition: false,
  });

  const [list, setList] = useState<Pokemon[]>([]);
  const [loading, SetLoading] = useState<boolean>(false);

  useEffect(() => {
    const dummyList: Array<Pokemon> = [];
    const loadData = async () => {
      SetLoading(true);
      for (let i = 0; i < length; i++) {
        const data = await getPokemonData();
        const newPokemon: Pokemon = {
          name: data.name,
          sprite:
            data.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
        };
        dummyList.push(newPokemon);
      }
      if (dummyList.length <= 0) {
        for (let i = 0; i < length; i++) {
          const dummyPokemon: Pokemon = {
            name: "dummy",
            sprite: "dummy",
          };
          dummyList.push(dummyPokemon);
        }
      }
      setList(dummyList);
      SetLoading(false);
    };
    loadData();
  }, [scoreBoard.round, scoreBoard.winCondition, length]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center gap-10">
        <h1 className="justify-center font-semibold text-xl md:text-lg">
          Score: {scoreBoard.currentScore}
        </h1>
        <h1 className="justify-center font-semibold text-xl md:text-lg">
          Best Score: {scoreBoard.bestScore}
        </h1>
      </div>
      {scoreBoard.winCondition ? (
        <div>You WIN! Restart the page to try again</div>
      ) : (
        <>
          {loading ? (
            <div className="flex h-10 w-20">Loading...</div>
          ) : (
            <RenderPokemon
              list={list}
              reRender={() => {
                RNGlist = [];
                setList([]);
                setScoreBoard((previous) => ({
                  ...previous,
                  round: previous.round + 1,
                }));
              }}
              scoreBoard={scoreBoard}
              setScoreBoard={setScoreBoard}
              setInMemory={setInMemory}
              inMemory={inMemory}
            ></RenderPokemon>
          )}
        </>
      )}
    </div>
  );
}

export type { Pokemon, PokemonData, ScoreBoard };
export default GeneratePokemon;
