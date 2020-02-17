FROM node:10.15.3

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3333
CMD ["npm","start"]