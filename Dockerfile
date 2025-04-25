FROM node:22-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package*.json .

RUN npm install

COPY dist ./dist

EXPOSE 3000

CMD [ "node", "dist/app.js" ]