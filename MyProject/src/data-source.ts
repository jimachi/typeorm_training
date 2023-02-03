import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Author } from "./entity/Author";
import { Album } from './entity/Album';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Photo, PhotoMetadata, Author, Album],
    migrations: [],
    subscribers: [],
});
