Fplayerctl previousROM node:latest
ADD . /kanban-api
WORKDIR /kanban-api
RUN npm install
RUN npm install nodemon -g
RUN npm install babel-cli -g
CMD npm start
