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

    const id = formData.get('id');

    const title = formData.get('title');
    let slug = formData.get('slug');

    // Auto-generate slug if creating
    if (!slug && title) {
        slug = slugify(title)
    }

    const payload = {
        title,
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
    const { createData, createError } = await supabase
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

    const id = formData.get('id');
    let slug = formData.get('slug')

     // DELETE

    if (id) {
        const { deleteData, deleteError } = await supabase
            .from('Characters')
            .delete()
            .eq('id', id)
            .select()

        revalidatePath('/characters')
        revalidatePath(`/characters/${slug}`)

        redirect("/characters");
    }
}