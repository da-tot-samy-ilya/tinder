import React, {FC} from 'react';
import styles from "./PhotosStoreItem.module.scss"
import plusGray from "./img/plus-gray.svg"
import plusWhite from "./img/plus-white.svg"
import {uploadImage} from "../../../../firebase";
interface IPhotoStoreItemProps {
    src: string
    id: string
    isEmpty?: boolean
    onDelete: (e: React.MouseEvent<HTMLDivElement>, id: string) => void
    onAdd: (src: string) => void

    hasMarginLeft?: string
    hasMarginTop?: string

    userID: string
}

const PhotosStoreItem: FC<IPhotoStoreItemProps> = ({src, userID, id, isEmpty, onDelete, onAdd, hasMarginTop, hasMarginLeft}) => {

    const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
           await uploadImage(files[0], userID)
           onAdd(URL.createObjectURL(files[0]))
        }

    }


    return (
        <div style={{marginLeft: hasMarginLeft, marginTop: hasMarginTop}} className={styles.item}>
            {isEmpty ?
                <label className={styles.empty}>
                    <img src={plusGray} alt=""/>
                    <input accept="image/*" type="file" name="file" onChange={onUploadFile}/>
                </label>
                :
                <div onClick={(e) => onDelete(e, id)} className={styles.image}>
                    <img src={src} alt=""/>
                    <div className={styles.dark}>
                        <img draggable={false} src={plusWhite} className={styles.close}/>
                    </div>

                </div>
            }

        </div>
    );
};

export default PhotosStoreItem;