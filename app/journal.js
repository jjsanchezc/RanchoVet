import { View, Text, Pressable, FlatList, Button } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { styles } from "../utils/styles";
import { getUsersPasswords } from "../database/firebase";
import { fetchDataAndStoreLocally } from "../database/localdatabase";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu/Menu";
import * as constantes from "../constants";
import { ScrollView } from "react-native";

const translations = {
  "en-US": {
    animal: "Animal: ",
    veterinarian: "Veterinarian: ",
    viewDetails: "View details",
    edit: "Edit",
    goBack: "Go Back",
    create: "Create New Entry",
    errorFetchingUserPassword: "Error fetching user's password",
  },
  "es-ES": {
    animal: "Animal: ",
    veterinarian: "Veterinario:",
    viewDetails: "Ver detalles",
    edit: "Editar",
    goBack: "Regresar",
    create: "Crear nueva entrada",
    errorFetchingUserPassword: "Error al obtener contraseña del usuario",
  },
};

const Journal = () => {
  const router = useRouter();
  const [animal, setanimal] = useState({});
  const [validAnimals, setvalidAnimals] = useState([]);
  const [validUsers, setValidUsers] = useState([]);
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];


// Load data
useLayoutEffect(() => {
  fetchAndStore();
  fetchData();
}, []);

// Update in real-time
useEffect(() => {
  const intervalId = setInterval(() => {
    fetchAndStore();
  }, 200);
  return () => clearInterval(intervalId);
}, [fetchAndStore]);

useEffect(() => {
  const intervalId = setInterval(() => {
    fetchData();
  }, 200);
  return () => clearInterval(intervalId);
}, [fetchData]);
// End of real-time update

// Fetch data from Firebase and store it locally
async function fetchAndStore() {
  try {
    const user = await AsyncStorage.getItem("username");
    await fetchDataAndStoreLocally(user);
  } catch (error) {
    console.error(t.errorFetchingUserPassword, error);
  }
};

// Get Journals
async function fetchData(){
  try {
    const user = await AsyncStorage.getItem("username");
    const userJournal = JSON.parse(
      await AsyncStorage.getItem(user)
    ).journal;
    const Vanimals = Object.values(userJournal);
    const ids = Object.keys(userJournal);
    const animals = [];
    for (let index = 0; index < Vanimals.length; index++) {
      Vanimals[index].id = ids[index];
      animals.push(Vanimals[index]);
    }
    setvalidAnimals(animals);
  } catch (error) {
    console.error("Error al obtener contraseña del usuario:", error);
  }
};

  // Get Veterinarians
  useEffect(() => {
    const getVets = async () => {
      try {
        const users = await getUsersPasswords();
        const Vusers = Object.values(users);
        const ids = Object.keys(users);
        const vetUsers = [];
        for (let index = 0; index < Vusers.length; index++) {
          if (Vusers[index].type === "vet") {
            Vusers[index].id = ids[index];
            vetUsers.push({
              key: Vusers[index].id,
              value: Vusers[index].name,
            });
          }
        }
        setValidUsers(vetUsers);
      } catch (error) {
        console.error("Error al obtener contraseña del usuario:", error);
      }
    };
    getVets();
  }, []);

  // Utility function to get veterinarian name
  const getVeterinarianName = (vetId) => {
    const vetUser = validUsers.find((user) => user.key === vetId);
    return vetUser ? vetUser.value : "";
  };


  const back = () => {
    router.back();
  };

  const clear = () => {
    setanimal({});
  };

  const renderItem = ({ item }) => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.directoryBox}>
        <View style={styles.rowContainer}>
          <View
            style={[
              styles.directoryBox,
              {
                borderColor: "#D3D5D7",
                borderBottomWidth: 2,
                backgroundColor: "#F7EDCF", // Highlight the selected user
              },
            ]}
          >
            <View>
              <Ionicons
                name="person-circle-outline"
                size={80}
                color="black"
                style={styles.cavatar}
              />
            </View>
            <View>
              <Text style={styles.directoryText}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              </Text>
              <Text style={styles.directoryText}>
                {t.animal} {item.species}
              </Text>
              <Text style={styles.directoryText}>
                {t.veterinarian}
                {getVeterinarianName(item.veterinary)}
              </Text>
            </View>
            <View style={styles.columnContainer}>
              <Button
                title={t.viewDetails}
                onPress={() => setanimal(item)}
                color={constantes.COLORS.tertiary}
                style={styles.journalButton}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderItemDetails = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.directoryDetailsText}>
        <View>
          <Ionicons
            name="person-circle-outline"
            size={80}
            color="black"
            style={styles.cavatar}
          />
          <Text>{animal.name}</Text>
          <Text>{animal.folder}</Text>
        </View>

        <View style={styles.modalbuttonContainer}>
          <Pressable
            style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
            onPress= {() => {router.push({ pathname: "/editJournal", 
            params: { id: animal.id, name: animal.name, species: animal.species,
            veterinaryName: getVeterinarianName(animal.veterinary), veterinaryId: animal.veterinary, entry: animal.folder }})}}
          >
            <Text style={styles.modaltext}>{t.edit}</Text>
          </Pressable>
          <Pressable
            style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
            onPress={clear}
          >
            <Text style={styles.modaltext}>{t.goBack}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.directoryscreen}>
      {Object.keys(animal).length > 0 ? (
        // Render details when a animal is selected
        renderItemDetails()
      ) : (
        <View style={styles.directoryscreen}>
          <FlatList
            data={validAnimals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.modalbuttonContainer}>
            <Pressable
              style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
              onPress={() => router.push("/newJournal")}
            >
              <Text style={styles.modaltext}>{t.create}</Text>
            </Pressable>
            </View>
        </View>
      )}
      <Menu />
    </View>
  );
};

export default Journal;
