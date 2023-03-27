import { writable } from "svelte/store";
import type { FlatWorkspaceDocument, FlatWorkspaceFolder, FlatWorkspace } from "$lib/database/entities";
import EntityType from "$lib/database/entities/EntityType";
import { getStore } from "$lib/helpers/getStore";

export interface Document extends FlatWorkspaceDocument {
    type: EntityType,
};

export interface Folder extends FlatWorkspaceFolder {
    type: EntityType,
};

export interface HierarchyFolder extends Folder {
    documents: Array<string>,
    folders: Array<string>,
};

export interface MappedWorkspace extends Omit<FlatWorkspace, "documents" | "folders"> {
    rootEntities: Array<Document | HierarchyFolder>,
    hierarchy: Map<string, HierarchyFolder>,
    entities: Map<string, Document | Folder>,
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
                .then((response: FlatWorkspace & { documents: Array<Document>, folders: Array<Folder> }) => {
                    const { rootEntities, hierarchy, entities } = this.computeHierarchy(response.documents, response.folders);

                    this._update(() => ({
                        ...response,
                        rootEntities,
                        hierarchy,
                        entities,
                    }));
                    resolve(true);
                })
                .catch((error) => {
                    // todo
                    // better errors
                    reject(error);
                });
        });
    };

    public async addEntity(type: "document" | "folder", entity: FlatWorkspaceDocument | FlatWorkspaceDocument) {
        // Fuck it!!!!

        // todo
        // do this like a normal human being would
        const store = await getStore<CurrentWorkspaceData>(this);
        if (store?.id) this.fetchById(store.id);
    };

    private computeHierarchy(documents: Array<FlatWorkspaceDocument>, folders: Array<FlatWorkspaceFolder>): {
        rootEntities: MappedWorkspace["rootEntities"],
        hierarchy: MappedWorkspace["hierarchy"],
        entities: MappedWorkspace["entities"]
    } {
        const hierarchy: MappedWorkspace["hierarchy"] = new Map();
        const entities: MappedWorkspace["entities"] = new Map();
        const rootEntities: MappedWorkspace["rootEntities"] = [];

        function addDocument(doc: FlatWorkspaceDocument) {
            entities.set(doc.id, {
                ...doc,
                type: EntityType.DOCUMENT,
            });
        };

        function addFolder(folder: FlatWorkspaceFolder) {
            entities.set(folder.id, {
                ...folder,
                type: EntityType.FOLDER,
            });
        };

        function computeFolderRecursively(folder: FlatWorkspaceFolder, isRootFolder = false): HierarchyFolder {
            // Adding this folder to entities map
            addFolder(folder);

            // Getting all inner documents
            const innerDocuments = documents.filter((doc) => doc.folder == folder.id);

            // Adding all innerDocuments to entities map
            innerDocuments.forEach((doc) => addDocument(doc));

            // Getting all inner folders
            const innerFolders = folders.filter((innerFolder) => innerFolder.folder == folder.id);

            // Adding all innerFolders to entities map
            innerFolders.forEach((folder) => addFolder(folder));

            // Computing all innerFolders
            innerFolders.forEach((innerFolder) => {
                computeFolderRecursively(innerFolder);
            });

            const hierarchyFolder = {
                ...folder,
                type: EntityType.FOLDER,
                documents: innerDocuments.map((doc) => doc.id),
                folders: innerFolders.map((folder) => folder.id),
            };

            if (!isRootFolder) {
                hierarchy.set(folder.id, hierarchyFolder);
            };

            return hierarchyFolder;
        };

        const rootFolders = folders.filter((folder) => folder.folder == null).map((folder) => computeFolderRecursively(folder));
        
        const rootDocuments = documents.filter((doc) => doc.folder == null);
        [
            ...rootFolders.map((folder) => ({ ...folder, type: EntityType.FOLDER })),
            ...rootDocuments.map((doc) => ({ ...doc, type: EntityType.DOCUMENT }))
        ].forEach((entity) => {
            rootEntities.push(entity);
        });

        // Adding rootDocuments to entities map
        rootDocuments.forEach((doc) => addDocument(doc));

        return {
            rootEntities,
            hierarchy,
            entities
        };
    };

    public clear() {
        this._update(() => (null));
    };
};

export const CurrentWorkspaceStore = new StoreClass();