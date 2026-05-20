"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import RightArrow from "../assets/right-arrow";
import PlusIcon from "../assets/plus-icon";
import MinusIcon from "../assets/minus-icon";

export default function CharactersCard({characters, openByDefault}) {
  const [isOpen, setIsOpen] = useState(openByDefault);

  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [characters, isOpen]);

  return (
    <div className="w-full h-full border border-black rounded-xl flex flex-col p-4">
      <div className="flex items-center gap-x-4">
        <h2 className="text-3xl">Characters</h2>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </button>
      </div>

      <div
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
        }}
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out opacity-100"
      >
        <div
          ref={contentRef}
          className="pt-4 flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8"
        >
          {characters?.map((character) => (
            <div
              key={character.id}
              className="w-full h-full border border-black rounded-xl flex flex-col gap-4 p-4"
            >
              <div className="flex justify-between">
                <h2 className="text-2xl">
                  {character.character_name} / {character.player_name}
                </h2>

                <Link
                  href={`/characters/${character.slug}`}
                  className="bg-black text-white px-2 py-2 rounded-lg w-fit justify-self-end"
                >
                  <RightArrow className="w-5 h-5" />
                </Link>
              </div>

              <p>
                {character.ancestry} {character.class}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}