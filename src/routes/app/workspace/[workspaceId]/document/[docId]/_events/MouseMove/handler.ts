import type { User } from "$lib/auth";
import { getStore } from "$lib/helpers/getStore";
import type { CurrentDocumentData } from "$lib/stores/Application";
import { SynchronizationStore } from "$lib/stores/Synchronization.store";
import type { UserData } from "$lib/stores/User.store";
import { UserStore } from "$lib/stores/User.store";
import type { CollaboratorMouseMoveEvent } from "$lib/synchronization";

export default async function (store: CurrentDocumentData, event: MouseEvent) {
    // Publishing this event to centrifugo room
    const client = SynchronizationStore.getClientInstance();
    if (!client) return;

    const userStore = await getStore<UserData>(UserStore);
    if (!userStore) return;

    client.publish(`documentCollaboratorAction-${ store!.document.id }`, {
        type: "mouseMove",

        collaboratorId: userStore.userId,
        x: event.clientX,
        y: event.clientY,
    } as CollaboratorMouseMoveEvent);
};