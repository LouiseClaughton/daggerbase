"use client";

import { saveCharacter } from "../characters/actions";
import { useActionState, useState } from "react";
import RightArrow from "../assets/right-arrow";
import PlusIcon from "../assets/plus-icon";
import MinusIcon from "../assets/minus-icon";

export default function CreateCharacterForm({ campaigns = [] }) {
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

          <form action={action} className="flex flex-col gap-4">
            <input
              type="text"
              name="character_name"
              placeholder="Character name"
              className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
              required
            />

            <input
              type="text"
              name="player_name"
              placeholder="Player name"
              className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="ancestry"
                placeholder="Ancestry"
                className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
              />
              <input
                type="text"
                name="class"
                placeholder="Class"
                className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
              />
            </div>

            <textarea
              name="backstory"
              placeholder="Backstory"
              className="border border-gray-400 p-2 rounded-xl w-full bg-white min-h-[120px] outline-none"
            />

            <div className="flex gap-4">
              <select
                name="campaign"
                className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
                defaultValue=""
              >
                <option value="">Select a campaign</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.title}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={isPending}
                className="bg-black text-white px-3 py-2 rounded-xl w-fit"
              >
                <RightArrow className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
