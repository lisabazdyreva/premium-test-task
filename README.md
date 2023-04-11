## О приложении

Single Page Application на Angular, Ionic, Capacitor. Приложение с информацией о пиве, которая представлена в карточках. Любу. карточку можно открыть на отдельной странице и прочитать более детальную, развернутую информацию о напитке. Также на странице с подробностями доступна кнопка "Добавить в избранное". На главном экране список изюранного можно открыть для просмотра, удалить отдельные позиции или все сразу.

Также для удобства пользования реализован переключатель темного/светлого режима приложения.

## Как развернуть приложение локально

- Открыть терминал, склонировать репозиторий:
```bash
git clone git@github.com:lisabazdyreva/premium-test-task.git
```

- Открыть проект в среде разработки и установить зависимости проекта:
```bash
npm install
```

### в вебе
- Открыть терминал в среде разработки и запустить приложение:

```bash
npm run start
```

- Перейти в браузере по адресу:
  [Localhost:4200](http://localhost:4200/)


### файл apk под android

- Собрать проект в консоли в среды разработки: 

```bash
npm run build
```

- Выполнить команду в консоли:
```bash
  ionic cap add android
```

- Открыть проект в Android Studio (должна быть установлена) через консоль в среде разработки:
```bash
ionic cap open android
```

- Подождать, пока проект соберётся. После в меню открыть Build > Build Bundle(s) / APK (s) > Build APK(s). Выбрать Build APK(s).
- Подождать, пока проект соберётся. После он будет доступен в папке проекта: android/app/build/outputs/apk/debug
