"use client";

import { useState } from "react";
import Link from "next/link";

// Reservationの型を定義
type Reservation = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
};

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    party_size: "",
  });

  // reservationsの型をReservation[]に指定
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Reservation created successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          party_size: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to create reservation: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: Reservation[] = await response.json();
        setReservations(data);
      } else {
        const errorData = await response.json();
        alert(`Failed to fetch reservations: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white shadow-md rounded p-8">
        <h1 className="text-2xl font-bold mb-6">Reservation Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Party Size:</label>
            <input
              type="number"
              name="party_size"
              value={formData.party_size}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <button
          onClick={fetchReservations}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
        >
          Fetch Reservations
        </button>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Reservations List</h2>
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id} className="mb-2">
                {reservation.name} - {reservation.date} {reservation.time} -
                Party Size: {reservation.party_size}
              </li>
            ))}
          </ul>
        </div>
        <Link href="/">
          <p className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mt-4 block text-center">
            Back to Menu
          </p>
        </Link>
      </div>
    </div>
  );
}
