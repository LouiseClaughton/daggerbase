'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
}

export async function saveCharacter(prevState, formData) {
    const supabase = await createClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        return { error: sessionError.message };
    }

    if (!session?.user) {
        return { error: 'Authentication required to save characters.' };
    }

    const id = formData.get('id');

    const character_name = formData.get('character_name');
    const player_name = formData.get('player_name');
    const ancestry = formData.get('ancestry');
    const character_class = formData.get('class');
    const backstory = formData.get('backstory');
    const campaignValue = formData.get('campaign');
    let slug = formData.get('slug');

    // Auto-generate slug if creating
    if (!slug && character_name) {
        slug = slugify(character_name)
    }

    const payload = {
        character_name,
        player_name,
        ancestry,
        class: character_class,
        backstory,
        campaign: campaignValue ? Number(campaignValue) : null,
        slug
    }

    // UPDATE
    if (id) {
        const { data, error } = await supabase
            .from("Characters")
            .update(payload)
            .eq("id", Number(id))
            .select();

        if (error) {
            return { error: error.message };
        }

        revalidatePath("/characters");
        revalidatePath(`/characters/${slug}`);

        return { success: true };
    }

    // CREATE
    const { data: createData, error: createError } = await supabase
        .from('Characters')
        .insert([payload])
        .select()
        .single()

    if (createError) {
        return { error: createError.message }
    }

    redirect(`/characters/${slug}`)
} 

export async function deleteCharacter(formData) {
    const supabase = await createClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        return { error: sessionError.message };
    }

    if (!session?.user) {
        return { error: 'Authentication required to delete characters.' };
    }

    const id = formData.get('id');
    let slug = formData.get('slug')

     // DELETE

    if (id) {
        const { data: deleteData, error: deleteError } = await supabase
            .from('Characters')
            .delete()
            .eq('id', id)
            .select()

        revalidatePath('/characters')
        revalidatePath(`/characters/${slug}`)

        redirect("/characters");
    }
}