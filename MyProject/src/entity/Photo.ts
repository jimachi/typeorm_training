import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    ManyToMany,
} from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";
import { Author } from "./Author";
import { Album } from './Album';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column("text")
    description: string;

    @Column()
    filename: string;

    @Column("double precision")
    views: number;

    @Column()
    isPublished: boolean;

    @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
        cascade: true,
    })
    metadata: PhotoMetadata;

    @ManyToOne(() => Author, (author) => author.photos)
    author: Author;

    @ManyToMany(() => Album, (album) => album.photos)
    albums: Album[];
}
