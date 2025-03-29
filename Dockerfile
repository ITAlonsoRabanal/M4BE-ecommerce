FROM node:20

WORKDIR /app

COPY package*.json ./

# Instalamos las dependencias y Nest CLI
RUN npm install && npm install -g @nestjs/cli && npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
