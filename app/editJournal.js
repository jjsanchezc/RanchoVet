import React, { useState, useEffect } from "react";
import { styles } from "../utils/styles";
import * as Localization from "expo-localization";
import { editJournalEntry, getUsersPasswords } from "../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, Button } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter, useLocalSearchParams } from "expo-router";
import Menu from "../components/Menu/Menu";
import * as constantes from "../constants";

const translations = {
    "en-US": {
      animal: "Animal Name: ",
      species: "Animal Species: ",
      veterinarian: "Veterinarian: ",
      entry: "Type of Entry: ",
      edit: "Edit Entry",
      errorFetchingUserPassword: "Error fetching user's password",
    },
    "es-ES": {
        animal: "Nombre del Animal: ",
        species: "Especie del Animal: ",
        veterinarian: "Veterinario: ",
        entry: "Tipo de Entrada: ",
        edir: "Editar Entrada",
      errorFetchingUserPassword: "Error al obtener contraseña del usuario",
    },
  };

const newJournal = () => {
  const [validUsers, setValidUsers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputSpecies, setInputSpecies] = useState("");
  const [inputVeterinarian, setInputVeterinarian] = useState("");
  const [inputEntry, setInputEntry] = useState("");
  const params = useLocalSearchParams();
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
    const edJournalEntry = async (name, species, veterinary, entry) => {
        try {
        const userId = await AsyncStorage.getItem("username");
        if (!userId) {
            navigate("/");
            return;
        }
        // DefaultValue function in front not working, using this as a workaround in the meantime
        if (name == "") {
            name = params.name;
        }
        if (species == "") {
            species = params.species;
        }
        if (veterinary == "") {
            veterinary = params.veterinaryId;
        }
        if (entry == "") {
            entry = params.entry;
        }
        await editJournalEntry(userId, entry, name, species, veterinary, params.id);
        } catch (error) {
        console.error("Error creating journal entry:", error);
        }
    };


  return (
    <View style={styles.forumScreen}>
      <Text> {t.animal} </Text>
      <TextInput
          placeholder={params.name}
          autoCorrect={true}
          style={styles.forumInput}
          value={inputName}
          onChangeText={setInputName}
        />

        <Text> {t.species} </Text>
        <TextInput
          placeholder={params.species}
          autoCorrect={true}
          style={styles.forumInput}
          value={inputSpecies}
          onChangeText={setInputSpecies}
        />
        
        
        <Text> {t.entry} </Text>
        <TextInput
          placeholder={params.entry}
          autoCorrect={true}
          style={styles.forumInput}
          value={inputEntry}
          onChangeText={setInputEntry}
        />

        <Text> {t.veterinarian} </Text>
        <SelectList
            setSelected={(val) => setInputVeterinarian(val)}
            data={validUsers}
            placeholder={params.veterinaryName}
            save="key"
        />

        <Button
          title={t.edit}
          color={constantes.COLORS.tertiary}
          style={styles.forumButton}
          onPress={() => {
            edJournalEntry(inputName, inputSpecies, inputVeterinarian, inputEntry);
            router.push("/journal");
          }}/>
    </View>
  )
};

export default newJournal;