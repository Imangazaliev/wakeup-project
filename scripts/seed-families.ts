import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/database/schema';
import { persons, families } from '../src/database/schema';
import * as dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

// Тестовые данные для персон
const testPersons = [
  {
    name: 'Иван Петров',
    sex: 'male' as const,
    phoneNumber: '+79001234567',
    birthDate: '1985-03-15'
  },
  {
    name: 'Мария Петрова',
    sex: 'female' as const,
    phoneNumber: '+79001234568',
    birthDate: '1987-07-22'
  },
  {
    name: 'Алексей Петров',
    sex: 'male' as const,
    phoneNumber: '+79001234569',
    birthDate: '2010-11-08'
  },
  {
    name: 'Анна Сидорова',
    sex: 'female' as const,
    phoneNumber: '+79005554433',
    birthDate: '1990-05-20'
  },
  {
    name: 'Дмитрий Сидоров',
    sex: 'male' as const,
    phoneNumber: '+79005554434',
    birthDate: '1988-12-03'
  },
  {
    name: 'Елена Сидорова',
    sex: 'female' as const,
    phoneNumber: '+79005554435',
    birthDate: '2012-04-15'
  },
  {
    name: 'Сергей Иванов',
    sex: 'male' as const,
    phoneNumber: '+79007778899',
    birthDate: '1975-09-10'
  },
  {
    name: 'Ольга Иванова',
    sex: 'female' as const,
    phoneNumber: '+79007778890',
    birthDate: '1978-01-25'
  },
  {
    name: 'Михаил Иванов',
    sex: 'male' as const,
    phoneNumber: '+79007778891',
    birthDate: '2005-06-30'
  },
  {
    name: 'Татьяна Козлова',
    sex: 'female' as const,
    phoneNumber: '+79009990001',
    birthDate: '1982-11-12'
  }
];

// Тестовые данные для семей (ID будут установлены динамически)
const testFamilies = [
  {
    city: 'Москва',
    address: 'ул. Тверская, д. 1, кв. 5',
    contactPersonIndex: 0 // Иван Петров (первый в списке)
  },
  {
    city: 'Санкт-Петербург',
    address: 'Невский пр., д. 10, кв. 15',
    contactPersonIndex: 3 // Анна Сидорова (четвертый в списке)
  },
  {
    city: 'Екатеринбург',
    address: 'ул. Ленина, д. 25, кв. 8',
    contactPersonIndex: 6 // Сергей Иванов (седьмой в списке)
  },
  {
    city: 'Новосибирск',
    address: 'ул. Красная, д. 15, кв. 12',
    contactPersonIndex: 9 // Татьяна Козлова (десятый в списке)
  }
];

async function seed() {
  console.log('🌱 Заполнение базы данных тестовыми данными...');
  console.log('=============================================\n');

  // Проверяем наличие обязательных переменных окружения
  const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Отсутствуют обязательные переменные окружения:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\n💡 Убедитесь, что файл .env существует и содержит все необходимые переменные.');
    process.exit(1);
  }

  // Выводим информацию о подключении к базе данных
  console.log('📊 Настройки подключения к базе данных:');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   Port: ${process.env.DB_PORT || 5432}`);
  console.log(`   Database: ${process.env.DB_NAME}`);
  console.log(`   User: ${process.env.DB_USER}`);
  console.log(`   SSL: ${process.env.DB_SSL === 'true' ? 'enabled' : 'disabled'}`);
  console.log('');

  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  const db = drizzle(pool, { schema });

  try {
    // Проверяем подключение к базе данных
    console.log('🔌 Проверка подключения к базе данных...');
    await pool.query('SELECT 1');
    console.log('✅ Подключение к базе данных успешно\n');

    // Очищаем существующие данные
    console.log('🧹 Очистка существующих данных...');
    await db.delete(families);
    await db.delete(persons);
    console.log('✅ Данные очищены\n');

    // Создаем персон
    console.log('👥 Создание персон...');
    const createdPersons = await db.insert(persons).values(testPersons).returning();
    
    for (const person of createdPersons) {
      console.log(`   ✅ Создана персона: ${person.name} (ID: ${person.id})`);
    }
    console.log(`✅ Создано ${createdPersons.length} персон\n`);

    // Создаем семьи
    console.log('🏠 Создание семей...');
    
    // Создаем семьи с правильными ID контактных лиц
    const familiesToInsert = testFamilies.map(family => ({
      city: family.city,
      address: family.address,
      contactPersonId: createdPersons[family.contactPersonIndex].id
    }));
    
    const createdFamilies = await db.insert(families).values(familiesToInsert).returning();
    
    for (const family of createdFamilies) {
      const contactPerson = createdPersons.find(p => p.id === family.contactPersonId);
      console.log(`   ✅ Создана семья: ${family.city} (ID: ${family.id}, контакт: ${contactPerson?.name})`);
    }
    console.log(`✅ Создано ${createdFamilies.length} семей\n`);

    // Выводим статистику
    console.log('📊 Статистика:');
    const personsCount = await db.select().from(persons);
    const familiesCount = await db.select().from(families);
    console.log(`   👥 Персон: ${personsCount.length}`);
    console.log(`   🏠 Семей: ${familiesCount.length}`);

    console.log('\n🎉 База данных успешно заполнена тестовыми данными!');
    console.log('\n💡 Для тестирования API используйте:');
    console.log('   GET /families - получить список семей');
    console.log('   GET /families/1 - получить подробную информацию о семье с ID 1');

  } catch (error) {
    console.error('\n❌ Ошибка при заполнении базы данных:');
    console.error(error);
    
    if (error instanceof Error && 'code' in error) {
      const errorCode = (error as any).code;
      
      if (errorCode === 'ECONNREFUSED') {
        console.log('\n💡 Убедитесь, что:');
        console.log('   - База данных PostgreSQL запущена');
        console.log('   - Переменные окружения настроены правильно');
        console.log('   - Файл .env существует и содержит правильные данные');
      } else if (errorCode === '28P01') {
        console.log('\n💡 Ошибка аутентификации. Проверьте:');
        console.log('   - Правильность DB_USER и DB_PASSWORD');
        console.log('   - Права доступа пользователя к базе данных');
      } else if (errorCode === '3D000') {
        console.log('\n💡 База данных не найдена. Проверьте:');
        console.log('   - Правильность DB_NAME');
        console.log('   - Существование базы данных');
      }
    }
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Запускаем seeder
seed(); 