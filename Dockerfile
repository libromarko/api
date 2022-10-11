FROM node:14

WORKDIR /app
COPY ./package.json /app/

RUN yarn

COPY . /app/

RUN npx prisma generate
