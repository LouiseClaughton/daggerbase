// app/page.jsx
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import CreateCampaignForm from '../app/components/create-campaign-form';
import RightArrow from '../app/assets/right-arrow';
import Tag from '../app/components/tag';
import CreateAdventureForm from '../app/components/create-adventure-form';

export default async function Dashboard() {

  const supabase = await createClient();
  const [
      { data: campaigns, error: campaignsError },
      { data: oneShots, error: oneShotsError }
  ] = await Promise.all([
      supabase
          .from("Campaigns")
          .select(`
          *,
              Sessions (*),
              Characters (*)
          `),

      supabase
          .from("One-Shots")
          .select(`
          *,
              Sessions (*)
          `)
      ])

      if (campaignsError) throw campaignsError
      if (oneShotsError) throw oneShotsError

      const combined = [
      ...(campaigns || []).map(campaign => ({
          ...campaign,
          type: "Campaign"
      })),

      ...(oneShots || []).map(oneShot => ({
          ...oneShot,
          type: "One-Shot"
      }))
  ]

  return (
    <div className="h-screen w-full flex">
      <div className="bg-white w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
        <Suspense>
          <div className="w-full">
              <div className="bg-white text-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                  <div className="flex flex-col">
                      <div className="p-8 sm:p-16 relative sm:ml-20">
                          <div className="flex justify-between items-center mb-8">
                              <h2 className="text-5xl">Dashboard</h2>
                          </div>

                          <div>
                              <div className="w-full flex gap-8">
                                  <CreateCampaignForm />
                                  <CreateAdventureForm />
                              </div>

                              <div className="grid grid-cols-3 gap-8">
                                  {combined.map((item) => (
                                      <div
                                          key={`${item.type}-${item.id}`}
                                          className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                      >
                                          <h2 className="text-3xl">{item.title}</h2>
                                          <p className="line-clamp-5">{item.summary}</p>
                                          <div className="flex w-full justify-between">
                                              <div className="flex gap-2">
                                                  <Tag type={item.type} />
                                                  <Tag status={item.status} />
                                              </div>
                                              <Link
                                                  href={`/campaigns/${item.slug}`}
                                                  className="bg-black text-white px-3 py-3 rounded-xl w-fit justify-self-end"
                                              >
                                                  <RightArrow className="w-5 h-5" />
                                              </Link>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}