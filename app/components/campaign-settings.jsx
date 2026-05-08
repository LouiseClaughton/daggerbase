"use client";

import { saveCampaign } from "@/app/campaigns/actions";
import { useActionState, useEffect } from "react";
import RightArrow from "../assets/right-arrow";

export default function EditCampaignForm({
        campaign,
        open,
        onClose,
    }) {
        const [state, action, isPending] = useActionState(saveCampaign, null);

        // Close after successful save
        useEffect(() => {
            if (state?.success) {
            onClose();
            }
        }, [state, onClose]);

        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
        
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />

            {/* Modal */}
            <div
                className="relative bg-black text-white p-4 rounded-xl w-96 flex flex-col gap-4 z-10"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="font-semibold">
                    Edit Campaign
                </span>

                {state?.error && (
                    <div className="text-red-600 text-sm">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="text-green-600 text-sm">
                        Campaign updated successfully!
                    </div>
                )}

                <form
                    action={action}
                    className="flex flex-col gap-4"
                >
                    <input
                        type="hidden"
                        name="id"
                        value={campaign.id}
                    />

                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={campaign.title}
                        className="border border-gray-500 p-2 rounded-xl"
                        required
                    />

                    <label htmlFor="slug">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        defaultValue={campaign.slug}
                        className="border border-gray-500 p-2 rounded-xl"
                        required
                    />

                    <label htmlFor="start_date">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="start_date"
                        defaultValue={campaign.start_date}
                        className="border border-gray-500 p-2 rounded-xl"
                    />

                    <label htmlFor="end_date">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="end_date"
                        defaultValue={campaign.end_date}
                        className="border border-gray-500 p-2 rounded-xl"
                    />

                    <label htmlFor="summary">Summary</label>
                    <textarea
                        name="summary"
                        defaultValue={campaign.summary}
                        className="border border-gray-500 p-2 rounded-xl min-h-[120px]"
                    />

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-white text-black px-3 py-3 rounded-xl w-fit self-end"
                    >
                        {isPending
                        ? "Saving..."
                        : <RightArrow className="w-5 h-5" />}
                    </button>
                </form>
            </div>
        </div>
    );
}