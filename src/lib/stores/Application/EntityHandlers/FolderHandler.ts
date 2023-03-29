import type { FlatWorkspaceFolder } from "$lib/database/entities";
import EntityType from "$lib/database/entities/EntityType";

export class FolderHandler implements FlatWorkspaceFolder {
    public type = EntityType.FOLDER;
    
    public id: string;
    public title: string;
    public workspace: string;
    public folder?: string;

    constructor(folder: FlatWorkspaceFolder) {
        this.id = folder.id;
        this.title = folder.title;
        this.workspace = folder.workspace;
        this.folder = folder.folder;
    };
};

export class FolderHandlerBuilder {
    constructor(
        public folder: FlatWorkspaceFolder,
    ) {};

    public build(): FolderHandler {
        return new FolderHandler(this.folder);
    };
};