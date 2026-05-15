"use client";

import { saveCharacter } from "../characters/actions";
import { useActionState, useState } from "react";
import RightArrow from "../assets/right-arrow";
import PlusIcon from "../assets/plus-icon";
import MinusIcon from "../assets/minus-icon";

export default function CreateCharacterForm() {
  const [state, action, isPending] = useActionState(saveCharacter, null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full gap-8">
      <div className="p-4 rounded-xl w-full flex flex-col border border-black">
        <div className="flex items-center gap-x-4">
            <h2 className="text-3xl">Add a new character</h2>
    
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
            >
                {isOpen ? <MinusIcon /> : <PlusIcon />}
            </button>
        </div>
        <div
            className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isOpen ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"}
            `}
            >
            {state?.error && (
              <div className="text-red-600 text-sm">{state.error}</div>
            )}
            <form action={action} className="flex gap-4">
              <input
                type="text"
                name="title"
                placeholder="Character name"
                className="border border-gray-400 p-2 rounded-xl w-full bg-white"
                required
              />

              <button
                type="submit"
                disabled={isPending}
                className="bg-black text-white px-3 py-2 rounded-xl"
              >
                <RightArrow className="w-5 h-5" />
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}
