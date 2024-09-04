
## Дата выполнения

04.09.2024

# Car Info App

Car Info App — это веб-приложение для отображения информации о машинах с возможностью фильтрации, сортировки и добавления новых машин. Приложение разработано с использованием Next.js, React и Tailwind CSS.

## Требования

Перед установкой и запуском убедитесь, что у вас установлены следующие инструменты:

- Node.js (версия 14 или выше)
- npm (версия 6 или выше) или yarn

## Установка

1. Перейдите в директорию проекта:

    ```bash
    cd car-info-app
    ```

2. Установите зависимости:

С использованием npm:

    ```bash
    npm install
    ```

С использованием yarn:

    ```bash
    yarn install
    ```

## Запуск

### Для разработки:

1. Запустите сервер разработки:

    ```bash
    npm run dev
    ```

    или

    ```bash
    yarn dev
    ```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

### Для сборки и запуска в production:

1. Создайте сборку приложения:

    ```bash
    npm run build
    ```

    или

    ```bash
    yarn build
    ```

2. После успешной сборки запустите приложение:

    ```bash
    npm start
    ```

    или

    ```bash
    yarn start
    ```

## Задание

Вашей задачей является создание веб-приложения для отображения информации о автомобилях с использованием React и Typescript. Приложение должно предоставлять пользователю возможность просматривать список автомобилей, фильтровать их по различным параметрам и просматривать подробную информацию о каждом автомобиле.

### Основные требования:
1. Создайте React-приложение с использованием Nextjs, Typescript.
2. В качестве сервера для приложения используйте возможности Nextjs для создания API. (Данные можно захардкодить / читать из файла / реализовать серверную логику). Важно, чтобы данные получались асинхронно с небольшой задержкой.
3. Приложение не должно вызывать перезагрузки страницы при переходах между разделами. Каждая страница должна быть доступна по прямой ссылке (например, должна быть возможность открыть детальную страницу авто по ссылке).
4. Данные о автомобилях должны получаться в приложении из внешнего источника (пункт 2) с использованием библиотеки Axios (реализацию серверной части оставляем за вами - она оцениваться не будет).
5. Данные об автомобилях должны включать изображение, бренд, модель, цвет, цену, год выпуска, тип двигателя (возможные значения: Бензиновый, Дизельный, Электрический), трансмиссию(возможные значения: Автоматическая, Ручная, Роботизированная - доступно только для типа двигателя "Бензиновый" или "Дизельный") и запас хода (для электрических авто).
6. В списке каждый автомобиль должен быть представлен краткой информацией, включая бренд, модель, год выпуска и изображение.
7. Реализуйте функциональность отображения подробной информации о выбранном автомобиле. При клике на автомобиль из списка, должна открываться страница с полной информацией о выбранном автомобиле (все доступные параметры авто).
8. Оформите стили приложения для обеспечения приятного пользовательского опыта. Реализацию стилей выбирайте на свое усмотрение: CSS, SCSS, LESS, Styled Components и т.д.

### Дополнительные задания (необязательные, но желательные):
9. Добавьте возможность сортировать список автомобилей по году выпуска и цене (по возрастанию и убыванию).
10. Реализуйте возможность фильтровать список автомобилей по марке и цвету.
11. Создайте страницу для добавления новых автомобилей в список. Пользователь должен вводить данные о новом автомобиле (бренд, модель, год выпуска, цвет, цена, изображение) и добавлять его в список.

### Усложнённые задания (необязательные, но высоко оценённые):
12. Создайте систему аутентификации и авторизации пользователей. Пользователь может добавлять автомобили только после авторизации.
13. Реализуйте пагинацию или бесконечную подгрузку для списка автомобилей, если список становится слишком большим (более 10 авто).

## Комментарии

- В карточке автомобиля добавлено также поле цены для визуализации пунктов 6 и 9 (если мы сортируем по цене, стоит её видеть).
- В пагинации установлен лимит не на 10 элементов, а на 9, для более приятного отображения (сетка 3х3. 5х2 создала бы слишком маленькие карточки, а 2х5 или 1х10 было бы долго и не красиво прокручивать).