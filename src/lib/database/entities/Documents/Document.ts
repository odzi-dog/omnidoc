import type { DocumentListChangeEvent } from '$lib/synchronization';
import { AfterCreate, AfterUpdate, Entity, ManyToOne, PrimaryKey, Property, type EventArgs } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Workspace } from '../Workspaces';
import { WorkspaceFolder } from './Folder';
import { ServerSynchronizationClient } from '$lib/database/SynchronizationInstance';
import { State } from 'centrifuge';

// urgh
export interface FlatWorkspaceDocument extends Omit<WorkspaceDocument, "workspace" | "folder" | "flatten" | "propagateCreateEvent" | "propagateUpdateEvent"> {
    workspace: string,
    folder?: string,
};

@Entity()
export class WorkspaceDocument {
    @PrimaryKey()
    id: string = v4();

    @Property()
    title!: string;

    @Property({ nullable: true })
    body?: string;

    @ManyToOne()
    workspace!: Workspace;

    @ManyToOne({ nullable: true })
    folder?: WorkspaceFolder;

    constructor(title: string, workspace: Workspace, folder?: WorkspaceFolder) {
        this.title = title;

        this.workspace = workspace;
        this.folder = folder;
    };

    public flatten(): FlatWorkspaceDocument {
        return {
            ...this,
            workspace: this.workspace.id,
            folder: this.folder?.id,
        };
    };

    @AfterCreate()
    public async propagateCreateEvent({ entity }: EventArgs<WorkspaceDocument>) {
        if (ServerSynchronizationClient.state != State.Connected) return;

        await ServerSynchronizationClient.publish(`documentListChange-${ entity.workspace.id }`, {
            type: "document",
            document: entity.flatten(),
        } as DocumentListChangeEvent);
    };

    @AfterUpdate()
    public async propagateUpdateEvent({ entity }: EventArgs<WorkspaceDocument>) {
        if (ServerSynchronizationClient.state != State.Connected) return;
        
        await ServerSynchronizationClient.publish(`documentListChange-${ entity.workspace.id }`, {
            type: "document",
            document: entity.flatten(),
        } as DocumentListChangeEvent);
    };
};
