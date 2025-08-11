export interface UploadsServiceItf {
    uploadImgProfile(upload: ImageUpload): Promise<{ url: string }>;
    uploadImgShelter(upload: ImagesUpload): Promise<{ url: string }>;
    deleteImgShelter(deleteImg: DelImagesBucket): Promise<{ message: string, url: string }>;
}

export interface ImageUpload {
    userId: number,
    file: Express.Multer.File
}

export interface ImagesUpload {
    userId: number,
    shelterId: number,
    file: Express.Multer.File
}

export interface DelImagesBucket {
    userId: number,
    shelterId: number,
    url: string
}
