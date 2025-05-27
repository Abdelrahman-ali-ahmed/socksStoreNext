"use client";
import React, { useState } from 'react';
import { CiWallet } from 'react-icons/ci';
import { FaBoxOpen } from 'react-icons/fa';
import { IoChatbubbleOutline, IoShieldOutline } from 'react-icons/io5';

export default function FormData() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [telephone, setTelephone] = useState('');
  const [stat, setStat] = useState('');
  const [town, setTown] = useState('');
  const [address, setAddress] = useState('');
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('telephone', telephone);
      formData.append('stat', stat);
      formData.append('town', town);
      formData.append('address', address);

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwhiCYAfkFv1W3X2jwdZ4aY_GWJt7g4KxHT83TpAEn-GGOKTEkJ7dFjtDwhrz0gsvIE/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        }
      );

      const data = await response.json();
      if (data.result === 'Success') {
        alert('تم إرسال الطلب بنجاح!');
        setName('');
        setPrice('');
        setQuantity('');
        setTelephone('');
        setStat('');
        setTown('');
        setAddress('');
      } else {
        alert('فشل الإرسال: ' + (data.message || 'خطأ غير معروف'));
      }
    } catch (error: any) {
      alert('حدث خطأ: ' + error.message);
    }
  };

  return (
    <div dir="rtl" className=" mx-auto p-6 bg-white text-black rounded-2xl shadow-2xl md:border-2 md:border-blue-600 mt-16 w-full  ">
      {/* Offer Section */}
      <div className="text-center text-xl font-bold mb-6 w-full">
        <h2>عرض 12 شراب ديسرن قطن 90% بخصم 50%</h2>
        <div className="text-2xl text-green-600 mt-2">
          199.00 ج.م <span className="line-through text-gray-400 text-base">440.00 ج.م</span>
        </div>
        <p className="text-yellow-600">خصم 50% لمدة 48 ساعة فقط، أشتري الآن</p>
      </div>

      {/* Icons Section */}
      <div className="flex justify-around text-sm mb-6 text-black">
        <div className="flex flex-col items-center">
          <CiWallet size={28} />
          <p className='text-center'>الدفع عند الاستلام</p>
        </div>
        <div className="flex flex-col items-center">
          <FaBoxOpen size={28} />
          <p>توصيل مجاني عند طلب 2 دستة</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IoShieldOutline size={28} />
          <p className='text-center'>ضمانة 100%</p>
        </div>
        <div className="flex flex-col items-center">
          <IoChatbubbleOutline size={28} />
          <p className='text-center'>خدمة العملاء</p>
        </div>
      </div>

      {/* Accordion Section */}
      {[
        'راحة استثنائية تدوم طوال اليوم',
        'أفضل جودة في مصر بأحسن سعر',
        'لو الخامة أو الأوردر معجبكش؟',
        'عرض مش عادي بأسعار مفيش زيها',
      ].map((title, idx) => (
        <div
          key={idx}
          onClick={() => setAccordionOpen(accordionOpen === idx ? null : idx)}
          className="cursor-pointer bg-gray-100 p-3 rounded-lg my-2 shadow"
        >
          <div className="font-bold">{title}</div>
          {accordionOpen === idx && (
            <p className="mt-2 text-gray-700 text-sm">
              هذا نص توضيحي للمحتوى المتعلق بعنوان: {title}
            </p>
          )}
        </div>
      ))}

      {/* Form Section */}
      <h2 className="text-xl font-bold text-center my-6">لطلب المنتج، الرجاء إدخال التفاصيل:</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div>
          <label className="block font-semibold">الاسم</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">السعر</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">الكمية</label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">رقم الهاتف</label>
          <input type="text" value={telephone} onChange={e => setTelephone(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">المحافظة</label>
          <input type="text" value={stat} onChange={e => setStat(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">المدينة</label>
          <input type="text" value={town} onChange={e => setTown(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">العنوان</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
          إرسال الطلب
        </button>
      </form>
    </div>
  );
}
