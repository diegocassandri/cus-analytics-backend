FROM node:10.15.3

RUN useradd --user-group --create-home --shell /bin/false app && npm install --glabal npm@6.9.0

ENV HOME=/home/app

COPY package.json $HOME/cus-analytics-backend/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/cus-analytics-backend/
RUN npm install --silent --progress=false

USER root
COPY . $HOME/cus-analytics-backend
RUN chown -R app:app $HOME/*
USER app

CMD ["npm","start"]