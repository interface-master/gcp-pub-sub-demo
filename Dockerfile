FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY ./dist/ .

RUN npm install

RUN apk add nginx

COPY nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
