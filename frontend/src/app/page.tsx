"use client";

import Link from "next/link";

const menuItems = [
  { id: 1, name: "Pizza", description: "Delicious cheese pizza", price: "$10" },
  { id: 2, name: "Burger", description: "Juicy beef burger", price: "$8" },
  { id: 3, name: "Pasta", description: "Creamy Alfredo pasta", price: "$12" },
  // 他のメニュー項目を追加
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white shadow-md rounded p-8">
        <h1 className="text-2xl font-bold mb-6">Menu</h1>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-4">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>{item.description}</p>
              <p className="font-bold">{item.price}</p>
            </li>
          ))}
        </ul>
        <Link href="/reservation">
          <p className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 block text-center">
            Make a Reservation
          </p>
        </Link>
      </div>
    </div>
  );
}
