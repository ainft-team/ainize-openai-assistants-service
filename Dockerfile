FROM node:18

WORKDIR /apps

COPY . .

RUN yarn install
CMD ["yarn", "start"]