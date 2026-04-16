"use client";

import { useState } from "react";

export default function CampaignSummary({ summary }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`${open ? "" : "line-clamp-2"} whitespace-pre-line`}>
        {summary}
      </div>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="text-purple-600 pt-2 hover:cursor-pointer"
      >
        {open ? "Show Less" : "Show More"}
      </button>
    </>
  );
}