import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You might need to install and import the correct icon library

const RatingStars = ({ rating, maxRating }) => {
    const filledStars = Math.floor(rating); // Get the number of filled stars
    const halfStar = rating - filledStars >= 0.5; // Check if there's a half-filled star
    const emptyStars = maxRating - filledStars - (halfStar ? 1 : 0); // Calculate the number of empty stars

    const starElements = [];

    // Create an array of star elements
    for (let i = 0; i < filledStars; i++) {
        starElements.push(
            <Ionicons key={i} name="star" size={20} color="gold" />
        );
    }

    if (halfStar) {
        starElements.push(
            <Ionicons key="half" name="star-half" size={20} color="gold" />
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        starElements.push(
            <Ionicons key={i} name="star-outline" size={20} color="gold" />
        );
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {starElements.map((star, index) => (
                <View key={index}>{star}</View>
            ))}
        </View>
    );
};

export default RatingStars;