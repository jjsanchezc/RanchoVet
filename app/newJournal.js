import React, { useState, useEffect } from "react";
import { styles } from "../utils/styles";
import * as Localization from "expo-localization";
import { newJournalEntry, getUsersPasswords } from "../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";

const translations = {
    "en-US": {
      animal: "Animal Name: ",
      species: "Animal Species: ",
      veterinarian: "Veterinarian: ",
      entry: "Type of Entry: ",
      create: "Create Entry",
      errorFetchingUserPassword: "Error fetching user's password",
    },
    "es-ES": {
        animal: "Nombre del Animal: ",
        species: "Especie del Animal: ",
        veterinarian: "Veterinario: ",
        entry: "Tipo de Entrada: ",
        create: "Crear Entrada",
      errorFetchingUserPassword: "Error al obtener contraseña del usuario",
    },
  };

const newJournal = () => {
  const [validUsers, setValidUsers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputSpecies, setInputSpecies] = useState("");
  const [inputVeterinarian, setInputVeterinarian] = useState("");
  const [inputEntry, setInputEntry] = useState("");
  const router = useRouter();
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  
  // Get Veterinarians
  useEffect(() => {
    const fetchData = async () => {
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
              value: Vusers[index].name, // Adjust this to the actual property you want to display
            });
          }
        }
        setValidUsers(vetUsers);
      } catch (error) {
        console.error("Error al obtener contraseña del usuario:", error);
      }
    };
    fetchData();
  }, []);

  // Get username and create journal entry
    const createJournalEntry = async (name, species, veterinary, entry) => {
        try {
        const userId = await AsyncStorage.getItem("username");
        if (!userId) {
            navigate("/");
            return;
        }
        await newJournalEntry(userId, entry, name, species, veterinary);
        } catch (error) {
        console.error("Error creating journal entry:", error);
        }
    };


  return (
    <View style={styles.forumScreen}>
      <Text> {t.animal} </Text>
      <TextInput
          autoCorrect={true}
          style={styles.forumInput}
          value={inputName}
          onChangeText={setInputName}
        />

        <Text> {t.species} </Text>
        <TextInput
          autoCorrect={true}
          style={styles.forumInput}
          value={inputSpecies}
          onChangeText={setInputSpecies}
        />
        
        
        <Text> {t.entry} </Text>
        <TextInput
          autoCorrect={true}
          style={styles.forumInput}
          value={inputEntry}
          onChangeText={setInputEntry}
        />

        <Text> {t.veterinarian} </Text>
        <SelectList
            setSelected={(val) => setInputVeterinarian(val)}
            data={validUsers}
            save="key"
        />

        <View style={styles.modalbuttonContainer}>
            <Pressable
              style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
              onPress={() => {
                createJournalEntry(inputName, inputSpecies, inputVeterinarian, inputEntry);
                router.push("/journal");
              }}
            >
              <Text style={styles.modaltext}>{t.create}</Text>
            </Pressable>
        </View>
    </View>
  )
};

export default newJournal;