#!/bin/bash

ENV_FILE=".env.$NODE_ENV"

dotenv() {
  set -a
  [ -f .env ] && . ./.env
  [ -f $ENV_FILE ] && . ./$ENV_FILE
  set +a
}

# Run dotenv
dotenv
