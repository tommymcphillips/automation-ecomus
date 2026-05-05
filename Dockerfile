# Imagen con Node, dependencias del sistema y navegadores alineados con @playwright/test.
# Versión en sync con package-lock.json (1.51.1).
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Misma semántica que en playwright.config.ts (retries, un worker en CI).
ENV CI=1

# Sustituible en `docker run imagen npm run test` u otro comando.
CMD ["npx", "playwright", "test"]
