
"use client";

import { saveAdventure } from "@/app/one-shots/actions";
import { useActionState } from "react";
import RightArrow from "../assets/right-arrow";

export default function CreateAdventureForm() {
  const [state, action, isPending] = useActionState(saveAdventure, null);

  return (
    <div className="p-4 rounded-xl sm:mb-8 w-full flex flex-col gap-4 border border-black">
        <span className="font-semibold">Start a new adventure</span>
        {state?.error && (
          <div className="text-red-600 text-sm">{state.error}</div>
        )}
        <form action={action} className="flex gap-4">
          <input
            type="text"
            name="title"
            placeholder="Adventure title"
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
  )
}