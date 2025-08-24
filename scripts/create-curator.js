#!/usr/bin/env node

const readline = require('readline');
const { Pool } = require('pg');
require('dotenv').config();

// Создаем интерфейс для чтения ввода
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для запроса ввода
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Функция для валидации номера телефона
function validatePhoneNumber(phone) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

// Функция для валидации имени
function validateName(name) {
  return name.length >= 2 && name.length <= 100;
}

// Основная функция создания куратора
async function createCurator() {
  console.log('🎯 Создание аккаунта куратора');
  console.log('=============================\n');

  try {
    // Подключение к базе данных
    const pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'pora_vstavat',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    });

    // Запрашиваем имя
    let name;
    do {
      name = await askQuestion('Введите имя куратора: ');
      if (!validateName(name)) {
        console.log('❌ Имя должно содержать от 2 до 100 символов');
      }
    } while (!validateName(name));

    // Запрашиваем номер телефона
    let phoneNumber;
    do {
      phoneNumber = await askQuestion('Введите номер телефона (например, +79001234567): ');
      if (!validatePhoneNumber(phoneNumber)) {
        console.log('❌ Неверный формат номера телефона');
      }
    } while (!validatePhoneNumber(phoneNumber));

    // Проверяем, не существует ли уже пользователь с таким номером
    const existingUser = await pool.query(
      'SELECT id, name, type FROM users WHERE phone_number = $1',
      [phoneNumber]
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      console.log(`\n⚠️  Пользователь с номером ${phoneNumber} уже существует:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Имя: ${user.name}`);
      console.log(`   Тип: ${user.type}`);
      
      const update = await askQuestion('\nХотите изменить тип на "curator"? (y/n): ');
      
      if (update.toLowerCase() === 'y' || update.toLowerCase() === 'yes') {
        await pool.query(
          'UPDATE users SET name = $1, type = $2 WHERE phone_number = $3',
          [name, 'curator', phoneNumber]
        );
        console.log('✅ Тип пользователя успешно изменен на "curator"');
      } else {
        console.log('❌ Операция отменена');
        process.exit(0);
      }
    } else {
      // Создаем нового пользователя
      const result = await pool.query(
        'INSERT INTO users (name, phone_number, type) VALUES ($1, $2, $3) RETURNING id, name, phone_number, type, created_at',
        [name, phoneNumber, 'curator']
      );

      const newUser = result.rows[0];
      console.log('\n✅ Куратор успешно создан!');
      console.log('📋 Информация о кураторе:');
      console.log(`   ID: ${newUser.id}`);
      console.log(`   Имя: ${newUser.name}`);
      console.log(`   Телефон: ${newUser.phone_number}`);
      console.log(`   Тип: ${newUser.type}`);
      console.log(`   Дата создания: ${newUser.created_at}`);
    }

    await pool.end();
    console.log('\n🎉 Операция завершена успешно!');

  } catch (error) {
    console.error('\n❌ Ошибка при создании куратора:');
    console.error(error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Убедитесь, что:');
      console.log('   - База данных PostgreSQL запущена');
      console.log('   - Переменные окружения настроены правильно');
      console.log('   - Файл .env существует и содержит правильные данные');
    }
  } finally {
    rl.close();
  }
}

// Запускаем скрипт
createCurator(); 