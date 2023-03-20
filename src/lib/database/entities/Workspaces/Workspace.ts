import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { WorkspaceDocument } from "../Documents/Document";
import { v4 } from "uuid";
import { WorkspaceFolder } from "../Documents";

export interface FlatWorkspace extends Omit<Workspace, "folders" | "documents"> {
    folders: Array<string>,
    documents: Array<string>,
};

@Entity()
export class Workspace {
    @PrimaryKey()
    id: string = v4();

    @Property()
    title!: string;

    @Property({ nullable: true })
    avatar?: string;

    @OneToMany(() => WorkspaceFolder, folder => folder.workspace)
    folders = new Collection<WorkspaceFolder>(this);

    @OneToMany(() => WorkspaceDocument, document => document.workspace)
    documents = new Collection<WorkspaceDocument>(this);

    constructor(title: string, avatar?: string) {
        this.title = title;
        this.avatar = avatar;
    };
};