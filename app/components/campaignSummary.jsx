"use client";

import { useState } from "react";
import Link from "next/link";
import SettingsIcon from "../assets/settings-icon";
import EditCampaignForm from "./campaign-settings";

export default function CampaignSummary({ campaign }) {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function formatDate(dateStr) {
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
  }

  return (
    <div className={`p-8 sm:p-16 gradient-border relative flex justify-center flex-col ${open ? "" : "h-[35vh]"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">{campaign.title}</h2>
        <div onClick={() => setSettingsOpen(prev => !prev)}>
          <SettingsIcon />
        </div>
      </div>
      <div className="mb-4">
        <span>
          {campaign.start_date && 
              formatDate(campaign.start_date)
          }
          {campaign.end_date ? (
              <span> - {formatDate(campaign.end_date)}</span>
          ) : (
              <span> - Present</span>
          )}
        </span>
      </div>
      <div className={`${open ? "" : "line-clamp-2"} whitespace-pre-line`}>
        {campaign.summary}
      </div>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="text-purple-600 pt-2 hover:cursor-pointer self-start"
      >
        {open ? "Show Less" : "Show More"}
      </button>
      <EditCampaignForm
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          campaign={{
              id: campaign.id,
              title: campaign.title,
              slug: campaign.slug,
              start_date: campaign.start_date,
              end_date: campaign.end_date,
              summary: campaign.summary,
          }}
      />
    </div>
  );
}