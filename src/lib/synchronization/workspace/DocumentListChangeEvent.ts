import type { FlatWorkspaceDocument, FlatWorkspaceFolder } from "$lib/database/entities";

export type DocumentListChangeEvent = DocumentChangedEvent | FolderChangedEvent;

interface DocumentChangedEvent {
    type: "document",
    document: FlatWorkspaceDocument,
};

interface FolderChangedEvent {
    type: "folder",
    folder: FlatWorkspaceFolder,
};