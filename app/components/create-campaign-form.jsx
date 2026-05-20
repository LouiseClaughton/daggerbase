"use client";

import { saveCampaign } from "../campaigns/actions";
import { useActionState, useState } from "react";
import RightArrow from "../assets/right-arrow";
import PlusIcon from "../assets/plus-icon";
import MinusIcon from "../assets/minus-icon";

export default function CreateCampaignForm() {
  const [state, action, isPending] = useActionState(saveCampaign, null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full gap-8">
      <div className="p-4 rounded-xl w-full flex flex-col border border-black">
        <div className="flex items-center gap-x-4">
          <h2 className="text-3xl">Add a new campaign</h2>
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
              name="title"
              placeholder="Campaign title"
              className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="start_date"
                placeholder="Start date"
                onClick={(e) => e.currentTarget.showPicker?.()}
                className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
              />
              <input
                type="date"
                name="end_date"
                placeholder="End date"
                onClick={(e) => e.currentTarget.showPicker?.()}
                className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
              />
            </div>

            <textarea
              name="summary"
              placeholder="Campaign summary"
              className="border border-gray-400 p-2 rounded-xl w-full bg-white min-h-[120px] outline-none"
            />

            <textarea
              name="overview"
              placeholder="Campaign overview"
              className="border border-gray-400 p-2 rounded-xl w-full bg-white min-h-[120px] outline-none"
            />

            <div className="flex gap-4">
              <select
                name="status"
                className="border border-gray-400 p-2 rounded-xl w-full bg-white outline-none"
                defaultValue="Upcoming"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
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
