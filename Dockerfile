FROM node:10.19.0-buster
# WORKDIR specifies the directory our
# application's code will live within
WORKDIR /meMonto
# We copy our package.json file to our
# app directory
COPY package.json /meMonto
# We then run npm install to install
# express for our application
RUN npm install
# We then copy the rest of our application
# to the app direcoty
COPY . /meMonto
# We start our application by calling
# npm start.
CMD ["npm", "run", "dev"]
# Replace This line is for production
# CMD ["npm", "start"]
# Command To create new image associated with dockerfile
# sudo docker build -t me-monto-image .
# Command To run image created
# sudo docker run -it -p 5003:5000 -v $(pwd):/meMonto me-monto-image
