# Backend — Агрегатор домашней еды

## Что уже работает

- Health-check endpoint
- CRUD для кухонь (создание, список, получение, обновление)
- Подключение к PostgreSQL
- Базовые сущности (User, Kitchen, MenuItem, Order, Ration)

## Как запустить

### 1. Установить зависимости

```bash
cd backend
npm install
```

### 2. Поднять PostgreSQL

**Вариант А — Docker (рекомендуется):**

```bash
docker run --name homemade-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=homemade_food \
  -p 5432:5432 \
  -d postgres:16
```

**Вариант Б — локальный PostgreSQL**  
Создай базу `homemade_food` и пользователя с паролем `postgres`.

### 3. Создать файл .env

```bash
cp .env.example .env
```

### 4. Запустить сервер

```bash
npm run start:dev
```

Сервер поднимется на: **http://localhost:3000**

---

## Как тестировать (Postman / браузер)

### 1. Проверка, что сервер жив

```
GET http://localhost:3000/api/health
```

Ответ:
```json
{
  "status": "ok",
  "message": "Агрегатор домашней еды — Backend работает",
  "timestamp": "...",
  "version": "0.1.0"
}
```

### 2. Создать кухню

```
POST http://localhost:3000/api/kitchens
Content-Type: application/json

{
  "name": "Домашняя кухня Зарины",
  "description": "ПП-рационы и домашняя еда",
  "cuisineTypes": ["домашняя", "пп"],
  "commissionRate": 18
}
```

### 3. Получить список кухонь

```
GET http://localhost:3000/api/kitchens
```

### 4. Получить одну кухню

```
GET http://localhost:3000/api/kitchens/{id}
```

---

## Что дальше

- Авторизация (регистрация / вход по телефону)
- Модуль меню (блюда)
- Создание заказа
- Панель партнёра и админка
