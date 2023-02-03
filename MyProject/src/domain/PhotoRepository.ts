import { AppDataSource } from "../data-source";
import { Photo } from "../entity/Photo";

const photoRepository = AppDataSource.getRepository(Photo);

export const getAllPhotos = async (): Promise<void> => {
    const allPhotos = await photoRepository.find();
    console.log(`All photos from the db: ${allPhotos}`);
};

export const getPhotoById = async (id: number): Promise<void> => {
    const firstPhoto = await photoRepository.findOneBy({ id });
    console.log(`First photo from the db: ${firstPhoto}`);
};

export const getPhotoByName = async (name: string): Promise<void> => {
    const meAndBearsPhoto = await photoRepository.findOneBy({
        name: "Me and Bears",
    });
    console.log(`Me and Bears photo from the db: ${meAndBearsPhoto}`);
};

export const getAllPhotosByViews = async (view: number): Promise<void> => {
    const allViewedPhotos = await photoRepository.findBy({ views: 1 });
    console.log(`All viewed photos: ${allViewedPhotos}`);
};

export const getAllPhotosByPublished = async (): Promise<void> => {
    const allPublishedPhotos = await photoRepository.findBy({
        isPublished: true,
    });
    console.log(`All published photos: ${allPublishedPhotos}`);
};

export const getAllPhotosCount = async (): Promise<void> => {
    const [photos, photosCount] = await photoRepository.findAndCount();
    console.log(`All photos: ${photos}`);
    console.log(`Photos count: ${photosCount}`);
};

export const updatePhoto = async (id: number, name: string): Promise<void> => {
    const photoToUpdate = await photoRepository.findOneBy({ id });
    photoToUpdate.name = name;
    await photoRepository.save(photoToUpdate);
};

export const DeletePhoto = async (id: number): Promise<void> => {
    const photoToRemove = await photoRepository.findOneBy({ id });
    if (photoToRemove) {
        await photoRepository.remove(photoToRemove);
    }
};
