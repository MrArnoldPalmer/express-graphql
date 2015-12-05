FROM node:latest
ADD . /kanban-api
WORKDIR /kanban-api
RUN npm install
RUN npm install nodemon -g
CMD npm start
