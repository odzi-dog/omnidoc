import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
    console.log("locals:", locals);

    return await locals.validate();
};