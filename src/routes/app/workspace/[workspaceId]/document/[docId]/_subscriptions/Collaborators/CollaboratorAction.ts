import { CurrentDocumentStore, type CurrentDocumentData } from "$lib/stores/Application";
import type AllCollaboratorEvents from "$lib/synchronization/document/collaborators/AllCollaboratorEvents.type";

export default class CollaboratorAction {
    public subscriptionName;

    constructor(store: CurrentDocumentData) {
        this.subscriptionName = `documentCollaboratorAction-${ store!.document.id }`
    };

    public handler(data: AllCollaboratorEvents) {
        switch (data.type) {
            case 'join':
                // Adding this collaborator to CurrentDocument store
                CurrentDocumentStore.addCollaborator(data.id);
                break;

            case 'mouseMove':
                CurrentDocumentStore.updateCollaborator(data.collaboratorId, {
                    mouse: {
                        x: data.x,
                        y: data.y,
                    },
                });
                break;

            default:
                break;
        }
    };
};