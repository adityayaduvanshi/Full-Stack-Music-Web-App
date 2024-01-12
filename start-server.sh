#!/usr/bin/env bash

s_compose="docker-compose --env-file .env.local"
$s_compose rm && $s_compose up

npm i && npm i -g dotenv-cli && npm run dev
