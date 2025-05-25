"use client";
import React, { useState } from 'react';

export default function FormData() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [telephone, setTelephone] = useState('');
  const [stat, setStat] = useState('');
  const [town, setTown] = useState('');
  const [address, setAddress] = useState('');

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

      const response = await fetch('https://script.google.com/macros/s/AKfycbwhiCYAfkFv1W3X2jwdZ4aY_GWJt7g4KxHT83TpAEn-GGOKTEkJ7dFjtDwhrz0gsvIE/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const data = await response.json();

      if (data.result === 'Success') {
        alert('Submission successful!');
        setName('');
        setPrice('');
        setQuantity('');
        setTelephone('');
        setStat('');
        setTown('');
        setAddress('');
      } else {
        alert('Submission failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 shadow-lg text-white border-4  border-blue-700 rounded-lg mt-10 p-8">
      <h2 className="text-2xl font-bold text-center text-white mb-6">للطلب, الرجاء ادخال التفاصيل :</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block  font-semibold">Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block  font-semibold">Quantity</label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold">Telephone</label>
          <input type="text" value={telephone} onChange={e => setTelephone(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold">State</label>
          <input type="text" value={stat} onChange={e => setStat(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold">Town</label>
          <input type="text" value={town} onChange={e => setTown(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold">Address</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
