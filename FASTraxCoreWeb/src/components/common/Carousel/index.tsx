import React, {useState, PropsWithChildren} from 'react';
import {attachmentToDataURL, FileAttachment} from '@app/helpers/files';
import {EntityAttachmentImage} from '@app/entities/global/EntityAttachmentImage';
import NoImageAvailable from '@app/assets/images/no-image-available.jpg';
import 'swiper/swiper-bundle.css';

import SwiperCore, {Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

export interface CarouselProps<T extends FileAttachment> {
  images: T[];
}

SwiperCore.use([Thumbs]);

const Carousel: <T extends FileAttachment>(
  childrenProps: PropsWithChildren<CarouselProps<Pick<T, keyof FileAttachment>>>,
) => React.ReactElement = ({images, ...props}) => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | undefined>(undefined);

  return (
    <>
      {/* Swiper Actual Images */}
      <Swiper thumbs={{swiper: thumbsSwiper}}>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={attachmentToDataURL(image)} alt="" />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={NoImageAvailable} alt="" />
          </SwiperSlide>
        )}
      </Swiper>

      {/* Swiper Thumb */}
      <Swiper onSwiper={setThumbsSwiper} slidesPerView={3} spaceBetween={10}>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={attachmentToDataURL(image)} alt="" />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={NoImageAvailable} alt="" />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default React.memo(Carousel);
