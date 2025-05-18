FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli && npm install

COPY . .

CMD ["npm", "run", "start:dev"]
