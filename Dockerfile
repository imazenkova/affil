FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18 AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json* ./

RUN npm install --only=production

CMD ["npm", "start"]