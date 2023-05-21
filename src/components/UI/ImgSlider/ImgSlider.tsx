import React, {useState} from 'react';
import styles from "./ImgSlider.module.scss"

import arrow from "./img/right-chevron.png"
import {TinderImage} from "../../../types/TinderImage";

interface IImageSliderProps {
    images: TinderImage[]
}

const ImgSlider: React.FC<IImageSliderProps> = ({images}) => {
    const [currImageIndex, setCurrImageIndex] = useState(0)
    const swipeNext = () => {
       if  (currImageIndex === images.length) {
           setCurrImageIndex(0)
       }
       else {
           setCurrImageIndex(currImageIndex + 1)
       }

        console.log(currImageIndex)
    }
    const swipePrevious = () => {
        if  (currImageIndex === 0) {
            setCurrImageIndex(images.length)
        }
        else {
            setCurrImageIndex(currImageIndex - 1)
        }
        console.log(currImageIndex)
    }

    return (
        <div className={styles.container}>
            {images.map((el, i) =>
                <img
                    src={el.src}
                    alt={el.name}
                    className={styles.img}
                    key={el.src}
                    style={{display: currImageIndex === i ? "block" : "none"}}
                />
            )}
            <img src={arrow} alt="" className={styles.rightArrow} onClick={swipeNext}/>
            <img src={arrow} alt="" className={styles.leftArrow} onClick={swipePrevious}/>
        </div>
    );
};

export default ImgSlider;