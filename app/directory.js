import { View, Text, Pressable, TouchableOpacity, Modal, FlatList, Button} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../utils/styles";
import { createNewChat } from "../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { getUsersPasswords } from "../database/firebase";
import { useRouter } from "expo-router";
import { messagingTitle, messagingID } from "../components/chat/MessagingTitle";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu/Menu";
import RatingStars from "../components/forums/stars";
import { ScrollView } from "react-native";
import axios from "axios";
const translations = {
  "en-US": {
    selectFilter: "Select Filter",
    location: "Location: ",
    price: "Price: ",
    rating: "Rating: ",
    specialization: "Specialization: ",
    contact: "Contact",
    cancel: "Cancel",
    mail: "Mail: ",
    phone: "Phone: ",
  },
  "es-ES": {
    selectFilter: "Seleccionar filtro",
    location: "Ubicación: ",
    price: "Precio: ",
    rating: "Calificación: ",
    specialization: "Especialidad: ",
    contact: "Contactar",
    cancel: "Cancelar",
    mail: "Correo: ",
    phone: "Teléfono: ",
  },
};

const Directory = () => {
  const router = useRouter();
  const [destinatary, setDestinatary] = useState({});
  const [validUsers, setValidUsers] = useState([]);
  const [filterBy, setFilterBy] = useState(""); // Estado para almacenar la opción de filtrado
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersPasswords();
        const Vusers = Object.values(users);
        const ids = Object.keys(users);
        const vetUsers = [];
        for (let index = 0; index < Vusers.length; index++) {
          if (Vusers[index].type == "vet") {
            Vusers[index].id = ids[index];
            vetUsers.push(Vusers[index]);
          }
        }
        setValidUsers(vetUsers);
      } catch (error) {
        console.error("Error al obtener contraseña del usuario:", error);
      }
    };
    fetchData();
  }, []);

  const back = () => {
    router.back();
  };

  const clear = () => {
    setDestinatary({});
  };

  const handleCreateRoom = async () => {
    if (destinatary) {
      const user = await AsyncStorage.getItem("username");
      const userData = await AsyncStorage.getItem(user);
      console.log("user", user);
      console.log("userData", userData);
      const userChats = Object.values(JSON.parse(userData).chats);
      //console.log("userChats", userChats);
      var chatKey = "";
      var newChat = true;
      var chat;
      for (let index = 0; index < userChats.length; index++) {
        chat = JSON.parse(await AsyncStorage.getItem(userChats[index]));
        //console.log("chat", chat);
        //console.log("chat.user", chat.usuarios);
        //console.log("destinatary.id", destinatary.id);
        if (
          chat.usuarios[0] == destinatary.id ||
          chat.usuarios[1] == destinatary.id
        ) {
          newChat = false;
          chatKey = chat.id;
          break;
        }
      }
      if (newChat) chatKey = await createNewChat(user, destinatary.id);
      //console.log("destinyID", destinatary.id);
      //console.log("validUsers", validUsers);
      try {
        messagingID.value = chatKey;
        messagingTitle.value = destinatary.id;
        router.back();
        router.push("/messaging");
      } catch (e) {
        console.error("Error! While saving room", e);
      }
    }
  };

  const renderItem = ({ item }) => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.directoryBox}>
        <Pressable
          onPress={() => setDestinatary(item)} // Set the selected user on press
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
            <RatingStars rating={item.vet_data.rating} maxRating={5} />
            <Text style={styles.directoryText}>
              {t.specialization}
              {item.vet_data.specialty}
            </Text>
            <Text style={styles.directoryText}>
              {t.location}{item.location}
            </Text>
            <Text style={styles.directoryText}>
              {t.mail}
              {item.vet_data.mail}
            </Text>
            <Text style={styles.directoryText}>
              {t.phone}
              {item.vet_data.phone}
            </Text>
            <Text style={styles.directoryText}>
              {t.price}
              {item.vet_data.prices}
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderItemDetails = () => (
    <View style={styles.directoryDetailsText}>
      <View>
        <Ionicons
          name="person-circle-outline"
          size={80}
          color="black"
          style={styles.cavatar}
        />
        <Text>{destinatary.name}</Text>
        <RatingStars rating={destinatary.vet_data.rating} maxRating={5} />
        <Text>
          {t.specialization}
          {destinatary.vet_data.specialty}
        </Text>
        <Text>
          {t.location}
          {destinatary.location}
        </Text>
        <Text>
          {t.mail}
          {destinatary.vet_data.mail}
        </Text>
        <Text>
          {t.phone}
          {destinatary.vet_data.phone}
        </Text>
        <Text>
          {t.price}
          {destinatary.vet_data.prices}
        </Text>
      </View>

      <View style={styles.modalbuttonContainer}>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={handleCreateRoom}
        >
          <Text style={styles.modaltext}>{t.contact}</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={clear}
        >
          <Text style={styles.modaltext}>{t.cancel}</Text>
        </Pressable>
      </View>
    </View>
  );

  const handleFilterChange = (itemValue) => {
    console.log("Entra a handleFilter con el valor ", itemValue);
    setFilterBy(itemValue);
    console.log("Debug");
    handleSearch(itemValue);
    setDropdownVisible(false);
  };

  const handleSearch = (filterBy) => {
    // Aquí puedes implementar la lógica de búsqueda según la opción seleccionada (filterBy)
    // Por ejemplo, filtrar la lista de veterinarios
    // ...lógica de filtrado
    console.log(typeof validUsers)
      axios.post('http://127.0.0.1:5000/get_dataa',validUsers)
    .then(response => {
      console.log("hay respuesta ",response.data); // Haz lo que necesites con los datos de la respuesta
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log("Debug");
    console.log("Realizar búsqueda con filtro:", filterBy);
  };

  const renderFilter = () => {

    const options = [
      { label: t.selectFilter, value: "" },
      { label: t.location, value: "Ubicación" },
      { label: t.price, value: "Precio" },
      { label: t.rating, value: "Calificación" },
      { label: t.specialization, value: "Especialización" },
    ];
    
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setDropdownVisible(true)}
          style={styles.dropdownButton}
        >
          <Text>{filterBy || t.selectFilter}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDropdownVisible}
        >
          <View style={styles.modalContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalItem}
                onPress={() => handleFilterChange(option.value)}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.directoryscreen}>
      {Object.keys(destinatary).length > 0 ? (
        // Render details when a destinatary is selected
        renderItemDetails()
      ) : (
        <View style={styles.directoryscreen}>
          {renderFilter()}
          <FlatList
            data={validUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <Menu />
    </View>
  );
};

export default Directory;
