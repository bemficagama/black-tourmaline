1. Instalacao
a) criar arquivo .env conforme exemplo de env_file, preencher o
token e dados da conecção com o banco de dados mysql
b) rodar:
npm install
2. Gerar imagem docker 
a) criar arquivo .npmrc e preencher com um token
b) Build:
docker build . -t nodejs-tourmaline --secret id=npmrc,src=.npmrc ou
DOCKER_BUILDKIT=1 docker build . -t nodejs-tourmaline --build-arg NPM_TOKEN=1234 --secret id=npmrc,src=.npmrc
c) Levantar IMagem
docker run -p 4000:4000 nodejs-tourmaline

https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/