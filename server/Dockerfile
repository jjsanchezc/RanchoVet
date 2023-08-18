# Seleccionar la imagen base
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app/server

# Copiar los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install
RUN npm install -g expo-cli
RUN npm install react-native@0.69.9
RUN npm install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
RUN npm install react-native-web@~0.18.7 react-dom@18.0.0
RUN npm install @expo/webpack-config@^0.17.0
RUN npm install @react-native-async-storage/async-storage
RUN npm install socket.io-client


# Exponer el puerto 19001 para el Debugger
EXPOSE 3000

# Exponer el puerto 19002 para el Expo DevTools
EXPOSE 4000

# Copiar el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
