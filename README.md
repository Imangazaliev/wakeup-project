<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Pora Vstavat - Nest.js Application

Проект на Nest.js с Drizzle ORM и PostgreSQL.

## Установка и настройка

### Предварительные требования

- Node.js (версия 20.11+)
- PostgreSQL
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Настройка базы данных

1. Создайте базу данных PostgreSQL:
```sql
CREATE DATABASE pora_vstavat;
```

2. Скопируйте файл конфигурации:
```bash
cp env.example .env
```

3. Отредактируйте `.env` файл с вашими настройками базы данных:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=pora_vstavat
DB_SSL=false  # Установите true для включения SSL
```

4. Запустите миграции:
```bash
npm run db:migrate
```

### Запуск приложения

#### Режим разработки
```bash
npm run start:dev
```

#### Продакшн режим
```bash
npm run build
npm run start:prod
```

## API Documentation

### Swagger UI

Документация API доступна по адресу: **http://localhost:3000/api**

Swagger UI предоставляет интерактивную документацию для всех endpoints с возможностью тестирования API прямо из браузера.

### API Endpoints

#### Пользователи

- `POST /users` - Создать пользователя

#### Коды верификации

- `POST /users/send-verification-code` - Отправить код верификации (генерирует и возвращает 6-значный код)
- `POST /users/check-code` - Проверить код верификации (возвращает success и JWT токен при успешной проверке)

#### Аутентификация

- `GET /users/me` - Получить информацию о текущем пользователе (требует Bearer токен в заголовке Authorization)

#### Волонтеры

- `POST /volunteers/create-request` - Создать запрос волонтера
- `GET /volunteers/request-status/:id` - Получить статус заявки по ID

#### Кураторы (требует авторизацию и тип пользователя "curator")

- `GET /curator/volunteer-requests` - Получить список заявок волонтеров
- `GET /curator/volunteer-requests/:id` - Получить детальную информацию о заявке
- `PUT /curator/volunteer-requests/:id/status` - Изменить статус заявки (approved/rejected)

## Структура базы данных

### Таблица users
- `id` - Уникальный идентификатор (serial)
- `name` - Имя пользователя (varchar(255))
- `phone_number` - Номер телефона (varchar(20), уникальный)
- `type` - Тип пользователя: curator, ward, volunteer (text)
- `created_at` - Дата создания (timestamp)

### Таблица verification_codes
- `id` - Уникальный идентификатор (serial)
- `phone_number` - Номер телефона (varchar(20))
- `code` - Код верификации (varchar(6))
- `sent_at` - Дата отправки (timestamp)

### Таблица jwt_tokens
- `id` - Уникальный идентификатор (serial)
- `user_id` - ID пользователя (integer, foreign key)
- `token` - JWT токен (text)
- `is_valid` - Валидность токена (boolean)
- `created_at` - Дата создания (timestamp)
- `expires_at` - Дата истечения (timestamp)

### Таблица volunteer_requests
- `id` - Уникальный идентификатор (serial)
- `name` - Имя волонтера (varchar(255))
- `phone_number` - Номер телефона (varchar(20))
- `status` - Статус заявки: pending, approved, rejected (text, default: pending)
- `about_self` - Информация о себе (text)
- `about_traineeship` - Информация о стажировке (text)
- `processed_by` - ID пользователя, обработавшего заявку (integer, foreign key, nullable)
- `created_at` - Дата создания (timestamp)

## Команды для работы с базой данных

```bash
# Генерация миграций
npm run db:generate

# Применение миграций
npm run db:migrate

# Запуск Drizzle Studio (веб-интерфейс для БД)
npm run db:studio
```

## Тестирование

```bash
# Запуск тестов
npm run test

# Запуск тестов в режиме watch
npm run test:watch

# Запуск e2e тестов
npm run test:e2e
```

## Валидация данных

Проект использует `class-validator` для валидации входящих данных. Все DTO (Data Transfer Objects) содержат декораторы валидации:

- `@IsString()` - проверка на строку
- `@IsNotEmpty()` - проверка на непустое значение
- `@IsEnum()` - проверка на перечисление
- `@ApiProperty()` - Swagger документация

## Тестирование API

### Автоматическое тестирование

Запустите скрипт для быстрого тестирования API:

```bash
./test-api.sh
```

### Ручное тестирование

1. **Проверка работоспособности:**
   ```bash
   curl http://localhost:3000/
   ```

2. **Тестовый endpoint:**
   ```bash
   curl -X POST http://localhost:3000/test \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

3. **Проверка валидации:**
   ```bash
   curl -X POST http://localhost:3000/users/send-verification-code \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

## Линтинг и форматирование

```bash
# Проверка кода
npm run lint

# Форматирование кода
npm run format
```
