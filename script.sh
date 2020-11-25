#!/bin/zsh

BASE_URL="localhost:3000"

echo "requesting all heroes \n"
curl -i "$BASE_URL/heroes"

echo "\n requesting xuxa \n"
curl -i "$BASE_URL/heroes/1"

echo "\n Creating Chapolin \n"
CREATE=$(curl --silent -X POST \
		--data-binary '{"name": "Chapolin", "age": 100, "power": "Strength"}' \
		"$BASE_URL/heroes")

echo $CREATE
ID=$(echo $CREATE | jq .id)

echo "\n requesting Chapolin \n"
curl -i "$BASE_URL/heroes/$ID"
