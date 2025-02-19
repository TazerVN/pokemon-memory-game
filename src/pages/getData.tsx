import RenderPokemon from "./components";
import { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  sprite: string;
  id: number;
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

const RNGlist: Array<number> = [];
const pokemonList: Array<Pokemon> = [];

async function getPokemonData(length: number): Promise<Pokemon> {
  let RNG = Math.floor(Math.random() * length) + 1;
  while (RNGlist.includes(RNG)) {
    RNG = Math.floor(Math.random() * length) + 1;
  }
  RNGlist.push(RNG);
  if (pokemonList.length < 1) {
    for (let i = 1; i <= length; i++) {
      const fetchData = async () => {
        try {
          const pokemonData: Response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + i,
            {
              method: "GET",
            }
          );
          const json = await pokemonData.json();
          const newPokemon: Pokemon = {
            name: json.name,
            sprite:
              json.sprites.versions["generation-v"]["black-white"].animated
                .front_default,
            id: i,
          };
          pokemonList[newPokemon.id] = newPokemon;
        } catch {
          return pokemonList[RNG];
        }
      };
      await fetchData();
    }
  }
  return pokemonList[RNG];
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
        try {
          const data: Pokemon = await getPokemonData(length);
          dummyList.push(data);
        } catch (err) {
          console.log(err);
        }
      }
      setList(dummyList);
      SetLoading(false);
    };
    loadData();
    return setList([]);
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
                RNGlist.length = 0;
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
