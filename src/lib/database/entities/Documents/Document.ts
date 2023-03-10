import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Workspace } from '../Workspaces';

// idk why, but I can't name this entity Document
// I really don't know why, and this is bothering me :<
@Entity()
export class TextDocument {
    @PrimaryKey()
    id: string = v4();

    @Property()
    title!: string;

    @Property()
    body!: string;

    @ManyToOne()
    workspace!: Workspace;

    constructor (title: string, body: string) {
        this.title = title;
        this.body = body;
    };
};
