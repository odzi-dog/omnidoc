import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Workspace } from "../Workspaces";
import { WorkspaceDocument } from "./Document";

export interface FlatWorkspaceFolder extends Omit<WorkspaceFolder, "workspace" | "folder" | "folders" | "documents"> {
    workspace: string,
    folder?: string,
};

@Entity()
export class WorkspaceFolder {
    @PrimaryKey()
    id: string = v4();

    @Property()
    title!: string;

    @ManyToOne()
    workspace!: Workspace;

    @ManyToOne({ nullable: true })
    folder?: WorkspaceFolder;

    @OneToMany(() => WorkspaceFolder, folder => folder.folder)
    folders = new Collection<WorkspaceFolder>(this);

    @OneToMany(() => WorkspaceDocument, document => document.folder)
    documents = new Collection<WorkspaceDocument>(this);

    constructor(title: string, workspace: Workspace, folder?: WorkspaceFolder) {
        this.title = title;
        this.workspace = workspace;
        this.folder = folder;
    };
};