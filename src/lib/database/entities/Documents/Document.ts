import type { DocumentListChangeEvent } from '$lib/synchronization';
import { AfterCreate, AfterUpdate, Entity, ManyToOne, PrimaryKey, Property, type EventArgs, BeforeCreate } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Workspace } from '../Workspaces';
import { WorkspaceFolder } from './Folder';
import { ServerSynchronizationClient } from '$lib/database/SynchronizationInstance';
import { State } from 'centrifuge';
import { pack as serializedAndMinify, unpack } from 'msgpackr';
import type { DocumentBody } from '$lib/editor';

// urgh
export interface FlatWorkspaceDocument extends Omit<WorkspaceDocument, "workspace" | "folder" | "flatten" | "setDefaultBody" | "propagateCreateEvent" | "propagateUpdateEvent" | "body"> {
    workspace: string,
    folder?: string,
    content: DocumentBody,
};

@Entity()
export class WorkspaceDocument {
    @PrimaryKey()
    id: string = v4();

    @Property()
    title!: string;

    @Property({ nullable: true })
    body?: Buffer;

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
            body: undefined,
            content: this.body ? unpack(this.body) : [],
            workspace: this.workspace.id,
            folder: this.folder?.id,
        };
    };

    @BeforeCreate()
    public async setDefaultBody({ entity }: EventArgs<WorkspaceDocument>) {
        if (entity.body == null) {
            const body = [
                {
                    id: "0",
                    type: "text",
                    payload: {
                        content: "Hello there!"
                    }
                }
            ];
            
            // Setting default body
            entity.body = serializedAndMinify(body);
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
