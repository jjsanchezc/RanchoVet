# Seleccionar la imagen base
FROM node:14

WORKDIR /app/server
RUN npm install
ENV NODE_PATH=/server/node_modules

# Establecer el directorio de trabajo dentro del contenedor
COPY . /app/server/

# Copiar los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install
RUN npm install -g nodemon
RUN npm install -g express


# Exponer el puerto 19001 para el Debugger
# EXPOSE 3000

# Exponer el puerto 19002 para el Expo DevTools
EXPOSE 4000

# Copiar el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
