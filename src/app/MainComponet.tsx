"use client"
import React, { useEffect, useState } from 'react'
import ImageSlider from './ImageSlider';
import FormData from './FormData';
export type images = {
  image1: string;
 image2: string;
image3: string;
     image4: string;
  image5: string;
 image6: string;
 image7: string;
}
export default function MainComponet() {
      const [images,setImages]=useState<images>()
     useEffect(() => {
  fetch('https://script.google.com/macros/s/AKfycbw9f6w3BAXIbTDsAAC2tOG8RagWImtMVVJBg2z2grLfdzmQuZiS_pKXlCYDfLujSmFT5Q/exec')
    .then(res => res.json())
    .then(data => {
      console.log('Sheet data:', data);
      const item = data[0];

      // Destructure only the image fields, ignore "offerTime"
      const {
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
      } = item;

      setImages({
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
      });
    })
    .catch(err => console.error('Error fetching data:', err));
}, []);
          console.log(images)
  return (
    <div className="flex justify-around items-center h-screen w-full flex-col md:flex-row-reverse ">
      <div className="w-full md:w-[40%]"><ImageSlider images={images}/> </div>

        <div className="w-full md:w-[40%] "><FormData/></div>
    </div>
  )
}
