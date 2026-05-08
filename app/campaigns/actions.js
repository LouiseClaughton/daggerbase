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

export async function saveCampaign(prevState, formData) {
    const supabase = await createClient()

    const id = formData.get('id')

    const title = formData.get('title')
    const summary = formData.get('summary')
    const start_date = formData.get('start_date')
    const end_date = formData.get('end_date')

    let slug = formData.get('slug')

    // Auto-generate slug if creating
    if (!slug && title) {
        slug = slugify(title)
    }

    const payload = {
        title,
        slug,
        summary,
        start_date,
        end_date
    }

    // UPDATE
    if (id) {
        const { data, error } = await supabase
            .from('Campaigns')
            .update(payload)
            .eq('id', id)
            .select()

        revalidatePath('/campaigns')
        revalidatePath(`/campaigns/${slug}`)

        return { success: true }
    }

    // CREATE
    const { data, error } = await supabase
        .from('Campaigns')
        .insert([payload])
        .select()
        .single()

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    redirect(`/campaigns/${data.slug}`)
}