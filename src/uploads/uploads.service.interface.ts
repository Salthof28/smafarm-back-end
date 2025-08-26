export interface UploadsServiceItf {
    uploadImgProfile(upload: ImageUpload): Promise<{ url: string }>;
    uploadImgFarmProfile(upload: ImageUpload): Promise<{ url: string }>;
    uploadImgShelter(upload: ImagesUploadShelter): Promise<{ url: string[] }>;
    deleteImgShelter(deleteImg: DelImagesBucketShelter): Promise<{ message: string, url: string[] }>;
    uploadImgLivestock(upload: ImagesUploadLivestock): Promise<{ url: string[] }>
    deleteImgLivestock(deleteImg: DelImagesBucketLivestock): Promise<{ message: string, url: string[] }>;
}

export interface ImageUpload {
    userId: number,
    file: Express.Multer.File
}


export interface ImagesUploadShelter {
    userId: number,
    shelterId: number,
    files: Express.Multer.File[]
}

export interface DelImagesBucketShelter {
    userId: number,
    shelterId: number,
    url: string[]
}

export interface ImagesUploadLivestock {
    userId: number,
    livestockId: number,
    files: Express.Multer.File[]
}

export interface DelImagesBucketLivestock {
    userId: number,
    livestockId: number,
    url: string[]
}

