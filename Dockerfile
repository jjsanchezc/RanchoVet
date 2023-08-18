# Seleccionar la imagen base
FROM node:14

RUN ["mkdir", "/install"]

ADD ["./package.json", "/install"]
WORKDIR /install
RUN npm install --verbose

# Instalar las dependencias
RUN npm install
RUN npm install -g nodemon
RUN npm install -g expo-cli
RUN npx expo install react-native@0.69.9
RUN npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
RUN npx expo install react-native-web@~0.18.7 react-dom@18.0.0
RUN npx expo install @expo/webpack-config@^0.17.0
RUN npx expo install @react-native-async-storage/async-storage
RUN npx expo install socket.io-client


ENV NODE_PATH=/install/node_modules

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
COPY . /app/

# Copiar los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar la CLI de React Native globalmente
#RUN npm install -g react-native-cli@0.71.3

# Exponer el puerto 19000 para Metro Bundler
EXPOSE 19000

# Exponer el puerto 19001 para el Debugger
#EXPOSE 19001

# Exponer el puerto 19002 para el Expo DevTools
#EXPOSE 19002

# Copiar el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
