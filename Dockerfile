FROM node:23.11.0-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY ./src ./src

RUN npm install
RUN npm run build
RUN npx prisma generate

FROM node:23.11.0-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV JWT_SECRET=my_secret_jwt_secret
ENV NEXT_PUBLIC_API_URL=http://localhost:3000/api

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3010

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
