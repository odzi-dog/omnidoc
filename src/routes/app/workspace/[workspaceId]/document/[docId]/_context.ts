import { getContext as getSvelteContext, setContext as setSvelteContext } from 'svelte';

export interface DocumentEditorContextData {
    isEditable: boolean;
};

export const DocumentEditorContext = {
    key: "DOCUMENT_EDITOR_CONTEXT",

    getContext() {
        return getSvelteContext<DocumentEditorContextData>(this.key);
    },

    setContext(data: DocumentEditorContextData) {
        setSvelteContext<DocumentEditorContextData>(this.key, data);
    },

    setDefaults() {
        this.setContext({
            isEditable: false,
        });
    },

    updateContext(data: Partial<DocumentEditorContextData>) {
        const currentContext = this.getContext();
        this.setContext({
            ...currentContext,
            ...data
        });
    },
};