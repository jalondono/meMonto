FROM node:10.19.0-buster
WORKDIR /meMonto
COPY package.json /meMonto
RUN npm install
COPY . /meMonto
CMD ["npm", "run", "dev"]
