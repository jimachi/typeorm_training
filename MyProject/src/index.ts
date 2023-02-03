import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Album } from "./entity/Album";

AppDataSource.initialize()
    .then(async () => {
        const album1 = new Album();
        album1.name = "Bears";
        await AppDataSource.manager.save(album1);

        const album2 = new Album();
        album2.name = "Me";
        await AppDataSource.manager.save(album2);

        const photo = new Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo-with-bears.jpg";
        photo.views = 1;
        photo.isPublished = true;
        photo.albums = [album1, album2];
        await AppDataSource.manager.save(photo);
        // const photoRepository = AppDataSource.getRepository(Photo);
        // await photoRepository.save(photo);

        const loadedPhoto = await AppDataSource.getRepository(Photo).findOne({
            where: {
                id: 1,
            },
            relations: {
                albums: true,
            },
        });
        console.log(loadedPhoto)

        // const metadata = new PhotoMetadata();
        // metadata.height = 640;
        // metadata.width = 480;
        // metadata.compressed = true;
        // metadata.comment = "cyberShoot";
        // metadata.orientation = "portrait";
        // metadata.photo = photo;
        // photo.metadata = metadata;
        // const metadataRepository = AppDataSource.getRepository(PhotoMetadata);

        // await photoRepository.save(photo);
        // await metadataRepository.save(metadata)
        // console.log("Metadata is saved, and the relation between metadata and photo is created in the database too");

        // const photos = await photoRepository.find({
        //     relations: {
        //         metadata: true,
        //     },
        // });
        // console.log(photos);
    })
    .catch((error) => console.log(error));
