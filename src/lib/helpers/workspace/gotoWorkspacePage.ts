import { goto } from "$app/navigation";
import { CurrentWorkspaceStore } from "$lib/stores/Application";
import { getStore } from "../getStore";

export async function gotoWorkspacePage(page: string) {
    const store = await getStore(CurrentWorkspaceStore);

    // todo
    // throw error
    if (store == null || store.id == null) return;

    if (page.startsWith("/")) page = page.substring(1, page.length);
    goto(`/app/workspace/${ store.id }/${ page }`);
};