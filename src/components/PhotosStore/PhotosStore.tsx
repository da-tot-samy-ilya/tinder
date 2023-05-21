import React, {FC} from 'react';
import styles from "./PhotosStore.module.scss"
import PhotosStoreItem from "../PhotosStoreItem/PhotosStoreItem";
import {TinderImage} from "../../types/TinderImage";

interface IPhotoStoreProps {
    images: TinderImage[]
    mainImage: TinderImage
    userID: string
    onAddImage: (src: string) => void
}


const PhotosStore: FC<IPhotoStoreProps> = ({userID, images, onAddImage, mainImage}) => {
    return (
        <div className={styles.store}>
            <PhotosStoreItem
                userID={userID}
                key={mainImage.name}
                hasMarginLeft="10px"
                hasMarginTop="10px"
                onDelete={(e, id) => console.log("del: " + id)}
                onAdd={onAddImage}
                id={mainImage.name}
                src={mainImage.src}/>
            {images.map(img =>
                <PhotosStoreItem
                    userID={userID}
                    key={img.name}
                    hasMarginLeft="10px"
                    hasMarginTop="10px"
                    onDelete={(e, id) => console.log("del: " + id)}
                    onAdd={onAddImage}
                    id={img.name}
                    src={img.src}/>
            )}
            <PhotosStoreItem
                userID={userID}
                isEmpty
                hasMarginLeft="10px"
                hasMarginTop="10px"
                onDelete={(e, id) => console.log("del: " + id)}
                onAdd={onAddImage}
                id={"-1"}
                src={""}/>
        </div>
    );
};

export default PhotosStore;