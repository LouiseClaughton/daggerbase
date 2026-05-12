// app/page.jsx
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import CreateCampaignForm from '../components/create-campaign-form';
import RightArrow from '../assets/right-arrow';
import Tag from '../components/tag';
import CreateAdventureForm from '../components/create-adventure-form';

export default async function Characters() {

  const supabase = await createClient();
  const [
      { data: campaigns, error: campaignsError },
      { data: oneShots, error: oneShotsError }
  ] = await Promise.all([
      supabase
            .from("Campaigns")
            .select(`
                *,
                Characters (*)
            `),

      supabase
            .from("One-Shots")
            .select(`
                *,
                Characters (*)
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
                              <h2 className="text-5xl">Characters</h2>
                          </div>

                          <div>
                              {/* <div className="w-full flex gap-8">
                                  <CreateCampaignForm />
                                  <CreateAdventureForm />
                              </div> */}
                            {combined.Characters?.length > 0 &&
                                <div className="grid grid-cols-3 gap-8">
                                    {combined.Characters.map((character) => (
                                        <div
                                            key={`${character.id}`}
                                            className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                        >
                                            <div className="flex justify-between">
                                                <h2 className="text-2xl">{character.character_name} / {character.player_name}</h2>
                                                <Link
                                                    href={`/characters/${character.slug}`}
                                                    className="bg-black text-white px-2 py-2 rounded-lg w-fit justify-self-end"
                                                >
                                                    <RightArrow className="w-5 h-5" />
                                                </Link>
                                            </div>
                                            <p>{character.ancestry} {character.class}</p>
                                        </div>
                                    ))}
                                </div>
                            }
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