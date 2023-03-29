import type { FlatWorkspaceDocument } from "$lib/database/entities";
import EntityType from "$lib/database/entities/EntityType";
import { getStore } from "$lib/helpers/getStore";

export enum DocumentHandlerHooks {
    ON_DELETE = "ON_DELETE",
};

type HooksMap = Map<DocumentHandlerHooks, (document: DocumentHandler) => void>;

export class DocumentHandler implements FlatWorkspaceDocument {
    public type = EntityType.DOCUMENT;

    public id: string;
    public title: string;
    public body?: string;
    public workspace: string;
    public folder?: string;

    public hooks: HooksMap = new Map();
    
    constructor(document: FlatWorkspaceDocument, hooks?: Map<DocumentHandlerHooks, (document: DocumentHandler) => void>) {
        // Do I really need to do it like this?...
        this.id = document.id;
        this.title = document.title;
        this.body = document.body;
        this.workspace = document.workspace;
        this.folder = document.folder;

        if (hooks) this.hooks = hooks;
    };

    public async delete() {
        // Sending delete request to backend
        console.log('sending delete request');
        await fetch(`/api/workspace/${ this.workspace }/document/${ this.id }`, { credentials: 'include', method: 'DELETE' });
        
        // Running onDelete hooks (if there is any)
        if (this.hooks.has(DocumentHandlerHooks.ON_DELETE)) {
            this.hooks.get(DocumentHandlerHooks.ON_DELETE)!(this);
        };
    };
};

export class DocumentHandlerBuilder {
    public hooks: HooksMap = new Map();

    constructor(
        public document: FlatWorkspaceDocument
    ) {};

    public addHook(hook: DocumentHandlerHooks, handler: (document: DocumentHandler) => void): DocumentHandlerBuilder {
        this.hooks.set(hook, handler);
        return this;
    };

    public build(): DocumentHandler {
        return new DocumentHandler(this.document, this.hooks);
    };
};