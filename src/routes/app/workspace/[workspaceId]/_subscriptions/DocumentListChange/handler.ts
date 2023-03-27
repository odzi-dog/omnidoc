import { CurrentWorkspaceStore, type CurrentWorkspaceData } from "$lib/stores/Application";
import type { DocumentListChangeEvent } from "$lib/synchronization";

export class DocumentListChange {
    public subscriptionName;

    constructor(workspace: CurrentWorkspaceData) {
        this.subscriptionName = `documentListChange-${ workspace?.id }`;
    };

    public handler(data: DocumentListChangeEvent) {
        if (data.type == "document") {
            // Adding this document to documents list
            CurrentWorkspaceStore.addEntity(data.type, data.document);
        } else {
            new Error("Unimplemented");
        };
    };
};