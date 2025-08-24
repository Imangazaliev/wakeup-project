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
echo "5. Тестирование создания запроса волонтера:"
VOLUNTEER_RESPONSE=$(curl -s -X POST "$BASE_URL/volunteers/create-request" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Анна Петрова",
    "phoneNumber": "+79001234567",
    "aboutSelf": "Студентка психологического факультета",
    "aboutTraineeship": "Хочу получить опыт работы с людьми"
  }')
echo "$VOLUNTEER_RESPONSE" | jq '.'

echo ""
echo "6. Тестирование получения статуса заявки:"
VOLUNTEER_ID=$(echo "$VOLUNTEER_RESPONSE" | jq -r '.id')
curl -s -X GET "$BASE_URL/volunteers/request-status/$VOLUNTEER_ID" | jq '.'

echo ""
echo "✅ Тестирование завершено!" 