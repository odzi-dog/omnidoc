import type { CurrentDocumentData, CurrentWorkspaceData } from "$lib/stores/Application";
import type { DocumentBodyChangeEvent } from "$lib/synchronization";

export default class DocumentChange {
    public subscriptionName;

    constructor(store: CurrentDocumentData) {
        this.subscriptionName = `documentBodyChange-${ store!.document.id }`;
    };

    public handler(data: DocumentBodyChangeEvent) {
        console.log("document body changed");
    };
};