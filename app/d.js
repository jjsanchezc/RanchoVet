import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4E3B2', // Color de fondo F4E3B2
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  exerciseName: {
    fontSize: 18,
  },
  exerciseDescription: {
    fontSize: 16,
  },
  exerciseImage: {
    width: 50,
    height: 50,
  },
  timerButton: {
    marginLeft: 10,
  },
  completedButton: {
    marginLeft: 10,
  },
});

const Main = () => {
  const router = useRouter();

  const exercises = [
    {
      id: 1,
      name: 'Bicep Curls',
      description: 'Curl the barbell up to your shoulders, keeping your elbows close to your sides.',
      image: 'https://example.com/bicep-curls.png',
    },
    {
      id: 2,
      name: 'Push-Ups',
      description: 'Place your hands shoulder-width apart on the ground and lower your body until your chest touches the ground.',
      image: 'https://example.com/push-ups.png',
    },
    {
      id: 3,
      name: 'Squats',
      description: 'Stand with your feet shoulder-width apart and lower your body until your thighs are parallel to the ground.',
      image: 'https://example.com/squats.png',
    },
  ];

  const renderListItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDescription}>{item.description}</Text>
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />
        <TouchableOpacity style={styles.timerButton}>
          <Text>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completedButton}>
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full Body Workout</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={exercises}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
export default Main;
