FROM node:16.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD [ "node", "score.js" ]