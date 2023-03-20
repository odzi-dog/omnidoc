export const EXPLORER_CONTEXT_KEY = "explorer-context";

export interface ExplorerContext {
    currentFolder: string | null,
    updateCurrentFolder: (folderId: string) => void,
};