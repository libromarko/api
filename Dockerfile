FROM node:14

WORKDIR /app
COPY ./package.json /app/

RUN yarn


COPY . /app/

RUN npx prisma generate

#RUN yarn prisma db push

#RUN npm run start

#COPY . /app/

#RUN npm run build

#COPY . /app/
#EXPOSE 3000
#RUN npx prisma generate



#CMD ["yarn", "start"]

