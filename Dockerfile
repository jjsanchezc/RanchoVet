# Seleccionar la imagen base
FROM node:14-alpine

WORKDIR /app


ENV NODE_PATH=/node_modules


# Establecer el directorio de trabajo dentro del contenedor
COPY . /app

# Copiar los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install && \
    npm install -g nodemon && \
    npm install -g expo-cli && \
    npm install -g react-native-cli && \
    npm install react-native-svg@13.4.0
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

