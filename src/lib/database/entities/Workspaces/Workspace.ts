import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { TextDocument } from "../Documents/Document";
import { v4 } from "uuid";

@Entity()
export class Workspace {
    @PrimaryKey()
    id: string = v4();

    @Property()
    title!: string;

    @Property({ nullable: true })
    avatar?: string;

    @OneToMany(() => TextDocument, document => document.workspace)
    documents = new Collection<TextDocument>(this);

    constructor(title: string, avatar?: string) {
        this.title = title;
        this.avatar = avatar;
    };
};