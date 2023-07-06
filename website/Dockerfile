FROM cgr.dev/chainguard/node:latest-dev as dev
USER root
WORKDIR /src
COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npm run build

FROM cgr.dev/chainguard/nginx:latest
COPY --from=dev /src/dist /usr/share/nginx/html
EXPOSE 8080
