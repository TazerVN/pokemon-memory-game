import type { Pokemon, ScoreBoard } from "./getData";
import Image from "next/image";
import { useEffect, useState } from "react";

interface pokemonComponent {
  list: Array<Pokemon>;
  reRender: CallableFunction;
  scoreBoard: ScoreBoard;
  setScoreBoard: CallableFunction;
  setInMemory: CallableFunction;
  inMemory: Array<string>;
}

interface individualComp {
  list: Array<Pokemon>;
  onClick: CallableFunction;
}

function RenderPokemon({
  list,
  reRender,
  scoreBoard,
  setScoreBoard,
  setInMemory,
  inMemory,
}: pokemonComponent) {
  function onClick(name: string) {
    if (inMemory.includes(name)) {
      setScoreBoard(() => ({ ...scoreBoard, currentScore: 0 }));
      setInMemory([]);
      reRender();
      return;
    }
    if (scoreBoard.currentScore + 1 === 20) {
      setScoreBoard((previous: ScoreBoard) => ({
        ...previous,
        winCondition: true,
      }));
    }
    const newArray = [...inMemory];
    newArray.push(name);
    setInMemory(newArray);
    setScoreBoard((previous: ScoreBoard) => ({
      ...previous,
      currentScore: previous.currentScore + 1,
    }));
    if (scoreBoard.currentScore >= scoreBoard.bestScore) {
      setScoreBoard((previous: ScoreBoard) => ({
        ...previous,
        bestScore: previous.currentScore,
      }));
    }

    reRender();
  }

  return (
    <div className="flex justify-center items-center">
      <RenderIndividual list={list} onClick={onClick}></RenderIndividual>
    </div>
  );
}

function RenderIndividual({ list, onClick }: individualComp) {
  const currentList: Array<Pokemon> = list;
  if (currentList.length < 0) {
    const dummy: Pokemon = {
      name: "dummy",
      sprite: "/dummy",
      id: 0,
    };
    currentList.push(dummy);
  }
  const [style, setStyle] = useState("");

  useEffect(() => {
    setStyle("");
  }, [list]);
  return (
    <ul className="grid grid-cols-3 grid-rows-2 gap-10 md:gap-15 md:grid-cols-4 lg:grid-cols-6 justify-center">
      {currentList.map((p: Pokemon) => (
        <li
          className={
            style +
            " hover:scale-150 hover:cursor-pointer transition-all justify-end gap-2 items-center flex flex-col col-span-1 w-20 md:w-40 lg:w-50"
          }
          key={p.id}
          onClick={() => {
            setStyle("opacity-0");
            setTimeout(() => onClick(p.name), 200);
          }}
        >
          <Image
            src={p.sprite}
            alt={p.name + " sprite"}
            width={100}
            height={100}
            sizes="5em"
          ></Image>
          <div className="flex justify-center">{p.name.toUpperCase()}</div>
        </li>
      ))}
    </ul>
  );
}

export default RenderPokemon;
export { RenderIndividual, RenderPokemon };
