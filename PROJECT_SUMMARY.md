# Pora Vstavat - Сводка проекта

## 🎯 Что реализовано

### ✅ Основная архитектура
- **Nest.js** приложение с TypeScript
- **PostgreSQL** база данных с **Drizzle ORM**
- **JWT аутентификация** с токенами в базе данных
- **Swagger UI** для автоматической документации API
- **Валидация данных** с class-validator

### ✅ База данных
- **Таблица users**: id, name, phone_number, type, created_at
- **Таблица verification_codes**: id, phone_number, code, sent_at
- **Таблица jwt_tokens**: id, user_id, token, is_valid, created_at, expires_at
- **Таблица volunteer_requests**: id, name, phone_number, status, about_self, about_traineeship, processed_by, created_at
- **Миграции** с помощью Drizzle Kit

### ✅ API Endpoints

#### Пользователи
- `POST /users` - Создание пользователя
- `GET /users/me` - Получение текущего пользователя (с JWT)

#### Верификация
- `POST /users/send-verification-code` - Отправка кода верификации
- `POST /users/check-code` - Проверка кода + получение JWT токена

#### Тестирование
- `GET /` - Проверка работоспособности
- `POST /test` - Тестовый endpoint

#### Волонтеры
- `POST /volunteers/create-request` - Создание запроса волонтера
- `GET /volunteers/request-status/:id` - Получение статуса заявки по ID

#### Кураторы
- `GET /curator/volunteer-requests` - Получение списка заявок волонтеров
- `GET /curator/volunteer-requests/:id` - Получение детальной информации о заявке
- `PUT /curator/volunteer-requests/:id/status` - Изменение статуса заявки

#### Семьи и персоны
- `GET /families` - Получение всех семей
- `GET /families/:id` - Получение подробной информации о семье с членами

### ✅ Безопасность
- **JWT токены** с хранением в базе данных
- **Валидация** входящих данных
- **Автоматическая инвалидация** использованных кодов
- **Срок действия** токенов (7 дней)

### ✅ Документация
- **Swagger UI** на `/api`
- **Автогенерация** документации из декораторов
- **Интерактивное тестирование** API
- **Подробный README** с инструкциями

## 🚀 Как запустить

1. **Установка зависимостей:**
   ```bash
   npm install
   ```

2. **Настройка базы данных:**
   ```bash
   cp env.example .env
   # Отредактируйте .env с вашими настройками БД
   npm run db:migrate
   ```

3. **Запуск приложения:**
   ```bash
   npm run start:dev
   ```

4. **Документация API:**
   ```
   http://localhost:3000/api
   ```

## 📁 Структура проекта

```
src/
├── auth/                 # JWT аутентификация
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── auth.middleware.ts
├── database/            # База данных
│   ├── database.module.ts
│   └── schema.ts
├── users/              # Модуль пользователей
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── dto/            # Data Transfer Objects
│       ├── index.ts
│       ├── create-user.dto.ts
│       ├── verification.dto.ts
│       └── response.dto.ts
├── volunteers/         # Модуль волонтеров
│   ├── volunteers.module.ts
│   ├── volunteers.service.ts
│   ├── volunteers.controller.ts
│   └── dto/           # Data Transfer Objects
│       ├── index.ts
│       ├── create-request.dto.ts
│       └── response.dto.ts
├── curator/           # Модуль кураторов
│   ├── curator.module.ts
│   ├── curator.service.ts
│   ├── curator.controller.ts
│   ├── curator.guard.ts
│   └── dto/          # Data Transfer Objects
│       └── volunteer-requests.dto.ts
├── families/          # Модуль семей
│   ├── families.module.ts
│   ├── families.service.ts
│   └── families.controller.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## 🔧 Команды

```bash
# Разработка
npm run start:dev      # Запуск в режиме разработки
npm run build          # Сборка проекта
npm run start:prod     # Запуск в продакшн режиме

# База данных
npm run db:generate    # Генерация миграций
npm run db:migrate     # Применение миграций
npm run db:studio      # Drizzle Studio

# Тестирование
npm run test           # Unit тесты
npm run test:e2e       # E2E тесты
./test-api.sh          # Быстрое тестирование API
npm run create-curator    # Создание аккаунта куратора
npm run seed-families     # Заполнение тестовыми данными

# Код
npm run lint           # Проверка кода
npm run format         # Форматирование
```

## 🎨 Особенности реализации

### JWT Стратегия
- Токены хранятся в базе данных
- Проверка валидности и срока действия
- Автоматическая инвалидация при выходе

### Валидация данных
- Использование class-validator
- Автоматическая документация в Swagger
- Строгая типизация TypeScript

### Swagger интеграция
- Автогенерация документации
- Интерактивное тестирование
- Bearer токен аутентификация
- Подробные примеры запросов/ответов

## 🔐 Переменные окружения

```env
# База данных
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=pora_vstavat

# Приложение
PORT=3000

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## 📊 Статистика проекта

- **Файлов**: ~20
- **Endpoints**: 12
- **Таблиц БД**: 6
- **DTO классов**: 11
- **Декораторов Swagger**: 35+

## 🎯 Готово к использованию!

Проект полностью настроен и готов к разработке. Все основные функции реализованы, документация создана, тестирование настроено. 