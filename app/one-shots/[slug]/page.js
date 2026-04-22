import { createClient } from "@/lib/supabase/server";

export default async function OneShotPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: oneShot, error } = await supabase
        .from("One-Shots")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !oneShot) {
        return <div>One-shot not found</div>;
    }

    return (
        <div>
            <h1>{oneShot.title}</h1>
            <p>{oneShot.summary}</p>
        </div>
    );
}