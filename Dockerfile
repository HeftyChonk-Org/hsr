# TODO: after building, it seems only .next is required for the 'npm run start' to serve the traffic
#       build the most compact image to run this web entirely on containers

FROM node:18-alpine

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma
COPY .env ./.env

RUN npm ci

COPY next.config.*js .
COPY tsconfig.json .

EXPOSE 3000

CMD npm run dev