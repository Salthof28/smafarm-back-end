

export interface UploadsServiceItf {
    uploadImgProfile(upload: ImageUpload): Promise<{ url: string }>;
    uploadImgShelter(upload: ImageUpload): Promise<{ url: string }>;
    deleteImgShelter(url: string): Promise<{ message: string }>
}

export interface ImageUpload {
    userId: number,
    file: Express.Multer.File
}

// export interface DeleteImg {
//     url: string,
//     bucketName: string,
// }
