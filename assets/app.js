/* ============================================================
   ДОМ-КК · общий скрипт для всех страниц
   Данные + инъекция общих виджетов + поведение (с защитой по страницам)
   ============================================================ */
(function(){
'use strict';

/* ---------- Контакты / интеграции ---------- */
var PHONE_HUMAN='+7 900 272-10-01';
var PHONE_TEL='+79002721001';
var WA_LINK='https://wa.me/79002721001?text=Здравствуйте,%20хочу%20рассчитать%20смету%20на%20дом';
var BOT_TOKEN='8550556751:AAF9LssjvB-5NkCu4yeOO2-eN2zuqqCKP1o';
var CHAT_ID='523060537';
var MAIL='dom-kkk@mail.ru';

/* ---------- Данные проектов ---------- */
var PROJ_INFO={"«Тольятти»": {"lead": "Одноэтажный кирпичный дом 123 м² с террасой и продуманной планировкой на 4 комнаты и 2 санузла. Удобен в эксплуатации, рассчитан на комфортную жизнь большой семьи.", "from": ["Кирпича", "Газоблока"], "params": ["Общая площадь застройки без террасы — 123,5 м²", "Общая площадь застройки с террасой (доп. услуга) — 141,5 м²", "Общая площадь дома — 100,1 м²", "Жилая площадь — 73,4 м²"], "box": ["Ленточный фундамент 80×40 см", "Монолитный цоколь — 30 см высотой, 40 см шириной", "Плита этажа — монолитная в одну сетку из арматуры д10, толщиной 15 см", "Внешние стены: керамический кирпич и газоблок 250 мм", "Несущие стены из блока 250 мм, остальные 150 мм", "Монолитные сердечники и армопояс", "Монолитные перемычки над окнами и дверьми", "Кровля из металлочерепицы", "Утепление кровли в 3 слоя минватой толщиной 150 мм", "Подшивной элемент стандартный 50 см (можно уменьшить до 30/40)", "Вытяжные каналы из кровли"], "smeta": [["Строительство коробки дома", "4 581 336 ₽"], ["Доп. терраса", "363 059 ₽"], ["Монтаж септиков (бетонные кольца, 8,5 м³)", "142 342 ₽"], ["Оконные проёмы и входная дверь", "288 740 ₽"], ["Электромонтажные работы", "340 000 ₽"], ["Сантехнические работы / отопление", "464 542 ₽"], ["Предчистовая отделка", "453 730 ₽"], ["Бетонные работы 100 м² (отмостка, парковка, дорожки)", "228 395 ₽"]], "total": "6 862 145 ₽", "incl": ["Фундамент и цокольное перекрытие", "Устройство закладных каналов под ввод и вывод инженерных коммуникаций", "Наружные стены", "Внутренние стены (перегородки)", "Межэтажное перекрытие", "Крыша", "Дверные и арочные проёмы в соответствии с проектом", "Оконные проёмы в соответствии с проектом"]}, "«Семейный»": {"lead": "Одноэтажный дом 110 м² с террасой для семьи, которая хочет жить в собственном доме, не переплачивая за лишние метры. Продуманная планировка и эксклюзивный фасад, качество — на то, чтобы передать дом по наследству.", "from": ["Кирпича", "Газоблока"], "params": ["Общая площадь застройки без террасы — 110,0 м²", "Общая площадь застройки с террасой — 126,5 м²", "Общая площадь дома — 89 м²", "Жилая площадь — 61,7 м²"], "box": ["Ленточный фундамент 80×40 см", "Монолитный цоколь — 40 см высотой, 40 см шириной", "Плита этажа — монолитная в одну сетку из арматуры д10, толщиной 15 см", "Внешние стены: керамический кирпич и газоблок 250 мм", "Несущие стены из блока 250 мм, остальные 150 мм", "Монолитный армопояс и сердечники", "Монолитные перемычки над окнами и дверьми", "Кровля из металлочерепицы толщиной 0,5 мм", "Утепление кровли в 3 слоя минватой толщиной 150 мм", "Подшивной элемент стандартный 50 см (можно уменьшить до 30/40)", "Вытяжные каналы из кровли"], "smeta": [["Строительство коробки дома, включая террасу", "5 189 532 ₽"], ["Монтаж септика (бетонные кольца, 11,3 м³)", "150 400 ₽"], ["Оконные проёмы и входная дверь", "408 312 ₽"], ["Электромонтажные работы", "288 932 ₽"], ["Сантехнические работы / отопление", "613 997 ₽"], ["Предчистовая отделка", "553 135 ₽"]], "total": "7 204 311 ₽", "incl": ["Фундамент и цокольное перекрытие", "Устройство закладных каналов под ввод и вывод инженерных коммуникаций", "Наружные стены", "Внутренние стены (перегородки)", "Межэтажное перекрытие", "Крыша", "Дверные и арочные проёмы в соответствии с проектом", "Оконные проёмы в соответствии с проектом"]}, "«Симфония»": {"lead": "Новинка. Одноэтажный дом 109,8 м² с террасой, 4 комнаты и 2 санузла. Газоблок с облицовочным кирпичом и воздушной прослойкой — тёплый и долговечный дом с выразительным фасадом.", "from": ["Кирпича", "Газоблока"], "params": ["Общая площадь застройки с террасой — 121,7 м²", "Жилая площадь — 109,8 м²", "Комнат — 4, санузлов — 2"], "box": ["Свайно-ростверковый фундамент", "Монолитный цоколь — 450 мм высотой, 400 мм шириной", "Плита этажа — монолитная в одну сетку из арматуры д10, толщиной 15 см", "Внешние стены: газоблок 250 мм + облицовочный кирпич и воздушная прослойка", "Несущие стены из блока 250 мм, остальные 150 мм", "Монолитный армопояс и сердечники", "Монолитные перемычки над окнами и дверьми", "Кровля из металлочерепицы", "Утепление кровли в 3 слоя минватой толщиной 150 мм", "Подшивной элемент стандартный 50 см (можно уменьшить до 30/40)", "Вытяжные каналы из кровли"], "smeta": [["Строительство коробки дома", "6 450 000 ₽"], ["Монтаж септиков (бетонные кольца, 8,5 м³)", "192 000 ₽"], ["Оконные проёмы и входная дверь", "680 000 ₽"], ["Бетонные работы (отмостка, парковка, дорожки)", "229 000 ₽"]], "total": "7 551 000 ₽", "incl": ["Фундамент и цокольное перекрытие", "Устройство закладных каналов под ввод и вывод инженерных коммуникаций", "Наружные стены", "Внутренние стены (перегородки)", "Межэтажное перекрытие", "Крыша", "Дверные и арочные проёмы в соответствии с проектом", "Оконные проёмы в соответствии с проектом"]}, "«Ильский»": {"lead": "Просторный кирпичный дом 181 м² на 7 комнат и 2 санузла — для большой семьи. Подробное описание и смета — по запросу, звоните или оставьте заявку.", "from": ["Кирпича", "Газоблока"], "params": ["Общая площадь — 181 м²", "Комнат — 7, санузлов — 2", "Класс — Комфорт"], "box": [], "smeta": [["Коробка дома", "6 650 000 ₽"]], "total": "9 100 000 ₽", "incl": ["Фундамент и цокольное перекрытие", "Наружные и внутренние стены", "Межэтажное перекрытие", "Крыша", "Дверные и оконные проёмы в соответствии с проектом"]}};

var PROJECTS=[
{n:'«Семейный»',rooms:4,wc:1,a:'110 м²',box:'5 189 532 ₽',full:'7 204 311 ₽',p:'5,2 млн ₽',cls:'Комфорт',mat:'Газобетон',city:'Краснодар',
 photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%A1%D0%B5%D0%BC%D0%B5%D0%B8%CC%86%D0%BD%D1%8B%D0%B8%CC%86%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%A1%D0%B5%D0%BC%D0%B5%D0%B8%CC%86%D0%BD%D1%8B%D0%B8%CC%86%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%A1%D0%B5%D0%BC%D0%B5%D0%B8%CC%86%D0%BD%D1%8B%D0%B8%CC%86%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%A1%D0%B5%D0%BC%D0%B5%D0%B8%CC%86%D0%BD%D1%8B%D0%B8%CC%86%204.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%A1%D0%B5%D0%BC%D0%B5%D0%B8%CC%86%D0%BD%D1%8B%D0%B8%CC%86%205.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%A1%D0%B5%D0%BC%D0%B5%D0%B8%CC%86%D0%BD%D1%8B%D0%B8%CC%86%206.JPG']},
{n:'«Симфония»',rooms:4,wc:2,a:'109.8 м²',box:'6 450 000 ₽',full:'7 551 000 ₽',p:'6,5 млн ₽',cls:'Комфорт',mat:'Кирпич',city:'Краснодар',
 photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%D0%B8%D0%BC%D1%84%D0%BE%D0%BD%D0%B8%D1%8F.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%D0%B8%D0%BC%D1%84%D0%BE%D0%BD%D0%B8%D1%8F%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%D0%B8%D0%BC%D1%84%D0%BE%D0%BD%D0%B8%D1%8F%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%D0%B8%D0%BC%D1%84%D0%BE%D0%BD%D0%B8%D1%8F%203.JPG']},
{n:'«Тольятти»',rooms:4,wc:2,a:'123 м²',box:'4 581 336 ₽',full:'6 862 145 ₽',p:'4,6 млн ₽',cls:'Комфорт',mat:'Кирпич',city:'Краснодар',
 photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D0%A2%D0%BE%D0%BB%D1%8C%D1%8F%D1%82%D0%B8.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%82%D0%BE%D0%BB%D1%8C%D1%8F%D1%82%D0%B8%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%82%D0%BE%D0%BB%D1%8C%D1%8F%D1%82%D0%B8%202.JPG']},
{n:'«Ильский»',rooms:7,wc:2,a:'181 м²',box:'6 650 000 ₽',full:'9 100 000 ₽',p:'6,7 млн ₽',cls:'Комфорт',mat:'Кирпич',city:'Краснодар',
 photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%98%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B8%CC%86%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%98%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B8%CC%86%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%98%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B8%CC%86%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%98%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B8%CC%86%204.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Projekt/main/%D0%98%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B8%CC%86%20.JPG']}
];

var OBJECTS=[
  {addr:'Геленджик', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%93%D0%B5%D0%BB%D0%B5%D0%BD%D0%B4%D0%B6%D0%B8%D0%BA%202.jpg','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%93%D0%B5%D0%BB%D0%B5%D0%BD%D0%B4%D0%B6%D0%B8%D0%BA%201.jpg','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%93%D0%B5%D0%BB%D0%B5%D0%BD%D0%B4%D0%B6%D0%B8%D0%BA%203.jpg','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%93%D0%B5%D0%BB%D0%B5%D0%BD%D0%B4%D0%B6%D0%B8%D0%BA%204.jpg','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%93%D0%B5%D0%BB%D0%B5%D0%BD%D0%B4%D0%B6%D0%B8%D0%BA.jpg']},
  {addr:'Славянск-на-Кубани', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%20%D0%BD%D0%B0%20%D0%9A%D1%83%D0%B1%D0%B0%D0%BD%D0%B8%20.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%20%D0%BD%D0%B0%20%D0%9A%D1%83%D0%B1%D0%B0%D0%BD%D0%B8%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%20%D0%BD%D0%B0%20%D0%9A%D1%83%D0%B1%D0%B0%D0%BD%D0%B8%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%20%D0%BD%D0%B0%20%D0%9A%D1%83%D0%B1%D0%B0%D0%BD%D0%B8%204.JPG']},
  {addr:'Краснодар', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%204.JPG']},
  {addr:'г. Славянск', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%204.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%20.JPG']},
  {addr:'СНТ Маяк', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9C%D0%B0%D1%8F%D0%BA%20.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9C%D0%B0%D1%8F%D0%BA%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9C%D0%B0%D1%8F%D0%BA%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9C%D0%B0%D1%8F%D0%BA%203.JPG']},
  {addr:'ст. Тбилисская', cat:'Строительные работы', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A2%D0%B1%D0%B8%D0%BB%D0%B8%D1%81%D0%BA%D0%B0%D1%8F%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A2%D0%B1%D0%B8%D0%BB%D0%B8%D1%81%D0%BA%D0%B0%D1%8F%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A2%D0%B1%D0%B8%D0%BB%D0%B8%D1%81%D0%BA%D0%B0%D1%8F%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A2%D0%B1%D0%B8%D0%BB%D0%B8%D1%81%D0%BA%D0%B0%D1%8F%204.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A2%D0%B1%D0%B8%D0%BB%D0%B8%D1%81%D0%BA%D0%B0%D1%8F%205.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A2%D0%B1%D0%B8%D0%BB%D0%B8%D1%81%D0%BA%D0%B0%D1%8F%20.JPG']},
  {addr:'СНТ Нептун', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9D%D0%B5%D0%BF%D1%82%D1%83%D0%BD%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9D%D0%B5%D0%BF%D1%82%D1%83%D0%BD%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9D%D0%B5%D0%BF%D1%82%D1%83%D0%BD%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%9D%D0%B5%D0%BF%D1%82%D1%83%D0%BD.JPG']},
  {addr:'СНТ Заря', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%97%D0%B0%D1%80%D1%8F.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%97%D0%B0%D1%80%D1%8F%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%97%D0%B0%D1%80%D1%8F%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%97%D0%B0%D1%80%D1%8F%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%97%D0%B0%D1%80%D1%8F%204.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%A1%D0%9D%D0%A2%20%D0%97%D0%B0%D1%80%D1%8F%205.JPG']},
  {addr:'Новороссийск', cat:'Строительство домов', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9D%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B8%CC%86%D1%81%D0%BA%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9D%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B8%CC%86%D1%81%D0%BA%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9D%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B8%CC%86%D1%81%D0%BA%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9D%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B8%CC%86%D1%81%D0%BA.JPG']},
  {addr:'ст. Павловская', cat:'Строительные работы', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9F%D0%B0%D0%B2%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%201.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9F%D0%B0%D0%B2%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%202.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9F%D0%B0%D0%B2%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F.JPG']},
  {addr:'ул. Поварская', cat:'Строительные работы', photos:['https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9F%D0%BE%D0%B2%D0%B0%D1%80%D1%81%D0%BA%D0%B0%D1%8F%203.JPG','https://raw.githubusercontent.com/alekyanrazmik-glitch/Nashi-Raboti/main/%D0%9F%D0%BE%D0%B2%D0%B0%D1%80%D1%81%D0%BA%D0%B0%D1%8F%204.JPG']}
];

var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var onHome=/proekty\.html/.test(location.pathname)?false:true; // флаг используется в рендере

/* ============================================================
   1) ИНЪЕКЦИЯ ОБЩИХ ВИДЖЕТОВ (попап заявки, sticky, exit, лайтбокс, окно проекта)
   ============================================================ */
function injectWidgets(){
  if($('#lead'))return; // уже есть на странице — не дублируем
  var box=document.createElement('div');
  box.innerHTML=[
  // Попап заявки
  '<section id="lead"><div class="wrap"><div class="lead">',
    '<button class="lead-close" id="leadClose" aria-label="Закрыть">&times;</button>',
    '<div><h2>Получите смету за 15 минут</h2>',
    '<p>Оставьте контакты — инженер свяжется с вами, ответит на вопросы и подготовит расчёт стоимости вашего дома. Бесплатно.</p>',
    '<ul><li><span class="ck">✓</span> Бесплатный выезд на участок</li><li><span class="ck">✓</span> Подбор проекта под бюджет</li><li><span class="ck">✓</span> Оплата по этапам работ</li><li><span class="ck">✓</span> Фиксированная цена в договоре</li></ul></div>',
    '<div class="form"><form id="leadForm"><h3>Заявка на расчёт</h3>',
      '<div class="fld"><input id="lf_name" type="text" name="name" placeholder="Ваше имя" required></div>',
      '<div class="fld"><input id="lf_phone" type="tel" name="phone" placeholder="+7 (___) ___-__-__" required></div>',
      '<div class="fld"><select id="lf_city" name="city"><option value="">Выберите город</option><option>Краснодар</option><option>Новороссийск</option><option>Геленджик</option><option>Сочи</option><option>Анапа</option><option>Славянск-на-Кубани</option><option>Другой город</option></select></div>',
      '<div class="fld"><select id="lf_service" name="service"><option>Дом под ключ</option><option>Газобетонный дом</option><option>Кирпичный дом</option><option>Монолитный дом</option><option>Проектирование</option><option>Расчёт сметы</option></select></div>',
      '<div class="fld"><input id="lf_area" type="text" name="area" placeholder="Примерная площадь, м² (если знаете)"></div>',
      '<label class="lf-agree"><input id="lf_agree" type="checkbox"><span>Согласие на обработку персональных данных</span></label>',
      '<button type="submit" class="btn btn-green btn-lg">Получить смету за 15 минут</button>',
      '<p class="note" id="lf_err"></p></form>',
      '<div class="form-ok" id="formOk"><div class="oi">✓</div><h3>Заявка отправлена!</h3><p>Инженер свяжется с вами в ближайшее время.</p></div>',
    '</div></div></div></section>',
  // Лайтбокс
  '<div class="lb" id="lightbox"><button class="lb-close" id="lbClose">&times;</button><button class="lb-nav lb-prev" id="lbPrev">‹</button><button class="lb-nav lb-next" id="lbNext">›</button><img id="lbImg" src="" alt=""><div class="lb-cap" id="lbCap"></div><div class="lb-thumbs" id="lbThumbs"></div></div>',
  // Окно проекта
  '<div class="pm" id="projModal"><div class="pm-box"><button class="pm-close" id="pmClose" aria-label="Закрыть">&times;</button><div class="pm-inner" id="pmInner"></div></div></div>',
  // Sticky CTA (моб.)
  '<div class="mcta"><a href="tel:'+PHONE_TEL+'" class="mcta-call" onclick="try{ym(109746794,\'reachGoal\',\'mcta_call\')}catch(_){}">📞 Звонок</a>',
    '<a href="'+WA_LINK+'" target="_blank" rel="noopener" class="mcta-wa" onclick="try{ym(109746794,\'reachGoal\',\'mcta_wa\')}catch(_){}">WhatsApp</a>',
    '<a href="#lead" class="mcta-form" onclick="try{ym(109746794,\'reachGoal\',\'mcta_form\')}catch(_){}">Смета за 15 мин</a></div>',
  // Exit-intent
  '<div id="exit" role="dialog" aria-modal="true" aria-labelledby="exitTitle"><div class="exit-box"><button class="exit-close" id="exitClose" aria-label="Закрыть">&times;</button><div class="exit-ico">🎁</div><h2 id="exitTitle">Подождите! <b>Проект дома в подарок</b></h2><p>Оставьте телефон сейчас — подготовим бесплатный проект под ваш бюджет и зафиксируем цену 2026 года в договоре.</p><form class="exit-form" id="exitForm"><input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required><button type="submit">Получить проект бесплатно</button></form><p class="exit-note">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p></div></div>'
  ].join('');
  while(box.firstChild)document.body.appendChild(box.firstChild);
}

/* ============================================================
   2) НАВИГАЦИЯ (бургер) + подсветка активного пункта
   ============================================================ */
function initNav(){
  var burger=$('#burger'),links=$('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open');});
    $$('a',links).forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');});});
  }
  // активный пункт по имени файла
  var page=(location.pathname.split('/').pop()||'index.html');
  $$('.nav-links a').forEach(function(a){
    var href=a.getAttribute('href')||'';
    if(href===page||(page==='index.html'&&(href==='index.html'||href==='/'||href==='./')))a.classList.add('active');
  });
}

/* ============================================================
   3) ПОПАП ЗАЯВКИ
   ============================================================ */
function initLead(){
  var leadPopup=$('#lead');if(!leadPopup)return;
  window.openLead=function(){leadPopup.classList.add('open');document.body.classList.add('lead-open');document.body.style.overflow='hidden';};
  window.closeLead=function(){leadPopup.classList.remove('open');document.body.classList.remove('lead-open');document.body.style.overflow='';};
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href="#lead"]');
    if(a){e.preventDefault();if(document.body.classList.contains('pm-open')&&window.closeProj)window.closeProj();window.openLead();}
  });
  var lc=$('#leadClose');if(lc)lc.addEventListener('click',window.closeLead);
  leadPopup.addEventListener('click',function(e){if(e.target===leadPopup)window.closeLead();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')window.closeLead();});
}

/* ============================================================
   4) ОТПРАВКА ФОРМЫ (Telegram + e-mail) + маска телефона
   ============================================================ */
function phoneMaskFmt(v){
  var d=v.replace(/\D/g,'');
  if(d.charAt(0)==='8')d='7'+d.slice(1);
  if(d.charAt(0)!=='7')d='7'+d;
  d=d.slice(0,11);
  var r='+7';
  if(d.length>1)r+=' ('+d.slice(1,4);
  if(d.length>=4)r+=') '+d.slice(4,7);
  if(d.length>=7)r+='-'+d.slice(7,9);
  if(d.length>=9)r+='-'+d.slice(9,11);
  return r;
}
function sendLead(payload,onDone){
  var L=['🏠 <b>Заявка на расчёт дома (ДОМ-КК)</b>','<b>Имя:</b> '+(payload.name||'—'),'<b>Телефон:</b> '+payload.phone];
  if(payload.city)L.push('<b>Город:</b> '+payload.city);
  if(payload.service)L.push('<b>Услуга:</b> '+payload.service);
  if(payload.area)L.push('<b>Площадь:</b> '+payload.area+' м²');
  if(payload.source)L.push('<b>Источник:</b> '+payload.source);
  L.push('',(location.host?'🌐 '+location.host:'сайт'));
  try{
    fetch('https://formsubmit.co/ajax/'+MAIL,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({_subject:'Заявка с сайта ДОМ-КК',name:payload.name||'—',phone:payload.phone,city:payload.city||'не указан',service:payload.service||'—',area:payload.area||'не указана',_template:'table'})}).catch(function(){});
  }catch(_){}
  fetch('https://api.telegram.org/bot'+BOT_TOKEN+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({chat_id:CHAT_ID,text:L.join('\n'),parse_mode:'HTML',disable_web_page_preview:true})})
    .then(function(){onDone&&onDone();}).catch(function(){onDone&&onDone();});
}
function initLeadForm(){
  var ph=$('#lf_phone');
  if(ph){ph.addEventListener('input',function(){ph.value=phoneMaskFmt(ph.value);});ph.addEventListener('focus',function(){if(!ph.value)ph.value='+7 ';});}
  var form=$('#leadForm');if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var err=$('#lf_err');err.style.color='#d92d2d';err.textContent='';
    var name=$('#lf_name').value.trim(),phone=$('#lf_phone').value.trim(),agree=$('#lf_agree').checked;
    if(!name){err.textContent='Укажите ваше имя';return;}
    if(!phone){err.textContent='Укажите телефон';return;}
    if(!agree){err.textContent='Поставьте согласие на обработку данных';return;}
    var btn=form.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Отправка…';
    sendLead({name:name,phone:phone,city:$('#lf_city').value,service:$('#lf_service').value,area:$('#lf_area').value.trim()},function(){
      form.style.display='none';$('#formOk').style.display='block';
      try{if(typeof ym==='function')ym(109746794,'reachGoal','zayavka_form');}catch(_){}
    });
  });
}

/* ============================================================
   5) БЫСТРЫЙ CALLBACK (необязательная мини-форма #qcbForm на странице)
   ============================================================ */
function initCallback(){
  var f=$('#qcbForm');if(!f)return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var phone=f.querySelector('input[name="phone"]').value.trim();
    if(phone.replace(/\D/g,'').length<10){alert('Введите номер телефона');return;}
    try{if(typeof ym==='function')ym(109746794,'reachGoal','callback_quick');}catch(_){}
    sendLead({name:'Перезвонить',phone:phone,source:'Быстрый callback'});
    f.innerHTML='<div style="color:#fff;font-weight:700;text-align:center;padding:14px">✓ Заявка принята. Перезвоним в течение минуты.</div>';
  });
}

/* ============================================================
   6) EXIT-INTENT
   ============================================================ */
function initExit(){
  var ex=$('#exit');if(!ex)return;
  var shown=false;
  function showExit(){
    if(shown)return;
    if(sessionStorage.getItem('exitShown')==='1')return;
    if(document.body.classList.contains('lead-open'))return;
    shown=true;sessionStorage.setItem('exitShown','1');ex.classList.add('open');
    try{if(typeof ym==='function')ym(109746794,'reachGoal','exit_popup_show');}catch(_){}
  }
  function hideExit(){ex.classList.remove('open');}
  document.addEventListener('mouseleave',function(e){if(e.clientY<=0&&window.innerWidth>768)showExit();});
  setTimeout(showExit,45000);
  $('#exitClose').addEventListener('click',hideExit);
  ex.addEventListener('click',function(e){if(e.target===ex)hideExit();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ex.classList.contains('open'))hideExit();});
  $('#exitForm').addEventListener('submit',function(e){
    e.preventDefault();
    var phone=this.querySelector('input[name="phone"]').value.trim();
    if(phone.replace(/\D/g,'').length<10){alert('Введите номер телефона');return;}
    try{if(typeof ym==='function')ym(109746794,'reachGoal','exit_popup_submit');}catch(_){}
    sendLead({name:'Exit-оффер',phone:phone,source:'Exit-попап'});
    ex.querySelector('.exit-box').innerHTML='<div class="exit-ico">✓</div><h2>Заявка принята!</h2><p>Инженер свяжется с вами в ближайшее время и подберёт проект под ваш бюджет.</p>';
    setTimeout(hideExit,3500);
  });
}

/* ============================================================
   7) HERO-СЛАЙДЕР (если есть #slider)
   ============================================================ */
function initSlider(){
  var slides=$$('#slider .slide');if(!slides.length)return;
  var cur=0;
  function show(i){cur=(i+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('active',k===cur);});}
  $$('.slider-nav button').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();show(cur+ +b.dataset.dir);});});
  setInterval(function(){if(!document.hidden)show(cur+1);},12000);
}

/* ============================================================
   8) РЕНДЕР ПРОЕКТОВ / ОБЪЕКТОВ (если есть контейнер)
   ============================================================ */
function bc(c){return c==='Эконом'?'bg-green':'bg-blue';}
function renderProj(f){
  var grid=$('#projGrid');if(!grid)return;
  var limit=+grid.getAttribute('data-limit')||0; // 0 = все
  var list=PROJECTS.filter(function(p){return !f||f==='Все'||p.cls===f;});
  if(limit)list=list.slice(0,limit);
  grid.innerHTML=list.map(function(p){
    var idx=PROJECTS.indexOf(p);
    return '<div class="proj"><div class="proj-img" data-proj="'+idx+'"><img src="'+p.photos[0]+'" alt="'+p.n+'" onerror="this.style.opacity=0;this.parentNode.style.background=\'#e7e9ee\'"><div class="proj-badges"><span class="badge '+bc(p.cls)+'">'+p.cls+'</span><span class="badge bg-dark">'+p.mat+'</span></div><span class="obj-zoom">📷 '+p.photos.length+' фото</span></div><h3>Проект '+p.n+'</h3><div class="proj-type" style="color:var(--green);font-family:var(--h);font-weight:800;font-size:20px;margin:2px 0 8px">'+p.a+'</div><div class="proj-rooms">Комнат: '+p.rooms+', санузлов: '+p.wc+'</div><div class="proj-est"><div class="pe-row"><span>Коробка дома, включая террасу</span><b>'+p.box+'</b></div><div class="pe-row"><span>Полная стоимость, под ключ</span><b>'+p.full+'</b></div></div><a href="#" class="btn btn-green" style="width:100%" data-proj="'+idx+'" onclick="event.preventDefault()">Подробнее о проекте</a></div>';
  }).join('');
}
function renderObjects(){
  var grid=$('#objGrid');if(!grid)return;
  var limit=+grid.getAttribute('data-limit')||0;
  var list=limit?OBJECTS.slice(0,limit):OBJECTS;
  grid.innerHTML=list.map(function(o,i){return '<div class="obj"><div class="obj-img" data-obj="'+i+'"><img src="'+o.photos[0]+'" alt="'+o.addr+'"><span class="obj-cat">'+o.cat+'</span><span class="obj-zoom">📷 '+o.photos.length+' фото</span></div><div class="obj-body"><h3>Адрес: '+o.addr+'</h3><button class="btn btn-green" data-obj="'+i+'">Смотреть галерею</button></div></div>';}).join('');
}

/* ============================================================
   9) ЛАЙТБОКС + ОКНО ПРОЕКТА
   ============================================================ */
var lb,lbImg,lbCap,lbThumbs,curGallery=[],curPic=0,curTitle='',PROJECTS_CUR=null;
function showPic(){lbImg.src=curGallery[curPic];lbCap.innerHTML=curTitle+'<span>фото '+(curPic+1)+' из '+curGallery.length+'</span>';lbThumbs.innerHTML=curGallery.map(function(p,k){return '<img src="'+p+'" data-pic="'+k+'" class="'+(k===curPic?'active':'')+'">';}).join('');}
function openGallery(photos,title){curGallery=photos;curPic=0;curTitle=title;showPic();lb.classList.add('open');document.body.classList.add('lb-open');document.body.style.overflow='hidden';}
function closeLb(){lb.classList.remove('open');document.body.classList.remove('lb-open');document.body.style.overflow='';}
function lbNav(d){var n=curGallery.length;curPic=(curPic+d+n)%n;showPic();}
function openProj(idx){
  var p=PROJECTS[idx],info=PROJ_INFO[p.n],inner=$('#pmInner');
  if(!info||!inner){openGallery(p.photos,'Проект '+p.n+' · '+p.a);return;}
  var thumbs=p.photos.map(function(src,i){return '<img src="'+src+'" data-pm="'+i+'" class="'+(i===0?'active':'')+'" onerror="this.style.display=\'none\'">';}).join('');
  var spec='<div><b>Площадь:</b> '+p.a+'</div><div><b>Комнат:</b> '+p.rooms+'</div><div><b>Санузлов:</b> '+p.wc+'</div><div><b>Этажность:</b> 1</div><div><b>Материал:</b> '+p.mat+'</div><div><b>Класс:</b> '+p.cls+'</div>';
  var from=(info.from||[]).map(function(x){return '<span>'+x+'</span>';}).join('');
  var params=(info.params||[]).map(function(x){return '<li>'+x+'</li>';}).join('');
  var box=(info.box||[]).map(function(x){return '<li>'+x+'</li>';}).join('');
  var smeta=(info.smeta||[]).map(function(r){return '<div class="sm-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join('');
  var incl=(info.incl||[]).map(function(x){return '<li>'+x+'</li>';}).join('');
  var html='<img class="pm-hero" id="pmHero" src="'+p.photos[0]+'" alt="Проект '+p.n+'" onerror="this.style.background=\'#e7e9ee\'">';
  if(p.photos.length>1)html+='<div class="pm-thumbs">'+thumbs+'</div>';
  html+='<div class="pm-body"><h2>Проект дома '+p.n+'</h2>';
  html+='<div class="pm-price"><div class="pp-row"><span>Стоимость коробки дома, включая террасу</span><b>'+p.box+'</b></div><div class="pp-row"><span>Полная стоимость с доп. услугами</span><b>'+info.total+'</b></div></div>';
  html+='<div class="pm-spec">'+spec+'</div>';
  if(info.lead)html+='<p class="pm-lead">'+info.lead+'</p>';
  if(from)html+='<div class="pm-h">Дом можно построить из:</div><div class="pm-from">'+from+'</div>';
  if(params)html+='<div class="pm-h">Параметры дома</div><ul class="pm-list">'+params+'</ul>';
  if(box)html+='<div class="pm-h">Коробка дома</div><ul class="pm-list">'+box+'</ul>';
  if(smeta)html+='<div class="pm-h">Состав стоимости</div><div class="pm-smeta">'+smeta+'<div class="sm-total"><span>Всего по смете</span><span>'+info.total+'</span></div></div>';
  if(incl)html+='<div class="pm-h">В стоимость входит</div><ul class="pm-list">'+incl+'</ul>';
  html+='<div class="pm-cta"><a href="#lead" class="btn btn-green">Получить смету по этому проекту</a></div>';
  html+='<p class="pm-note">Стоимость указана в базовом варианте за наличный расчёт, носит информационный характер и не является публичной офертой. Точную смету подготовим бесплатно под ваш участок.</p></div>';
  inner.innerHTML=html;PROJECTS_CUR=p;$('#projModal').scrollTop=0;document.body.classList.add('pm-open');
}
window.closeProj=function(){document.body.classList.remove('pm-open');};
function initGalleries(){
  lb=$('#lightbox');if(!lb)return;
  lbImg=$('#lbImg');lbCap=$('#lbCap');lbThumbs=$('#lbThumbs');
  document.addEventListener('click',function(e){
    var trg=e.target.closest('[data-obj]');if(trg){openGallery(OBJECTS[+trg.dataset.obj].photos,'Адрес: '+OBJECTS[+trg.dataset.obj].addr);return;}
    var pj=e.target.closest('[data-proj]');if(pj){openProj(+pj.dataset.proj);return;}
    var th=e.target.closest('.lb-thumbs img');if(th){curPic=+th.dataset.pic;showPic();}
  });
  $('#lbClose').addEventListener('click',closeLb);
  $('#lbPrev').addEventListener('click',function(){lbNav(-1);});
  $('#lbNext').addEventListener('click',function(){lbNav(1);});
  lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')lbNav(-1);if(e.key==='ArrowRight')lbNav(1);});
  var pmc=$('#pmClose');if(pmc)pmc.addEventListener('click',window.closeProj);
  var pmm=$('#projModal');if(pmm)pmm.addEventListener('click',function(e){if(e.target===this)window.closeProj();});
  var pmi=$('#pmInner');if(pmi)pmi.addEventListener('click',function(e){var t=e.target.closest('[data-pm]');if(t){var i=+t.dataset.pm;$('#pmHero').src=PROJECTS_CUR.photos[i];$$('.pm-thumbs img',this).forEach(function(x){x.classList.remove('active');});t.classList.add('active');}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('pm-open'))window.closeProj();});
}

/* ============================================================
   10) КАЛЬКУЛЯТОР (если есть #cPrice)
   ============================================================ */
function initCalc(){
  var cp=$('#cPrice');if(!cp)return;
  var fmt=function(n){return new Intl.NumberFormat('ru-RU').format(Math.round(n));};
  var st={area:120,mat:38000,fac:0,fl:1,fin:1,fnd:0};
  function calc(){var total=st.area*(st.mat+st.fac)*st.fl*st.fin+st.fnd;cp.textContent=fmt(total)+' ₽';var ca=$('#cArea');if(ca)ca.textContent=st.area+' м²';}
  var rArea=$('#rArea');if(rArea)rArea.addEventListener('input',function(e){st.area=+e.target.value;calc();});
  $$('.opt-row').forEach(function(r){var g=r.dataset.g;$$('.opt',r).forEach(function(o){o.addEventListener('click',function(){$$('.opt',r).forEach(function(x){x.classList.remove('active');});o.classList.add('active');st[g]=+o.dataset.v;calc();});});});
  $$('.ch-tabs,.price-tabs,.rooms').forEach(function(t){$$('button',t).forEach(function(b){b.addEventListener('click',function(){$$('button',t).forEach(function(x){x.classList.remove('active');});b.classList.add('active');});});});
  calc();
}

/* ============================================================
   11) FAQ-аккордеон (если есть #faqList)
   ============================================================ */
function initFaq(){
  var items=$$('#faqList .fi');if(!items.length)return;
  items.forEach(function(i){
    i.querySelector('.fq').addEventListener('click',function(){
      var open=i.classList.contains('open');
      items.forEach(function(x){x.classList.remove('open');x.querySelector('.fa').style.maxHeight=null;});
      if(!open){i.classList.add('open');var a=i.querySelector('.fa');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });
}

/* ============================================================
   12) КВИЗ-КАЛЬКУЛЯТОР В ГЕРОЕ (если есть #quiz)
   ============================================================ */
function initQuiz(){
  var root=$('#quiz');if(!root)return;
  var fmt=function(n){return new Intl.NumberFormat('ru-RU').format(Math.round(n));};
  var CITIES=['Краснодар','Геленджик','Новороссийск','Анапа','Славянск-на-Кубани','Тбилисская','Другой город'];
  var st={floor:'Одноэтажный',floorK:1.0,area:120,mat:'Газоблок',matV:38000,fin:'Под ключ',finK:1.75,name:'',phone:'',city:''};
  var FND=300000;
  function estimate(){return st.area*st.matV*st.floorK*st.finK+FND;}
  var step=0;
  var STEPS=[
    {q:'Какой дом вы планируете?',sub:'Шаг 1 из 5',k:'floor',opts:[['Одноэтажный',1.0],['Двухэтажный',0.95],['С мансардой',0.93]]},
    {q:'Площадь дома',sub:'Шаг 2 из 5',type:'area'},
    {q:'Из чего строим?',sub:'Шаг 3 из 5',k:'mat',opts:[['Газоблок',38000],['Кирпич',46000],['Газоблок + облицовка',50000],['Монолит',55000]]},
    {q:'Какая отделка нужна?',sub:'Шаг 4 из 5',k:'fin',opts:[['Коробка дома',1.0],['Предчистовая',1.4],['Под ключ',1.75]]},
    {q:'Куда прислать расчёт?',sub:'Шаг 5 из 5',type:'contact'}
  ];
  function bar(){var p=Math.round((step)/(STEPS.length)*100);return '<div class="qz-bar"><i style="width:'+p+'%"></i></div>';}
  function render(){
    if(step>=STEPS.length){renderResult();return;}
    var s=STEPS[step],h='<div class="qz-head"><span class="qz-sub">'+s.sub+'</span><div class="qz-est">≈ '+fmt(estimate())+' ₽</div></div>'+bar()+'<h3 class="qz-q">'+s.q+'</h3>';
    if(s.opts){
      h+='<div class="qz-opts">';
      s.opts.forEach(function(o){
        var active=(s.k==='floor'&&st.floor===o[0])||(s.k==='mat'&&st.mat===o[0])||(s.k==='fin'&&st.fin===o[0]);
        h+='<button type="button" class="qz-opt'+(active?' active':'')+'" data-k="'+s.k+'" data-l="'+o[0]+'" data-v="'+o[1]+'">'+o[0]+'</button>';
      });
      h+='</div>';
    } else if(s.type==='area'){
      h+='<div class="qz-area"><div class="qz-area-val"><b id="qzAreaV">'+st.area+'</b> м²</div>'+
         '<input id="qzArea" type="range" min="50" max="450" step="5" value="'+st.area+'">'+
         '<div class="qz-area-row"><span>50 м²</span><span>450 м²</span></div>'+
         '<button type="button" class="btn btn-green btn-lg qz-next" data-next="1">Далее →</button></div>';
    } else if(s.type==='contact'){
      h+='<form id="qzForm" class="qz-form">'+
         '<input id="qzName" type="text" placeholder="Ваше имя" required>'+
         '<input id="qzPhone" type="tel" placeholder="+7 (___) ___-__-__" required>'+
         '<select id="qzCity">'+CITIES.map(function(c){return '<option>'+c+'</option>';}).join('')+'</select>'+
         '<button type="submit" class="btn btn-green btn-lg">Узнать стоимость →</button>'+
         '<p class="qz-note">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>'+
         '<p class="qz-err" id="qzErr"></p></form>';
    }
    if(step>0)h+='<button type="button" class="qz-back" data-next="-1">‹ Назад</button>';
    root.innerHTML='<div class="qz-card">'+h+'</div>';
    var ar=$('#qzArea');
    if(ar)ar.addEventListener('input',function(){st.area=+ar.value;$('#qzAreaV').textContent=st.area;$('.qz-est',root).textContent='≈ '+fmt(estimate())+' ₽';});
    var ph=$('#qzPhone');
    if(ph){ph.addEventListener('input',function(){ph.value=phoneMaskFmt(ph.value);});ph.addEventListener('focus',function(){if(!ph.value)ph.value='+7 ';});}
    var fm=$('#qzForm');
    if(fm)fm.addEventListener('submit',submit);
  }
  function renderResult(){
    var e=estimate(),lo=e*0.93,hi=e*1.07;
    root.innerHTML='<div class="qz-card qz-done">'+
      '<div class="qz-done-ic">✓</div>'+
      '<h3>Готово, '+(st.name||'')+'! Ваш расчёт отправлен инженеру</h3>'+
      '<div class="qz-range">Предварительная стоимость дома<br><b>'+fmt(lo)+' — '+fmt(hi)+' ₽</b></div>'+
      '<p>'+st.floor.toLowerCase()+' дом '+st.area+' м², '+st.mat.toLowerCase()+', отделка «'+st.fin.toLowerCase()+'». Инженер свяжется с вами и пришлёт детальную смету в PDF.</p>'+
      '<a href="'+WA_LINK+'" target="_blank" rel="noopener" class="btn btn-green btn-lg">Обсудить в WhatsApp</a>'+
      '</div>';
  }
  function submit(e){
    e.preventDefault();
    var err=$('#qzErr');err.textContent='';
    st.name=$('#qzName').value.trim();st.phone=$('#qzPhone').value.trim();st.city=$('#qzCity').value;
    if(!st.name){err.textContent='Укажите имя';return;}
    if(st.phone.replace(/\D/g,'').length<11){err.textContent='Укажите корректный телефон';return;}
    var btn=$('#qzForm button[type=submit]');btn.disabled=true;btn.textContent='Отправка…';
    try{if(typeof ym==='function')ym(109746794,'reachGoal','quiz_submit');}catch(_){}
    sendLead({name:st.name,phone:st.phone,city:st.city,service:st.floor+', '+st.mat+', '+st.fin,area:st.area,source:'Квиз-калькулятор · ≈ '+fmt(estimate())+' ₽'},function(){step++;render();});
    setTimeout(function(){if($('#qzForm')){step++;render();}},2500);
  }
  root.addEventListener('click',function(e){
    var opt=e.target.closest('.qz-opt');
    if(opt){st[opt.dataset.k]=opt.dataset.l;if(opt.dataset.k==='floor')st.floorK=+opt.dataset.v;if(opt.dataset.k==='mat')st.matV=+opt.dataset.v;if(opt.dataset.k==='fin')st.finK=+opt.dataset.v;step++;render();return;}
    var nx=e.target.closest('[data-next]');
    if(nx){step+=(+nx.dataset.next);if(step<0)step=0;render();}
  });
  try{if(typeof ym==='function')ym(109746794,'reachGoal','quiz_view');}catch(_){}
  render();
}

/* ============================================================
   13) КАЛЬКУЛЯТОР ИПОТЕКИ (если есть #mortgage)
   ============================================================ */
function initMortgage(){
  var root=$('#mortgage');if(!root)return;
  var fmt=function(n){return new Intl.NumberFormat('ru-RU').format(Math.round(n));};
  var els={price:$('#mPrice'),dp:$('#mDp'),years:$('#mYears'),rate:$('#mRate')};
  function calc(){
    var price=+els.price.value,dp=+els.dp.value,years=+els.years.value,rate=+els.rate.value;
    $('#mPriceV').textContent=fmt(price);$('#mDpV').textContent=dp;$('#mYearsV').textContent=years;$('#mRateV').textContent=rate;
    var loan=price*(1-dp/100),i=rate/100/12,n=years*12,pay;
    pay=i>0?loan*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1):loan/n;
    $('#mPay').textContent=fmt(pay);
    $('#mLoan').textContent=fmt(loan)+' ₽';
    $('#mOver').textContent=fmt(pay*n-loan)+' ₽';
  }
  Object.keys(els).forEach(function(k){els[k]&&els[k].addEventListener('input',calc);});
  calc();
}

/* ---------- bootstrap ---------- */
function boot(){
  injectWidgets();
  initNav();initLead();initLeadForm();initCallback();initExit();
  initSlider();renderProj('Все');renderObjects();initGalleries();initCalc();initFaq();initQuiz();initMortgage();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();

})();
