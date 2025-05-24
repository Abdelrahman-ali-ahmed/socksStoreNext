"use client"
import React, { useEffect, useState } from 'react'
import { MdElectricBolt } from 'react-icons/md';

type Offer = {
  offerTime: string;
}

function parseTimeString(timeStr: string) {
  const [days, hours, minutes, seconds] = timeStr.split(':').map(Number);
  return (((days * 24 + hours) * 60 + minutes) * 60) + seconds;
}

function formatTime(totalSeconds: number) {
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function OfferTime() {
  const [rows, setRows] = useState<Offer[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbw9f6w3BAXIbTDsAAC2tOG8RagWImtMVVJBg2z2grLfdzmQuZiS_pKXlCYDfLujSmFT5Q/exec')
      .then(res => res.json())
      .then(data => {
        console.log('Sheet data:', data);
        setRows(data);
        if (data.length > 0) {
          setSecondsLeft(parseTimeString(data[0].offerTime));
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  if (secondsLeft === null) {
    return (
      <div className="flex justify-center bg-gray-800 text-white items-center my-8 mx-12 py-4 px-7 border-4 shadow-blue-700/100 rounded-lg shadow-xl border-blue-700 ">
        <MdElectricBolt className="text-blue-500 w-8 h-6" />
        <p className="ml-3">Loading offer time...</p>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = formatTime(secondsLeft);

  return (
    <div className="flex justify-center text-xl bg-gray-800 text-white items-center my-8 mx-12 py-4 px-7 border-4 shadow-blue-700/100 rounded-lg shadow-xl border-blue-700 ">
      {secondsLeft > 0 ? (
        <h2 className="ml-3">
         عرض محدود: {days} <span className='text-sm'>يوم</span>  : {hours} <span className='text-sm'>ساعة </span>  : {minutes} <span className='text-sm'>دقيقة</span>  : {seconds}  <span className='text-sm'>ثانية</span> 
        </h2>
      ) : (
        <h2 className="ml-3">Offer expired!</h2>
      )}
      <MdElectricBolt className="text-blue-500 w-8 h-6" />
    </div>
  );
}
