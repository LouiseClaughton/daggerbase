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

export async function saveAdventure(prevState, formData) {
    const supabase = await createClient();

    const id = formData.get('id');

    const title = formData.get('title');
    const summary = formData.get('summary');
    const start_date = formData.get('start_date');
    const end_date = formData.get('end_date');

    let slug = formData.get('slug');

    // Auto-generate slug if creating
    if (!slug && title) {
        slug = slugify(title)
    }

    const payload = {
        title,
        slug,
        summary,
        start_date: start_date || null,
        end_date: end_date || null,
        status: formData.get('status') || 'Upcoming'
    }

    // UPDATE
    if (id) {
        const { data, error } = await supabase
            .from("One-Shots")
            .update(payload)
            .eq("id", Number(id))
            .select();

        if (error) {
            return { error: error.message };
        }

        revalidatePath("/one-shots");
        revalidatePath(`/one-shots/${slug}`);

        return { success: true };
    }

    // CREATE
    const { createData, createError } = await supabase
        .from('One-Shots')
        .insert([payload])
        .select()
        .single()

    if (createError) {
        return { error: createError.message }
    }

    redirect(`/one-shots/${slug}`)
}

export async function deleteAdventure(formData) {
    const supabase = await createClient()

    const id = formData.get('id');
    let slug = formData.get('slug')

     // DELETE

    if (id) {
        const { deleteData, deleteError } = await supabase
            .from('One-Shots')
            .delete()
            .eq('id', id)
            .select()

        revalidatePath('/campaigns')
        revalidatePath(`/campaigns/${slug}`)

        redirect("/campaigns");
    }
}