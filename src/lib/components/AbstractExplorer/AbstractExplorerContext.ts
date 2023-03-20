import type { Folder } from "$lib/stores/Application";
import type { AbstractFolderContents } from "./AbstractFolderTypes";

export const ABSTRACT_EXPLORER_CONTEXT_KEY = "abstract-explorer";

export interface AbstractExplorerContext {
    getFolderContents(folder: Folder): AbstractFolderContents,
};