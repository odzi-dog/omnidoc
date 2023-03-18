import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Workspace } from '../Workspaces';
import { WorkspaceFolder } from './Folder';

// idk why, but I can't name this entity Document
// I really don't know why, and this is bothering me :<
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
};
