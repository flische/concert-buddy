import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import image1 from '../../assets/images/carousel_images/image1_carosel.png';
import image2 from '../../assets/images/carousel_images/image2_carosel.png';
import image3 from '../../assets/images/carousel_images/image3.png';
import image4 from '../../assets/images/carousel_images/image4.png';
import image5 from '../../assets/images/carousel_images/image5.png';
const imageArray = [image1, image2, image3, image4, image5];

export default () => {
    return (
        <Carousel showThumbs={false} showArrows={false} showStatus={false} emulateTouch={true}>
            {imageArray.map((image, index) => {
                return(
                
                    <img key={image} src={image}/>
                
                )
            })}
            
        </Carousel>
    )
}