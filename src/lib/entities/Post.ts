import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export default class Post {
    @PrimaryKey()
    id!: string = v4()

    @Property()
    title!: string

    @Property()
    body!: string

    constructor (title: string, body: string) {
        this.title = title;
        this.body = body;
    };
}