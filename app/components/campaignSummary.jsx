"use client";

import { useState } from "react";
import Link from "next/link";

export default function CampaignSummary({ title, summary, slug, startDate, endDate }) {
  const [open, setOpen] = useState(false);

  function formatDate(dateStr) {
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
  }

  return (
    <div className={`p-8 sm:p-16 gradient-border relative flex justify-center flex-col ${open ? "" : "h-[35vh]"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-amagro text-xl">{title}</h2>
        {/* <Link href={`/resources/${slug}`} className="font-amagro text-base underline">Downloads</Link> */}
      </div>
      <div className="mb-4">
        <span>
          {startDate && 
              formatDate(startDate)
          }
          {endDate ? (
              formatDate(endDate)
          ) : (
              <span> - Present</span>
          )}
        </span>
      </div>
      <div className={`${open ? "" : "line-clamp-2"} whitespace-pre-line`}>
        {summary}
      </div>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="text-purple-600 pt-2 hover:cursor-pointer self-start"
      >
        {open ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}