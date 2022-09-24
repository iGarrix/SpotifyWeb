import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  lng: "En",
  resources: {
    En: {
      translation: {
        // GLOBAL
        // Main SideBar
        "Home": "Home",
        "Search": "Search",
        "Genres": "Genres",
        "History": "History",
        "NewPl": "New Playlist",
        "SaveLib": "Media Library",
        //Settings page
        "Settings": "Settings",
        "Language": "Language",
        "Choose language": "Choose language",
        "Theme": "Theme",
        "Choose theme": "Choose theme",
        "Storage & Cookies": "Storage & Cookies",
        "Active light": "Active light",
        "Active dark": "Active dark",
        "ClearTitle": "Clear all data in storage and cookies",
        "Clear": "Clear All",
        "Cookie & Storage Rules": "Cookie & Storage Rules",
        "• OAuth2 Authorizate": "• OAuth2 Authorizate",
        "OAuth2 Authorizate 1": "When you authorize using Google, your authorization session will be created in the cookie",
        "OAuth2 Authorizate 2": "!At authorization, your data remains completely confidential!",
        "OAuth2 Authorizate 3": "Registration using Google is very simple, your data is automatically adjusted to your new profile",
        "OAuth2 Authorizate 4": "If you delete your session, you will need to log in to your profile again",
        "• Queue & History": "• Queue & History",
        "Queue & History 1": "The history of your listening to songs and the queue is recorded in the local storage",
        "Queue & History 2": "!Audition data and queues remain completely confidential!",
        "Queue & History 3": "If you clear your local storage, your listening data and queues will be cleared automatically",
        "• Language": "• Language",
        "Language 1": "The interface language is written to local storage",
        "Language 2": "If you clear your local storage, your chosed language data will be cleared automatically",
        "• Theme": "• Theme",
        "Theme 1": "The interface theme is written to local storage",
        "Theme 2": "If you clear your local storage, your chosed theme data will be cleared automatically",
        "• Save Volume": "• Save Volume",
        "Save Volume 1": "If you change the sound, it will remain as you left it in the future use of the service",
        "Save Volume 2": "If you clear your local storage, your volume data will be cleared automatically",
        //My media library
        "Your saves library": "Your saves library",
        "Songs": "songs",
        "Albums": "albums",
        "Playlists": "playlists",
        "Creators": "creators",
        "Save you first single song": "Save you first single song",
        "You can also login your account": "You can also login your account",
        "Save you first playlist": "Save you first playlist",
        "Save you first artist": "Save you first artist",
        "Save you first album": "Save you first album",
        //Creative studio
        "Playl": "Playlists",
        "Single": "Single",
        "Create new Playlist": "Create new Playlist",
        "Create you first playlist": "Create you first playlist",
        "You can also upload a new single or album": "You can also upload a new single or album",
        "Upload": "Upload",
        "Manage my single": "Manage my single",
        "Uplaod you first single": "Uplaod you first single",
        "You can also upload a new album or create new playlist": "You can also upload a new album or create new playlist",
        "Upload you first single": "Upload you first single",
        "Manage my albums": "Manage my albums",
        "Upload you first albums": "Upload you first albums",
        "You can also upload a new single or create new playlist": "You can also upload a new single or create new playlist",
        "Upload you first album": "Upload you first album",
        //Create playlist modal 
        "Create playlist": "Create playlist",
        "Enter name": "Enter name",
        "Chose access type": "Chose access type",
        "Public": "Public",
        "Private": "Private",
        "Create": "Create",
        //Change playlist modal
        "Change": "Change",
        "Enter new name": "Enter new name",
        "Chose new access type": "Chose new access type",
        "Save": "Save",
        //Playlist overview
        "Playlist": "Playlist",
        "Add something to your playlist": "Add something to your playlist",
        "Tracks not found": "Tracks not found",
        "Found by": "Found by",
        "See all": "See all",
        //Playlist card
        "Date": "Date",
        "Type": "Type",
        "Listening": "Listening",
        //Change album modal
        "Change data": "Change data",
        "Enter new description": "Enter new description",
        "Background image": "Background image",
        //History
        "Listening history": "Listening history",
        "Clear all history": "Clear all history",
        "History is empty": "History is empty",
        "You can also listening your favorite songs using search": "You can also listening your favorite songs using search",
        "Search songs": "Search songs",
        "Remove": "Remove",
        //Sound history item
        "Realised": "Realised",
        "realised": "realised",
        //Search
        "All result": "All result",
        "Album": "Albums",
        "Playlis": "Playlists",
        "Tracks": "Tracks",
        "Artists": "Artists",
        "Profiles": "Profiles",
        "Best result": "Best result",
        "Song": "Songs",
        "No tracks": "No tracks",
        //Sound item
        "Sharing": "Sharing",
        "Share track": "Share track",
        "Creat": "Creators:",
        "Add to queue": "Add to queue",
        "Add to playlist": "Add to playlist",
        "Share": "Share",
        //Add track to playlist modal
        "Add track to playlist": "Add track to playlist",
        "No Result": "No Result",
        "Search playlist": "Search playlist",
        //Album result(filter)
        "Albums All": "Albums All",
        "Albums not found": "Albums not found",
        //Creator result(filter)
        "Artists All": "Artists All",
        "Artists not found": "Artists not found",
        //Playlist result(filter)
        "Playlist All": "Playlist All",
        "Playlist not found": "Playlist not found",
        //Profiles result(filter)
        "Profiles All": "Profiles All",
        "Profiles not found": "Profiles not found",
        //Track result(filter)
        "Tracks All": "Tracks All",
        //Genre
        "Genre not found": "Genre not found",
        "You can also search your favorite playlists": "You can also search your favorite playlists",
        "Go to search": "Go to search",
        //Genre details(playlist)
        "No playlists found in genre": "No playlists found in genre",
        "Search playlists": "Search playlists",
        //Listening playlist
        "Share playlist": "Share playlist",
        "views for all time": "views for all time",
        "songs • realised": "songs • realised",
        //share modal
        "Link copied!": "Link copied!",
        "Share link": "Share link",
        "Copied": "Copied",
        "Copy": "Copy",
        //Listening album
        "Share album": "Share album",
        //Main
        "The best of week": "The best of week",
        "Weekly top albums": "Weekly top albums",
        "Weekly top tracks": "Weekly top tracks",
        "Weekly top artist": "Weekly top artist",
        "Recent played": "Recent played",
        "Weekly artists & creators": "Weekly artists & creators",
        "Weekly creators not found": "Weekly creators not found",
        "You can jump to main page": "You can jump to main page",
        "Jump": "Jump",
        "Weekly albums": "Weekly albums",
        "Weekly albums not found": "Weekly albums not found",
        //Queue
        "In queue": "In queue",
        "Remove with queue": "Remove with queue",
        "Clear all queue": "Clear all queue",
        "Queue is empty": "Queue is empty",
        //Not found
        "Result not found": "Result not found",
        //Upload single
        "Uploading": "Uploading",
        "Infromation": "Infromation",
        "Overview": "Overview",
        "Upload Single": "Upload Single",
        "Choose file to upload": "Choose file to upload",
        "Drag & drop your single": "Drag & drop your single",
        "Uploading is complete": "Uploading is complete",
        "Next": "Next",
        "Preview": "Preview",
        "Go to main": "Go to main",
        "Title": "Title",
        "Publish": "Publish",
        //Upload album & more songs
        "Upload Album": "Upload Album",
        "Drag & drop mp3 files": "Drag & drop mp3 files",
        "Upload more": "Upload more",
        "Clear All": "Clear All",
        "Description": "Description",
        "Adding creators": "Adding creators",
        "Creators list": "Creators list",
        "songs": "songs",
        //Upload intro
        "Upload content": "Upload content",
        "Upload album, more song": "Upload album, more song",
        "Upload single, 1 song": "Upload single, 1 song",
        //Add creators to album modal
        "Add creators to album": "Add creators to album",
        "Search artists": "Search artists",
        //delete creators with album modal
        "Invite List": "Invite List",
        //Profile
        "Change image": "Change image",
        "Views for all time": "Views for all time",
        "My singles": "My singles",
        "My Playlists": "My Playlists",
        "My albums": "My albums",
        "Singles not found": "Singles not found",
        "Upload you first single song": "Upload you first single song",
        "Create you first playlist song": "Create you first playlist song",
        "Upload you first": "Upload you first",
        //Rename bio modal
        "Rename": "Rename",
        "You want to rename pib?": "You want to rename pib?",
        "Enter new surname": "Enter new surname",
        "Field 'Name' 'Surname' is empty": "Field 'Name' 'Surname' is empty",
        "Field 'Name' is empty": "Field 'Name' is empty",
        "Field 'Surname' is empty": "Field 'Surname' is empty",
        "Field 'Name' 'Surname' is don't renamed": "Field 'Name' 'Surname' is don't renamed",
        //Overview profile
        "Share account": "Share account",
        "Singles": "Singles",
        "Playlist2": "Playlists",
        "Album2": "Albums",
        "Unsubscribe": "Unsubscribe",
        "Subscribe": "Subscribe",
        //Account settings side bar
        "Personal data": "Personal data",
        "Verify account": "Verify account",
        "Verify email": "Verify email",
        "Send appelation": "Send appelation",
        "Notification": "Notification",
        "Delete account": "Delete account",
        //Fixed modal
        "Email don't confirmed": "Email don't confirmed",
        "Creative Studio": "Creative Studio",
        "Account Manage": "Account Manage",
        "New Playlist": "New Playlist",
        "Log out": "Log out",
        //Personal data
        "Change data account": "Change data account",
        "Change other data": "Change other data",
        "Emojie": "Emojie",
        "Name": "Name",
        "Surname": "Surname",
        "Nickname": "Nickname",
        "Save changes": "Save changes",
        "Day": "Day",
        "Month": "Month",
        "Years": "Years",
        "Phone": "Phone",
        "Gender": "Gender",
        "Country": "Country",
        "Male": "Male",
        "Female": "Female",
        "Other": "Other",
        "Ukraine": "Ukraine",
        "USA": "USA",
        "Invalid phone": "Invalid phone",
        "Enter phone number": "Enter phone number",
        "Change email": "Change email",
        "Email": "Email",
        "Change password": "Change password",
        "Old password": "Old password",
        "New password": "New password",
        "Confirm new password": "Confirm new password",
        //Verify account
        "Verify your account": "Verify your account",
        "Verify": "Verify",
        "Client profile": "Client profile",
        "Verified profile": "Verified profile",
        "Your profile is currently registered as verified account": "Your profile is currently registered as verified account",
        "Your profile is currently registered as client account": "Your profile is currently registered as client account",
        "Requirements": "Requirements",
        "Filling profile": "Filling profile",
        "Visiting": "Visiting",
        "You need to verify email": "You need to verify email",
        "You don't have to be blocked account": "You don't have to be blocked account",
        "You must have a phone number": "You must have a phone number",
        "You must have completed the entire profile": "You must have completed the entire profile",
        "You must use the service for more than 2 months": "You must use the service for more than 2 months",
        //Verify profile
        "Verify Email": "Verify Email",
        "We will send a code to your mail for verification": "We will send a code to your mail for verification",
        "Email Verify": "Email Verify",
        "Send verify code": "Send verify code",
        "Please enter the 4 digit code sent to": "Please enter the 4 digit code sent to",
        //Appelation
        "Your letter has been sent": "Your letter has been sent",
        "the administration will consider it within 3 working days": "the administration will consider it within 3 working days",
        "Appelations": "Appelations",
        "If you have a problem with your account, you can file an appeal": "If you have a problem with your account, you can file an appeal",
        "and the administration will review it within 3 business days.": "and the administration will review it within 3 business days.",
        "Message": "Message",
        //Notification
        "You do not have a verified account": "You do not have a verified account",
        "Account actions": "Account actions",
        "Invites": "Invites",
        "Status": "Status",
        "Verify now": "Verify now",
        "Logs in account": "Logs in account",
        //Delete account
        "Delete Profile": "Delete Profile",
        "Your profile will be deleted and you will be able to restore it within 30 days": 'Your profile will be deleted and you will be able to restore it within 30 days',
        "Delete profile": "Delete profile",
        "Password": "Password",
        "Delete": "Delete",
        //Lay startup
        "TEMPORALITY USING SOUNDWAVE": "TEMPORALITY USING SOUNDWAVE",
        "Sign up to listen to playlists, albums and songs for free": "Sign up to listen to playlists, albums and songs for free",
        "Register & Login - Free": "Register & Login - Free",
        //Login
        "Login": "Login",
        "Remember me": "Remember me",
        "Forgot password": "Forgot password",
        "Don't have an account": "Don't have an account",
        "Sign in with google": "Sign in with google",
        "Log in": "Log in",
        //Forgot password
        "Forgot password?": "Forgot password?",
        "Enter your email address and we’ll send you a link to reset your password": "Enter your email address and we’ll send you a link to reset your password",
        "Send code": "Send code",
        "Check your email": "Check your email",
        "We sent a 4-digit code to": "We sent a 4-digit code to",
        "Confirm password": "Confirm password",
        "Confirm": "Confirm",
        //Register
        "Step 1": "Step 1",
        "Enter email and phone": "Enter email and phone",
        "Step 2": "Step 2",
        "Enter Name and Surname": "Enter Name and Surname",
        "Step 3": "Step 3",
        "Select your country and gender": "Select your country and gender",
        "Select your country": "Select your country",
        "country": "country",
        "Select your gender": "Select your gender",
        "gender": "gender",
        "Step 4": "Step 4",
        "Enter your nickname and birthday": "Enter your nickname and birthday",
        "Username": "Username",
        "Birthday": "Birthday",
        "Step 5": "Step 5",
        "Enter your password and confirm password": "Enter your password and confirm password",
        // Modals & sentences
        "Acc_Banned": "This account was banned",
        "Acc_Freeze": "This account was freeze",
        "SeriousReason": "Seriour reason",
        "AnswerQuest": "Answer your question",
        "Ok": "Ok",
        "StatusModal": "Type account",
        "Reason": "Reason",
        "CrLimit": "End Date",
        "PIB": "PIB",
        "Admin": "Admin",
        "You": "You",
        "Sender": "Sender",
        "Receiver": "Receiver",
        "YHA": "You have a",
        "SDT": "status due to",
        "Yourmess": "Your message",
        //
        "Enter birthday date": "Enter birthday date",
      }
    },
    Ua: {
      translation: {
        // GLOBAL
        // Main SideBar
        "Home": "Головна",
        "Search": "Пошук",
        "Genres": "Жанри",
        "History": "Історія",
        "NewPl": "Нов. плейліст",
        "SaveLib": "Медіа тека",
        //Settings page
        "Settings": "Налаштування",
        "Language": "Мова",
        "Choose language": "Виберіть мову",
        "Theme": "Тема",
        "Choose theme": "Виберіть тему",
        "Storage & Cookies": "Сховище та Файли",
        "Active light": "Світла тема",
        "Active dark": "Темна тема",
        "ClearTitle": "Очистіть усі дані в сховищі та файли cookies",
        "Clear": "Очистити",
        "Cookie & Storage Rules": "Правила файлів cookie & Сховище",
        "• OAuth2 Authorizate": "• Google Авторизація",
        "OAuth2 Authorizate 1": "Коли ви авторизуєтесь за допомогою Google, ваш сеанс авторизації буде створено у файлі cookie",
        "OAuth2 Authorizate 2": "!При авторизації ваші дані залишаються повністю конфіденційними!",
        "OAuth2 Authorizate 3": "Реєстрація за допомогою Google дуже проста, ваші дані автоматично підлаштовуються під ваш новий профіль",
        "OAuth2 Authorizate 4": "Якщо ви видалите свій сеанс, вам доведеться знову увійти у свій профіль",
        "• Queue & History": "• Черга & Історія",
        "Queue & History 1": "Історія прослуховування пісень і черга записуються в локальне сховище",
        "Queue & History 2": "!Дані прослуховування та черги залишаються повністю конфіденційними!",
        "Queue & History 3": "Якщо ви очистите локальне сховище, ваші дані прослуховування та черги будуть очищені автоматично",
        "• Language": "• Мова",
        "Language 1": "Мова інтерфейсу записується в локальне сховище",
        "Language 2": "Якщо ви очистите локальне сховище, дані про вибрану мову буде очищено автоматично",
        "• Theme": "• Тема",
        "Theme 1": "Тема інтерфейсу записується в локальне сховище",
        "Theme 2": "Якщо ви очистите локальне сховище, дані вибраної теми буде очищено автоматично",
        "• Save Volume": "• Рівень Гучності",
        "Save Volume 1": "Якщо ви зміните звук, він залишиться таким, яким ви його залишили при подальшому використанні",
        "Save Volume 2": "Якщо ви очистите локальне сховище, рівень гучності буде встановлено за замовчуванням",
        //My media library
        "Your saves library": "Ваша бібліотека збережень",
        "Songs": "пісні",
        "Albums": "альбоми",
        "Playlists": "плейлисти",
        "Creators": "артисти",
        "Save you first single song": "Збережіть вашу першу пісню",
        "You can also login your account": "Для цього увійдіть у свій обліковий запис",
        "Save you first playlist": "Збережіть ваш перший плейлист",
        "Save you first artist": "Підпишіться на вашого першого артиста",
        "Save you first album": "Збережіть ваш перший альбом",
        //Creative studio
        "Playl": "Плейлисти",
        "Single": "Пісні",
        "Create new Playlist": "Створити новий плейлист",
        "Create you first playlist": "Створіть ваш перший плейлист",
        "You can also upload a new single or album": "Ви також можете завантажити новий сингл або альбом",
        "Upload": "Завантажити",
        "Manage my single": "Керуйте своїми піснями",
        "Uplaod you first single": "Завантажте вашу першу пісню",
        "You can also upload a new album or create new playlist": "Ви також можете завантажити новий альбом або створити новий плейлист",
        "Upload you first single": "Завантажте вашу першу пісню",
        "Manage my albums": "Керуйте своїми альбомами",
        "Upload you first albums": "Завантажте ваш перший альбом",
        "You can also upload a new single or create new playlist": "Ви також можете завантажити новий сингл або створити новий плейлист",
        "Upload you first album": "Завантажте ваш перший альбом",
        //Create playlist modal 
        "Create playlist": "Створення плейлиста",
        "Enter name": "Введіть ім'я",
        "Chose access type": "Виберіть тип приватності",
        "Public": "Публічний",
        "Private": "Приватний",
        "Create": "Створити",
        //Change playlist modal
        "Change": "Редагування",
        "Enter new name": "Введіть нове ім'я",
        "Chose new access type": "Виберіть новий тип приватності",
        "Save": "Зберегти",
        //Playlist overview
        "Playlist": "Плейлист",
        "Add something to your playlist": "Додайте щось у свій плейлист",
        "Tracks not found": "Пісень не знайдено",
        "Found by": "Знайдено по запросу",
        "See all": "Показати всі",
        "Date": "Дата",
        "Type": "Тип",
        "Listening": "Прослуховування",
        //Change album modal
        "Change data": "Зміна даних",
        "Enter new description": "Введіть новий опис",
        "Background image": "Фонове зображення",
        //History
        "Listening history": "Історія прослуховувань",
        "Clear all history": "Очистити всю історію",
        "History is empty": "Історія пуста",
        "You can also listening your favorite songs using search": "Ви також можете слухати улюблені пісні за допомогою пошуку",
        "Search songs": "Пошук пісень",
        "Remove": "Видалити",
        //Sound history item
        "Realised": "Опублікований",
        "realised": "Опублікований",
        //Search
        "All result": "Всі результати",
        "Album": "Альбоми",
        "Playlis": "Плейлисти",
        "Tracks": "Пісні",
        "Artists": "Виконаці",
        "Profiles": "Профілі",
        "Best result": "Найкращий результат",
        "Song": "Пісні",
        "No tracks": "Немає пісень",
        //Sound item
        "Sharing": "Поділитися",
        "Share track": "Піділитись піснею",
        "Creat": "Виконавець:",
        "Add to queue": "Додати в чергу",
        "Add to playlist": "Додати до плейлиста",
        "Share": "Поширити",
        //Add track to playlist modal
        "Add track to playlist": "Додати пісню до плейлиста",
        "No Result": "Немає результатів",
        "Search playlist": "Пошук плейлиста",
        //Album result(filter)
        "Albums All": "Усі альбоми",
        "Albums not found": "Альбомів не знайдено",
        //Creator result(filter)
        "Artists All": "Усі виконавці",
        "Artists not found": "Викновців не знайдено",
        //Playlist result(filter)
        "Playlist All": "Усі плейлисти",
        "Playlist not found": "Плейлистів не знайдено",
        //Profiles result(filter)
        "Profiles All": "Усі профілі",
        "Profiles not found": "Профілі не знайдено",
        //Track result(filter)
        "Tracks All": "Усі пісні",
        //Genre
        "Genre not found": "Жанрів не знайдено",
        "You can also search your favorite playlists": "Ви також можете шукати свої улюблені плейлисти",
        "Go to search": "Перейти до пошуку",
        //Genre details(playlist)
        "No playlists found in genre": "Плейлистів у цьому жанрі не знайдено",
        "Search playlists": "Пошук плейлистів",
        //Listening playlist
        "Share playlist": "Поширити плейлист",
        "views for all time": "переглядів за весь час",
        "songs • realised": "пісень • опубліковано",
        //share modal
        "Link copied!": "Посилання скопійовано!",
        "Share link": "Поділитись посиланям",
        "Copied": "Скопійовано",
        "Copy": "Скопіювати",
        //Listening album
        "Share album": "Поширити альбом",
        //Main
        "The best of week": "Найкраще за тиждень",
        "Weekly top albums": "Топ альбомів за тиждень",
        "Weekly top tracks": "Топ треків тижня",
        "Weekly top artist": "Топ артисти тижня",
        "Recent played": "Недавні прослуховуання",
        "Weekly artists & creators": "Щотижневі виконавці та профілі",
        "Weekly creators not found": "Щотижневих виконавців не знайдено",
        "You can jump to main page": "Ви можете перейти до головної сторінки",
        "Jump": "Перейти",
        "Weekly albums": "Щотижневі альбоми",
        "Weekly albums not found": "Щотижневих альбомів не знайдено",
        //Queue
        "In queue": "В черзі",
        "Remove with queue": "Видалити з черги",
        "Clear all queue": "Очистити всю чергу",
        "Queue is empty": "Черга пуста",
        //Not found
        "Result not found": "Результатів не знайдено",
        //Upload single
        "Uploading": "Завантаження",
        "Infromation": "Інформація",
        "Overview": "Перегляд",
        "Upload Single": "Завантажити сінгл",
        "Choose file to upload": "Виберіть файл для завантаження",
        "Drag & drop your single": "Перетягніть або виберіть свій сингл",
        "Uploading is complete": "Завантаження успішне",
        "Next": "Далі",
        "Preview": "Перегляд",
        "Go to main": "Перейти на головну сторінку",
        "Title": "Назва",
        "Publish": "Опублікувати",
        //Upload album & more songs
        "Upload Album": "Завантажити альбом",
        "Drag & drop mp3 files": "Перетягніть або виберіть мп3 файли",
        "Upload more": "Завантажити більше",
        "Clear All": "Очистити всі",
        "Description": "Опис",
        "Adding creators": "Додати виконавця",
        "Creators list": "Список виконавців",
        "songs": "пісні",
        //Upload intro
        "Upload content": "Завантажити контент",
        "Upload album, more song": "Завантажити альбом, багато пісень",
        "Upload single, 1 song": "Завантажити сінгл, 1 пісню",
        //Add creators to album modal
        "Add creators to album": "Додати виконавця до альбома",
        "Search artists": "Пошук виконавця",
        //delete creators with album modal
        "Invite List": "Список запрошень",
        "Creative Studio": "Творча студія",
        "Account Manage": "Керування обліковим записом",
        "New Playlist": "Новий плейлист",
        "Log out": "Вийти",
        //Profile
        "Change image": "Змінити зображення",
        "Views for all time": "Переглядів за весь час",
        "My singles": "Мої пісні",
        "My Playlists": "Мої плейлисти",
        "My albums": "Мої альбоми",
        "Singles not found": "Пісень не знайдено",
        "Upload you first single song": "Завантажте свою першу пісню",
        "Create you first playlist song": "Створіть свій перший плейлист",
        "Upload you first": "Завантажте свій перший альбом",
        //Rename bio modal
        "Rename": "Перейменувати",
        "You want to rename pib?": "Ви хочете змінити персональні дані?",
        "Enter new surname": "Введіть нове призвіще",
        "Field 'Name' 'Surname' is empty": "Поле 'Ім'я' та 'Призвіще' пусті",
        "Field 'Name' is empty": "Поле 'Призвіще' пусте",
        "Field 'Surname' is empty": "Поле 'Призвіще' пусте",
        "Field 'Name' 'Surname' is don't renamed": "Поле 'Ім'я' та 'Призвіще' не змінені",
        //Overview profile
        "Share account": "Поділитись профілем",
        "Singles": "Пісні",
        "Playlist2": "Плейлисти",
        "Album2": "Альбоми",
        "Unsubscribe": "Відписатись",
        "Subscribe": "Підписатись",
        //Account settings side bar
        "Personal data": "Персональні дані",
        "Verify account": "Підтвердити профіль",
        "Verify email": "Підтвердити пошту",
        "Send appelation": "Надіслати апеляцію",
        "Notification": "Сповіщення",
        "Delete account": "Видалити профіль",
        //Fixed modal
        "Email don't confirmed": "Електронна адреса не підтверджена",
        //Personal data
        "Change data account": "Змінити дані профілю",
        "Change other data": "Змінити інші дані",
        "Emojie": "Статус",
        "Name": "Ім'я",
        "Surname": "Призвіще",
        "Nickname": "Псевдонім",
        "Save changes": "Зберегти зміни",
        "Day": "День",
        "Month": "Місяць",
        "Years": "Рік",
        "Phone": "Телефон",
        "Gender": "Стать",
        "Country": "Країна",
        "Male": "Чоловік",
        "Female": "Жінка",
        "Other": "Інше",
        "Ukraine": "Україна",
        "USA": "США",
        "Invalid phone": "Некоректний телефон",
        "Enter phone number": "Введіть номер телефону",
        "Change email": "Змінити пошту",
        "Email": "Пошта",
        "Change password": "Змінити пароль",
        "Old password": "Старий пароль",
        "New password": "Новий пароль",
        "Confirm new password": "Підтвердити новий пароль",
        "Verify your account": "Підтвердіть ваш аккаунт",
        "Verify": "Підтвердити",
        "Client profile": "Профіль клієнта",
        "Verified profile": "Перевірений профіль",
        "Your profile is currently registered as verified account": "Зараз ваш профіль зареєстровано як підтверджений обліковий запис",
        "Your profile is currently registered as client account": "Зараз ваш профіль зареєстровано як обліковий запис клієнта",
        "Requirements": "Вимоги",
        "Filling profile": "Профіль наповнення",
        "Visiting": "Відвідування",
        "You need to verify email": "Вам потрібно підтвердити електронну адресу",
        "You don't have to be blocked account": "Ваш профіль немає бути заблокованим",
        "You must have a phone number": "Ви повинні мати номер телефону",
        "You must have completed the entire profile": "Ви повинні заповнити весь профіль",
        "You must use the service for more than 2 months": "Користуватися сайтом більше 2 місяців",
        //Verify profile
        "Verify Email": "Підтвердити електронну адресу",
        "We will send a code to your mail for verification": "Ми надішлемо код на вашу пошту для перевірки",
        "Email Verify": "Підтвердити адресу електронної пошти",
        "Send verify code": "Надіслати",
        "Please enter the 4 digit code sent to": "Будь ласка, введіть 4-значний код, надісланий на адресу",
        //Appelation
        "Your letter has been sent": "Ваш лист відправлено",
        "the administration will consider it within 3 working days": "адміністрація розгляне його протягом 3 робочих днів",
        "Appelations": "Апеляції",
        "If you have a problem with your account, you can file an appeal": "Якщо у вас проблеми з обліковим записом, ви можете подати апеляцію",
        "and the administration will review it within 3 business days.": "і адміністрація розгляне його протягом 3 робочих днів.",
        "Message": "Повідомлення",
        //Notification
        "You do not have a verified account": "У вас немає підтвердженого облікового запису",
        "Account actions": "Дії облікового запису",
        "Invites": "Запрошеня",
        "Status": "Статус",
        "Verify now": "Підтвердити зараз",
        "Logs in account": "Логування облікового запису",
        //Delete account
        "Delete Profile": "Видалити профіль",
        "Your profile will be deleted and you will be able to restore it within 30 days": 'Ваш профіль буде видалено, і ви зможете відновити його протягом 30 днів',
        "Password": "Пароль",
        "Delete": "Видалити",
        //Lay startup
        "TEMPORALITY USING SOUNDWAVE": "ТИМЧАСОВЕ ВИКОРИСТАННЯ SOUNDWAVE",
        "Sign up to listen to playlists, albums and songs for free": "Зареєструйтеся, щоб безкоштовно слухати плейлисти, альбоми та пісні",
        "Register & Login - Free": "Реєстрація & Вхід - Безкоштовна",
        //Login
        "Login": "Вхід",
        "Remember me": "Запам'ятай мене",
        "Forgot password": "Забули пароль",
        "Don't have an account": "Немає облікового запису",
        "Sign in with google": "Увійдіть через Google",
        "Log in": "Авторизація",
        //Forgot password
        "Forgot password?": "Забули пароль?",
        "Enter your email address and we’ll send you a link to reset your password": "Введіть свою електронну адресу, і ми надішлемо вам посилання для скидання пароля",
        "Send code": "Надіслати код",
        "Check your email": "Перевірити свою електронну пошту",
        "We sent a 4-digit code to": "Ми надіслали 4-значний код на адресу",
        "Confirm password": "Підтвердьте пароль",
        "Confirm": "Підтвердити",
        //Register
        "Step 1": "Крок 1",
        "Enter email and phone": "Введіть пошту і телефон",
        "Step 2": "Крок 2",
        "Enter Name and Surname": "Введіть ім'я та прізвище",
        "Step 3": "Крок 3",
        "Select your country and gender": "Виберіть свою країну та стать",
        "Select your country": "Виберіть свою країну",
        "country": "країна",
        "Select your gender": "Виберіть свою стать",
        "gender": "cтать",
        "Step 4": "Крок 4",
        "Enter your nickname and birthday": "Введіть свій псевдонім та дату народження",
        "Username": "Псевдонім",
        "Birthday": "Дата народження",
        "Step 5": "Крок 5",
        "Enter your password and confirm password": "Введіть свій пароль і підтвердьте пароль",
        // Modals & sentences
        "Acc_Banned": "Цей аккаунт був заблокований",
        "Acc_Freeze": "Цей аккаунт був заморожаний",
        "SeriousReason": "Причина",
        "AnswerQuest": "Відповідь на запитання",
        "Ok": "Добре",
        "StatusModal": "Тип аккаунту",
        "Reason": "Причина",
        "CrLimit": "Кінцева дата",
        "PIB": "ПІБ",
        "Admin": "Адміністратор",
        "You": "Ти",
        "Sender": "Приймач",
        "Receiver": "Відправник",
        "YHA": "У вас",
        "SDT": "статус",
        "Yourmess": "Ваше повідомлення",
        //
        "Enter birthday date": "Введіть дату народення",
      }
    },
  },
  keySeparator: false,
  interpolation: { escapeValue: false }
});

export default i18n;