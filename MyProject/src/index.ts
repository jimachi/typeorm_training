import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";

AppDataSource.initialize()
    .then(async () => {
        const photo = new Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo-with-bears.jpg";
        photo.views = 1;
        photo.isPublished = true;

        const savedPhotos = await AppDataSource.manager.find(Photo);
        console.log("All photos from the db: ", savedPhotos);

        const photoRepository = await AppDataSource.getRepository(Photo);

        // await photoRepository.save(photo);
        // console.log("Photo has been saved");

        const allPhotos = await photoRepository.find();
        console.log(`All photos from the db: ${allPhotos}`);

        const firstPhoto = await photoRepository.findOneBy({
            id: 1,
        });
        console.log(`First photo from the db: ${firstPhoto}`);

        const meAndBearsPhoto = await photoRepository.findOneBy({
            name: "Me and Bears",
        });
        console.log(`Me and Bears photo from the db: ${meAndBearsPhoto}`);

        const allViewedPhotos = await photoRepository.findBy({ views: 1 });
        console.log(`All viewed photos: ${allViewedPhotos}`);

        const allPublishedPhotos = await photoRepository.findBy({
            isPublished: true,
        });
        console.log(`All published photos: ${allPublishedPhotos}`);

        const [photos, photosCount] = await photoRepository.findAndCount();
        console.log(`All photos: ${photo}`);
        console.log(`Photos count: ${photosCount}`);

        const savedPhoto = await AppDataSource.manager.find(Photo);
        console.log(`All photos from the db: ${savedPhoto}`);

        const photoToUpdate = await photoRepository.findOneBy({
          id: 1,
        })
        photoToUpdate.name = "Me, my friends and polar bears"
        await photoRepository.save(photoToUpdate)

        const photoToRemove = await photoRepository.findOneBy({
          id: 4,
        })
        if (photoToRemove) {
          await photoRepository.remove(photoToRemove)
        }
    })
    .catch((error) => console.log(error));
