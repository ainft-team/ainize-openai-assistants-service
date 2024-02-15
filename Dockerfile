FROM node:18

WORKDIR /apps

COPY . .

RUN yarn cache clean
RUN yarn install
CMD ["yarn", "start"]