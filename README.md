# Веб-приложение «Чат»

https://messenger.xalt.ru
-

В разработке.

4 спринт. Последний пулл реквест:
https://github.com/yurylunev/middle.messenger.praktikum.yandex/pull/15


## Запуск приложения

### Установка и запуск
```shell
git clone git@github.com:yurylunev/middle.messenger.praktikum.yandex.git
npm install
npm start
```

http://localhost:3000

### Запуск версии для разработчиков
```shell
npm run dev
```
http://localhost:1234

### Сборка рабочей версии приложения
```shell
npm run build
```

## Макеты приложения

Прототипы экранов 
[в Figma](https://www.figma.com/file/rNpBDNEm4kEzHS6TEgba2P/YANDEX.-CHAT?node-id=0%3A1)

## Домен на Netlify

https://cranky-blackwell-f477f2.netlify.app

### Версия 1:
- Свёрстаны макеты
- Разработан собственный шаблонизатор

### Версия 2:
- Добавлен TypeScript
- Созданы компоненты для всего приложения
- Добавлен функционал сбора данных из форм и их валидация
- Разработана событийная модель, хранилище данных  
- Добавлены вебсокеты в чаты
- Добавлены линтеры для кода и стилей

### Версия 3:
- Добавлена сборка на webpack 5
- Добавлена сборка приложения в Docker с помощью docker-compose
- Приложение [развёрнуто](https://messenger.xalt.ru) на собственном хостинге

### Pull request:
https://github.com/yurylunev/middle.messenger.praktikum.yandex/pull/15
