import type { Pokemon } from "./getData";
import Image from "next/image";
import { useState } from "react";

function RenderPokemon({
  list,
  reRender,
  scoreBoard,
  setScoreBoard,
  setInMemory,
  inMemory,
}) {
  function onClick(name: string) {
    if (inMemory.includes(name)) {
      setScoreBoard(() => ({ ...scoreBoard, currentScore: 0 }));
      setInMemory([]);
      reRender();
      return;
    }
    if (scoreBoard.currentScore + 1 === 20) {
      setScoreBoard((previous) => ({
        ...previous,
        winCondition: true,
      }));
    }
    const newArray = [...inMemory];
    newArray.push(name);
    setInMemory(newArray);
    setScoreBoard((previous) => ({
      ...previous,
      currentScore: previous.currentScore + 1,
    }));
    if (scoreBoard.currentScore >= scoreBoard.bestScore) {
      setScoreBoard((previous) => ({
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

function RenderIndividual({ list, onClick }) {
  const [style, setStyle] = useState("");
  return (
    <ul className="grid grid-cols-3 grid-rows-2 gap-10 md:gap-15 md:grid-cols-4 lg:grid-cols-6 justify-center">
      {list.map((p: Pokemon) => (
        <li
          className={
            style +
            " hover:scale-150 hover:cursor-pointer transition-all justify-end gap-2 items-center flex flex-col col-span-1 w-20 md:w-40 lg:w-50"
          }
          key={p.name}
          onClick={() => {
            setStyle("opacity-0");
            setTimeout(() => onClick(p.name), 200);
          }}
        >
          <Image
            unoptimized
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

export { RenderIndividual, RenderPokemon };
