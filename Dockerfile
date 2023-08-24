FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@10.0.4
COPY . .
RUN ng build --prod
EXPOSE 8080
CMD [ "npm", "start" ]