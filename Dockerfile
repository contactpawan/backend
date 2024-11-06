FROM node:20.10.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY . .
EXPOSE 8000

CMD ["npm", "run", "dev-server"]
