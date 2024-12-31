/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useGetHotelListQuery } from "@/redux/api/data";
import React from "react";
import styles from "./page.module.scss";
import { Star } from "lucide-react";


const Page = () => {
  const { data, isLoading, error } = useGetHotelListQuery(); // Добавляем isLoading и error

  const defaultImage = "/api/placeholder/300/200";

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading hotels</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hotels</h1>
      <div className={styles.hotelGrid}>
        {data?.map((hotel, index) => (
          <div key={index} className={styles.hotelCard}>
            <div className={styles.imageContainer}>
              {hotel.hotel_images?.length > 0 ? (
                <img // Заменяем Image на img
                  src={hotel.hotel_images[0].image}
                  alt={hotel.name_hotel}
                  className={styles.hotelImage}
                />
              ) : (
                <img // Заменяем Image на img
                  src={defaultImage}
                  alt="default hotel image"
                  className={styles.hotelImage}
                />
              )}
            </div>
            <div className={styles.hotelInfo}>
              <h2 className={styles.hotelName}>{hotel.name_hotel}</h2>
              <p className={styles.location}>
                {hotel.city}, {hotel.country}
              </p>
              <div className={styles.ratingContainer}>
                <div className={styles.stars}>
                  {[...Array(hotel.start)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={styles.star}
                      fill="#FFD700"
                      color="#FFD700"
                    />
                  ))}
                </div>
                <span className={styles.rating}>
                  Rating: {hotel.rating}/5 ({hotel.count_review} reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
