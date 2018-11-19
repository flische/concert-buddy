import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../assets/images/carousel_images/image1_carousel.png';
import image2 from '../../assets/images/carousel_images/image2_carousel.png';
import image3 from '../../assets/images/carousel_images/image3_carousel.png';
import image4 from '../../assets/images/carousel_images/image4_carousel.png';
import image5 from '../../assets/images/carousel_images/image5_carousel.png';
import image6 from '../../assets/images/carousel_images/image6_carousel.png';
import image7 from '../../assets/images/carousel_images/image7_carousel.png';
const imageArray = [image1, image2, image3, image4, image5, image6, image7];

export default () => {
    return (
        <Carousel showThumbs={false} showArrows={false} showStatus={false} emulateTouch={true} autoPlay={true}>
            {imageArray.map((image, index) => {
                return (

                    <img key={image} src={image} />

                )
            })}

        </Carousel>
    )
}