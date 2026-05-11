"use client";

import { saveCampaign } from "@/app/campaigns/actions";
import { useActionState } from "react";
import RightArrow from "../assets/right-arrow";

export default function CreateCampaignForm() {
  const [state, action, isPending] = useActionState(saveCampaign, null);

  return (
    <div className="bg-[#395a4f] p-4 rounded-xl mb-8 w-full flex flex-col gap-4">
      <span className="font-semibold">Start a new campaign</span>
      {state?.error && (
        <div className="text-red-600 text-sm">{state.error}</div>
      )}
      <form action={action} className="flex gap-4">
        <input
          type="text"
          name="title"
          placeholder="Campaign title"
          className="border border-gray-400 p-2 bg-[#395a4f] rounded-xl w-full"
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
  );
}
