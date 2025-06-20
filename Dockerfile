FROM node:20-alpine
WORKDIR /app
COPY backend/package.json backend/tsconfig.json ./
RUN npm install || true
COPY backend ./backend
CMD ["npm", "run", "start:dev", "--prefix", "backend"]
