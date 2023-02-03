import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from './entity/PhotoMetadata';

AppDataSource.initialize()
    .then(async () => {
        const photo = new Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo-with-bears.jpg";
        photo.views = 1;
        photo.isPublished = true;

        const metadata = new PhotoMetadata();
        metadata.height = 640
        metadata.width = 480
        metadata.compressed = true
        metadata.comment = "cyberShoot"
        metadata.orientation = "portrait"
        metadata.photo = photo

        const photoRepository = AppDataSource.getRepository(Photo)
        const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

        await photoRepository.save(photo)
        await metadataRepository.save(metadata)

        console.log("Metadata is saved, and the relation between metadata and photo is created in the database too");
    })
    .catch((error) => console.log(error));
