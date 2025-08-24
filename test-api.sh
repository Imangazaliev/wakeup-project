#!/bin/bash

echo "🧪 Тестирование API Pora Vstavat"
echo "=================================="

BASE_URL="http://localhost:3000"

echo ""
echo "1. Проверка основного endpoint:"
curl -s "$BASE_URL/" | jq -r '.'

echo ""
echo "2. Тестирование POST /test:"
curl -s -X POST "$BASE_URL/test" \
  -H "Content-Type: application/json" \
  -d '{"test": "data", "number": 123}' | jq '.'

echo ""
echo "3. Проверка Swagger UI:"
echo "Swagger доступен по адресу: $BASE_URL/api"

echo ""
echo "4. Тестирование валидации (ожидается ошибка 400):"
curl -s -X POST "$BASE_URL/users/send-verification-code" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.'

echo ""
echo "✅ Тестирование завершено!" 