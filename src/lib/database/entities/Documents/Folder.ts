import { AfterCreate, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, type EventArgs, AfterUpdate } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Workspace } from "../Workspaces";
import { WorkspaceDocument } from "./Document";
import { ServerSynchronizationClient } from "$lib/database/SynchronizationInstance";
import { State } from "centrifuge";
import type { DocumentListChangeEvent } from "$lib/synchronization";

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

    @AfterCreate()
    public async propagateCreateEvent({ entity }: EventArgs<WorkspaceDocument>) {
        if (ServerSynchronizationClient.state != State.Connected) return;

        await ServerSynchronizationClient.publish(`documentListChange-${ entity.workspace.id }`, {
            type: "folder",
            folder: entity.flatten(),
        } as DocumentListChangeEvent);
    };

    @AfterUpdate()
    public async propagateUpdateEvent({ entity }: EventArgs<WorkspaceDocument>) {
        if (ServerSynchronizationClient.state != State.Connected) return;
        
        await ServerSynchronizationClient.publish(`documentListChange-${ entity.workspace.id }`, {
            type: "folder",
            folder: entity.flatten(),
        } as DocumentListChangeEvent);
    };
};