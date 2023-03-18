import { writable } from "svelte/store";
import type { Workspace, WorkspaceDocument, WorkspaceFolder } from "$lib/database/entities";

export enum EntityType {
    FOLDER,
    DOCUMENT,
};

export type CircularEntity = WorkspaceDocument & { type: EntityType } | Map<WorkspaceFolder & { type: EntityType }, CircularEntity>;

interface MappedWorkspace extends Omit<Workspace, "documents" | "folders"> {
    entities: Map<WorkspaceFolder & { type: EntityType } | null, Array<CircularEntity>>
};

export type CurrentWorkspaceData = MappedWorkspace | null;

class StoreClass {
    public subscribe;
    private _update;

    constructor() {
        const { subscribe, update } = writable<CurrentWorkspaceData>(null);
        
        this.subscribe = subscribe;
        this._update = update;
    };

    // Fetch workspace by id
    public fetchById(workspaceId: string) {
        return new Promise((resolve, reject) => {
            fetch(`/api/workspace/${ workspaceId }`, { credentials: 'include' })
                .then((response) => {
                    if (response.status != 200) {
                        // todo
                        // better errors
                        throw new Error("Not found");
                    };
                    
                    return response;
                })
                .then((response) => response.json())
                .then((response: Workspace) => {
                    this._update(() => ({
                        ...response,
                        // i dunno, ok?
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        entities: this.mapFoldersAndDocuments(response.documents, response.folders),
                    }));
                })
                .catch((error) => {
                    // todo
                    // better errors
                    reject(error);
                });
        });
    };

    private mapFoldersAndDocuments(documents: Array<WorkspaceDocument & { folder: string, workspace: string }>, folders: Array<WorkspaceFolder & { folder: string, workspace: string }>): MappedWorkspace["entities"] {
        const map: MappedWorkspace["entities"] = new Map();

        const rootDocuments = documents.filter((doc) => doc.folder == null);
        map.set(null, rootDocuments.map((doc) => ({ ...doc, type: EntityType.DOCUMENT })));

        function computeFolderContents(folder: WorkspaceFolder): Array<CircularEntity> {
            // Finding every document, that lays in this folder
            const innerDocuments = documents.filter((doc) => doc.folder == folder.id);
            
            // Finding every folder, that lays...
            const innerFolders = folders.filter((innerFolder) => innerFolder.folder == folder.id);
            const innerFoldersArray: Array<CircularEntity> = [];

            for (const innerFolder of innerFolders) {
                const contents = computeFolderContents(innerFolder);
                if (contents != null) innerFoldersArray.push(new Map().set({ ...innerFolder, type: EntityType.FOLDER }, contents));
            };

            return [
                ...innerDocuments.map((doc) => ({ ...doc, type: EntityType.DOCUMENT })),
                ...innerFoldersArray
            ];
        };

        const rootFolders = folders.filter((folder) => folder.folder == null);
        for (const folder of rootFolders) {
            map.set({ ...folder, type: EntityType.FOLDER }, computeFolderContents(folder));
        };

        return map;
    };

    public clear() {
        this._update(() => (null));
    };
};

export const CurrentWorkspaceStore = new StoreClass();