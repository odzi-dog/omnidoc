import { error } from '@sveltejs/kit';
import { getDatabase } from '$lib/database';
import Post from '$lib/database/entities/Post';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const min = Number(url.searchParams.get('min') ?? '0');
    const max = Number(url.searchParams.get('max') ?? '1');
   
    const d = max - min;
   
    if (isNaN(d) || d < 0) {
      throw error(400, 'min and max must be numbers, and min must be less than max');
    }
   
    const random = min + Math.random() * d;

    console.log(await getDatabase().find(Post, {}));
    
    return new Response(String(random));
};