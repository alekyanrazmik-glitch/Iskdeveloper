#!/usr/bin/env python3
"""
ДОМ-КК · генератор SEO-лендингов.
Создаёт по одной странице на каждую связку «услуга × город».
Использует общий /assets/style.css и /assets/app.js, поэтому каждая
страница автоматически получает фирменную шапку/подвал, sticky-CTA,
лид-попап, exit-intent, маску телефона и отправку в Telegram+e-mail.
"""
import json
from pathlib import Path
from datetime import date

SITE = 'https://dom-kk.ru'

data = json.loads(Path('scripts/seo_cities.json').read_text(encoding='utf-8'))
exclude = set(data.get('exclude', []))
cities = [c for c in dict.fromkeys(data['cities']) if c not in exclude]

# Услуги (slug-префикс, шаблон H1/title, intro-абзац, тема для контента).
# В шаблонах используется {prep} — город в предложном падеже (в Краснодаре).
SERVICES = [
    ('stroitelstvo-domov-v',
     'Строительство домов в {prep} под ключ',
     'Строим частные дома под ключ в {prep} и районе. Подбираем проект, считаем смету, фиксируем стоимость в договоре и ведём работы поэтапно.',
     'general'),
    ('dom-pod-klyuch-v',
     'Дом под ключ в {prep} — цены и сроки',
     'Возводим жилой дом под ключ в {prep}: фундамент, коробка, кровля, инженерные сети и предчистовая отделка. Точная смета — за 15 минут.',
     'turnkey'),
    ('stroitelstvo-iz-gazobetona-v',
     'Строительство домов из газобетона в {prep}',
     'Газобетонные дома в {prep} — тёплые, прочные и экономичные. Стены из газоблока 250–375 мм с армопоясом и монолитными перемычками.',
     'gazobeton'),
    ('stroitelstvo-kirpichnyh-domov-v',
     'Строительство кирпичных домов в {prep}',
     'Кирпичные дома в {prep} — долговечность на десятилетия. Несущий и облицовочный кирпич, монолитные сердечники, кровля из металлочерепицы.',
     'brick'),
    ('stroitelstvo-monolitnyh-domov-v',
     'Строительство монолитных домов в {prep}',
     'Монолитные дома в {prep} — свобода планировок и устойчивость к сейсмике. Несъёмная или съёмная опалубка, бетон класса B25, армирование по проекту.',
     'monolit'),
    ('proektirovanie-domov-v',
     'Проектирование домов в {prep}',
     'Архитектурное и конструктивное проектирование частных домов в {prep}. Адаптируем типовой проект под ваш участок или разработаем индивидуальный.',
     'project'),
    ('odnoetazhnye-doma-v',
     'Одноэтажные дома под ключ в {prep}',
     'Одноэтажный дом в {prep} — комфорт жизни без лестниц, простая планировка и быстрое строительство. Площади от 80 до 200 м².',
     'one_floor'),
    ('dvuhetazhnye-doma-v',
     'Двухэтажные дома под ключ в {prep}',
     'Двухэтажный дом в {prep} — больше площади на меньшем участке. Площади от 120 до 250 м², продуманные планировки и террасы.',
     'two_floor'),
    ('dachnye-doma-v',
     'Дачные дома и коттеджи в {prep}',
     'Сезонные и всесезонные дачные дома в {prep}. Каркас, газобетон, керамзитоблок — подбираем оптимальный вариант под бюджет.',
     'dacha'),
]

# Особые случаи склонения (несклоняемые / специальные)
PREP_SPECIAL = {
    'Сочи':'Сочи','Туапсе':'Туапсе','Абрау-Дюрсо':'Абрау-Дюрсо',
    'Гулькевичи':'Гулькевичах','Выселки':'Выселках','Шепси':'Шепси',
    'Агой':'Агое','Джубга':'Джубге','Новомихайловский':'Новомихайловском',
    'Славянск-на-Кубани':'Славянске-на-Кубани','Приморско-Ахтарск':'Приморско-Ахтарске',
    'Архипо-Осиповка':'Архипо-Осиповке','Усть-Лабинск':'Усть-Лабинске',
}

def prep(city: str) -> str:
    """Возвращает город в предложном падеже («Краснодар» → «Краснодаре»)."""
    if city in PREP_SPECIAL: return PREP_SPECIAL[city]
    # обрабатываем многословные/дефисные имена — склоняем последнее слово
    parts = city.split('-')
    head = '-'.join(parts[:-1])
    last = parts[-1]
    if last.endswith('ая'): inflected = last[:-2] + 'ой'
    elif last.endswith('ое'): inflected = last[:-2] + 'ом'
    elif last.endswith('ий'): inflected = last[:-2] + 'ом'
    elif last.endswith('ый'): inflected = last[:-2] + 'ом'
    elif last.endswith('а'):  inflected = last[:-1] + 'е'
    elif last.endswith('я'):  inflected = last[:-1] + 'е'
    elif last.endswith('ь'):  inflected = last[:-1] + 'е'
    elif last.endswith('й'):  inflected = last[:-1] + 'е'
    elif last.endswith('и'):  inflected = last  # несклоняемые на -и
    elif last.endswith('о'):  inflected = last  # несклоняемые на -о
    else:                      inflected = last + 'е'  # согласная → +е
    return (head + '-' + inflected) if head else inflected

# Доп-блок «что входит» под каждую тему
THEME = {
    'general':  ['Геология участка, проект и смета', 'Фундамент под грунт', 'Коробка дома и кровля', 'Электрика, вода, отопление', 'Окна, двери, предчистовая отделка'],
    'turnkey':  ['Полный цикл работ — от эскиза до ключей', 'Фиксированная цена в договоре', 'Оплата по этапам — без предоплаты за всё', 'Гарантия 10 лет на конструктив', 'Свои бригады без субподряда'],
    'gazobeton':['Газоблок D500 / D600 толщиной 250–375 мм', 'Монолитный армопояс по периметру', 'Сердечники в углах и проёмах', 'Утепление кровли минватой 150 мм', 'Облицовка кирпичом, штукатурка или вентфасад'],
    'brick':    ['Керамический кирпич М150 и выше', 'Полнотелый и облицовочный — на выбор', 'Многослойная стена с утеплителем и облицовкой', 'Армопояс и монолитные перемычки', 'Кровля из металлочерепицы или фальца'],
    'monolit':  ['Несъёмная или съёмная опалубка', 'Бетон B25 с пластификаторами', 'Армирование по проекту КЖ', 'Свободная планировка без несущих стен внутри', 'Высокая устойчивость к сейсмическим нагрузкам'],
    'project':  ['Архитектурный раздел с фасадами и планами', 'Конструктивный раздел КЖ', 'Инженерные сети ВК, ОВ, ЭО', 'Уведомление о планируемом строительстве', 'Адаптация под грунт и климат'],
    'one_floor':['Площади от 80 до 200 м²', 'Без лестниц — удобно для семьи и пожилых', 'Просторная гостиная-кухня', 'Терраса под общей крышей', 'Срок строительства — от 3,5 месяцев'],
    'two_floor':['Площади от 120 до 250 м²', 'Спальни на втором этаже', 'Гостиная-кухня + кабинет на первом', 'Балкон или открытая терраса', 'Экономия земли на узком участке'],
    'dacha':    ['Каркасные, газобетонные, керамзитоблочные', 'Площади от 50 до 120 м²', 'Свайно-винтовой или ленточный фундамент', 'Простая планировка — спальня, кухня-гостиная, санузел', 'Срок строительства — от 2 месяцев'],
}

# Цены-ориентиры (для UX, не оферта)
PRICE = {
    'general':  ['Эконом, газобетон 100 м² — от 4 200 000 ₽', 'Комфорт, газобетон 145 м² — от 6 100 000 ₽', 'Кирпич, комфорт 110 м² — от 7 200 000 ₽'],
    'turnkey':  ['Дом «Семейный» 110 м² — от 7 204 311 ₽', 'Дом «Тольятти» 123 м² — от 6 862 145 ₽', 'Дом «Симфония» 110 м² — от 7 551 000 ₽'],
    'gazobeton':['Коробка газобетон 100 м² — от 3 800 000 ₽', 'Дом под ключ газобетон 145 м² — от 6 100 000 ₽', 'Дом под ключ газобетон 180 м² — от 7 600 000 ₽'],
    'brick':    ['Коробка кирпич 100 м² — от 4 400 000 ₽', 'Дом под ключ кирпич 110 м² — от 7 200 000 ₽', 'Дом под ключ кирпич 180 м² — от 9 100 000 ₽'],
    'monolit':  ['Коробка монолит 100 м² — от 5 000 000 ₽', 'Дом под ключ монолит 150 м² — от 8 200 000 ₽', 'Двухэтажный монолит 200 м² — от 11 500 000 ₽'],
    'project':  ['Адаптация типового проекта — бесплатно при заказе строительства', 'Индивидуальный проект 100 м² — от 80 000 ₽', 'Индивидуальный проект 200 м² — от 150 000 ₽'],
    'one_floor':['100 м² газобетон — от 4 200 000 ₽', '120 м² газобетон — от 5 100 000 ₽', '145 м² кирпич — от 7 200 000 ₽'],
    'two_floor':['140 м² газобетон — от 5 900 000 ₽', '180 м² кирпич — от 9 100 000 ₽', '220 м² монолит — от 11 800 000 ₽'],
    'dacha':    ['Каркас 50 м² — от 1 800 000 ₽', 'Газобетон 80 м² — от 3 200 000 ₽', 'Керамзитоблок 100 м² — от 3 800 000 ₽'],
}

def slug(s: str) -> str:
    """Транслит русского в латиницу для безопасных URL."""
    table = {
        'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z',
        'и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r',
        's':'s','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh',
        'щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',' ':'-','-':'-',
    }
    out = []
    for ch in s.lower():
        out.append(table.get(ch, ch if ch.isalnum() else ''))
    res = ''.join(out)
    while '--' in res: res = res.replace('--','-')
    return res.strip('-')

def render_list(items):
    return '\n'.join(f'<li><span class="ck">✓</span> {x}</li>' for x in items)

def render_prices(items):
    return '\n'.join(f'<div class="adv"><div class="ai">💰</div><p style="font-size:15px">{x}</p></div>' for x in items)

def page(service_title, city, theme, slug_full):
    pc = prep(city)
    title = service_title.format(prep=pc, city=city)
    intro = next(s[2] for s in SERVICES if s[3]==theme).format(prep=pc, city=city)
    bullets = render_list(THEME[theme])
    prices = render_prices(PRICE[theme])
    desc = f"{title}: фиксированная смета, оплата по этапам, гарантия 10 лет. ИСК «Девелоперы» строит частные дома в Краснодарском крае с 2010 года."
    canonical = f"{SITE}/{slug_full}/"
    schema = {
        "@context":"https://schema.org","@type":"GeneralContractor",
        "name":f"ДОМ-КК — {title}","url":canonical,
        "telephone":"+7-900-272-10-01","email":"dom-kkk@mail.ru",
        "areaServed":{"@type":"City","name":city},
        "address":{"@type":"PostalAddress","addressRegion":"Краснодарский край","addressLocality":city,"addressCountry":"RU"},
        "priceRange":"от 2 400 000 ₽",
        "description":desc
    }
    schema_json = json.dumps(schema, ensure_ascii=False)

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light only">
<title>{title} — ДОМ-КК</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title} — ДОМ-КК">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="{canonical}">
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#00b956">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Unbounded:wght@700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<script type="application/ld+json">{schema_json}</script>
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
(function(m,e,t,r,i,k,a){{m[i]=m[i]||function(){{(m[i].a=m[i].a||[]).push(arguments)}};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){{if(document.scripts[j].src===r){{return;}}}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=109746794','ym');
ym(109746794,'init',{{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",accurateTrackBounce:true,trackLinks:true}});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/109746794" style="position:absolute;left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
</head>
<body>

<header>
  <div class="wrap nav">
    <a href="/" class="logo">ДОМ-<b>КК</b><small>ООО ИСК «Девелоперы»</small></a>
    <nav class="nav-links">
      <a href="/">Главная</a><a href="/proekty.html">Проекты</a><a href="/obekty.html">Объекты</a><a href="/ceny.html">Цены</a><a href="/o-kompanii.html">О компании</a><a href="/kontakty.html">Контакты</a>
    </nav>
    <div class="nav-right">
      <a href="tel:+79002721001" class="nav-phone">+7 900 272-10-01<small>звонок по краю</small></a>
      <a href="#lead" class="btn btn-green">Получить смету</a>
      <button class="burger" id="burger"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<div class="wrap"><div class="crumbs"><a href="/">Главная</a> / <a href="/proekty.html">Услуги</a> / <span>{title}</span></div></div>

<section class="page-hero">
  <div class="wrap">
    <h1>{title}</h1>
    <p>{intro} Фиксированная цена в договоре, поэтапная оплата, гарантия 10 лет на конструктив.</p>
    <div class="hl-pills" style="margin-top:14px">
      <span class="hl-pill">✓ Фикс. цена в договоре</span>
      <span class="hl-pill">✓ Срок 5 мес.</span>
      <span class="hl-pill">✓ Гарантия 10 лет</span>
      <span class="hl-pill">✓ Оплата по этапам</span>
    </div>
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
      <a href="#lead" class="btn btn-green btn-lg">Получить смету за 15 минут</a>
      <a href="tel:+79002721001" class="btn btn-light btn-lg">Позвонить</a>
    </div>
  </div>
</section>

<!-- Quick callback -->
<div class="qcb">
  <div class="qcb-inner">
    <div class="qcb-text"><h3>Перезвоним за 1 минуту</h3><p>Ответим на вопросы по строительству в {pc}, рассчитаем смету, поможем подобрать проект.</p></div>
    <form class="qcb-form" id="qcbForm"><input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required><button type="submit">Перезвонить мне</button></form>
  </div>
</div>

<section>
  <div class="wrap">
    <h2 class="h-sec">Что входит в работу</h2>
    <p class="sub-sec">{title}: полный цикл, прозрачная смета и понятные сроки.</p>
    <div class="adv-grid">
      <div class="adv"><div class="ai">📋</div><h3>Проект и смета</h3><p>Подбираем готовый проект или адаптируем под ваш участок. Смета фиксируется в договоре.</p></div>
      <div class="adv"><div class="ai">🏗️</div><h3>Фундамент и коробка</h3><p>Геология, разметка, фундамент под грунт. Стены и перекрытия по проекту.</p></div>
      <div class="adv"><div class="ai">🏠</div><h3>Кровля и фасад</h3><p>Кровельная система, утепление, окна, фасадная отделка под выбранный стиль.</p></div>
      <div class="adv"><div class="ai">⚙️</div><h3>Инженерные сети</h3><p>Электрика, водопровод, канализация, отопление по проекту.</p></div>
      <div class="adv"><div class="ai">🛡️</div><h3>Гарантия 10 лет</h3><p>Официальная гарантия на несущие конструкции с сопровождением после сдачи.</p></div>
      <div class="adv"><div class="ai">💼</div><h3>Договор и оплата</h3><p>Договор подряда, оплата по факту выполненных этапов, закупка материалов по чекам.</p></div>
    </div>
  </div>
</section>

<section style="background:var(--bg-soft)">
  <div class="wrap">
    <h2 class="h-sec">Особенности услуги</h2>
    <p class="sub-sec">Чем {title.lower()} отличается у ИСК «Девелоперы».</p>
    <div class="lead" style="display:block;background:#fff;color:var(--ink);padding:32px;border-radius:18px">
      <ul style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        {bullets}
      </ul>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="h-sec">Цены-ориентиры — {city}</h2>
    <p class="sub-sec">Базовые комплектации. Точная смета фиксируется в договоре после выезда инженера на участок.</p>
    <div class="adv-grid">
      {prices}
    </div>
    <p style="margin-top:18px;color:var(--gray);font-size:14px">Стоимость носит информационный характер и не является публичной офертой. Окончательная цена зависит от участка, грунта, удалённости и комплектации.</p>
  </div>
</section>

<section style="background:var(--bg-soft)">
  <div class="wrap">
    <div class="split">
      <div class="fcard f-green">
        <div class="f-timer">15 мин</div>
        <h3>Получите смету по вашему проекту</h3>
        <p>Оставьте заявку — инженер уточнит параметры и подготовит детальный расчёт стоимости строительства в {pc} в течение 15 минут.</p>
        <ul><li><span class="ck">✓</span> Бесплатный выезд на участок</li><li><span class="ck">✓</span> Разбивка по материалам и работам</li><li><span class="ck">✓</span> Сроки по каждому этапу</li></ul>
        <a href="#lead" class="btn btn-light btn-lg">Запросить смету</a>
      </div>
      <div class="fcard f-dark">
        <h3>Строительство без скрытых платежей</h3>
        <p>Всё, что входит в стоимость, прописано в договоре. Цена в смете — финальная. Никаких «доплат по ходу».</p>
        <ul><li><span class="ck">✓</span> Фиксированная смета в договоре</li><li><span class="ck">✓</span> Поэтапная оплата по факту работ</li><li><span class="ck">✓</span> Закупка материалов по чекам</li></ul>
        <a href="/ceny.html" class="btn btn-green btn-lg">Калькулятор и сметы →</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="h-sec">Связаться с инженером</h2>
    <p class="sub-sec">Позвоните прямо сейчас или оставьте заявку — перезвоним за 1 минуту.</p>
    <div class="contacts-grid">
      <div>
        <div class="contact-card"><h3>Телефон</h3><span class="cc-main"><a href="tel:+79002721001">+7 900 272-10-01</a></span><p>Звонок по Краснодарскому краю. Ежедневно с 9:00 до 19:00.</p></div>
        <div class="contact-card"><h3>WhatsApp</h3><span class="cc-main"><a href="https://wa.me/79002721001?text=Здравствуйте,%20хочу%20рассчитать%20смету%20в%20{pc}" target="_blank" rel="noopener">Написать в WhatsApp</a></span><p>Ответим, пришлём примеры проектов и смет по {city}.</p></div>
      </div>
      <div>
        <div class="contact-card"><h3>Почему мы</h3>
          <p style="font-size:15px;line-height:1.7">15+ лет на рынке Краснодарского края<br>300+ построенных частных домов<br>Собственные бригады без субподряда<br>Гарантия 10 лет на конструктив<br>Работаем по договору</p>
        </div>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="foot-phones">
      <div class="fp"><b><a href="tel:+79002721001">+7 900 272-10-01</a></b><span>телефон в Краснодарском крае</span></div>
      <div class="fp"><b><a href="mailto:dom-kkk@mail.ru">dom-kkk@mail.ru</a></b><span>почта для заявок</span></div>
    </div>
    <div class="foot-cols">
      <div class="foot-col"><h4>Услуги</h4><a href="/proekty.html">Дома под ключ</a><a href="/proekty.html">Газобетон и керамзитоблок</a><a href="/proekty.html">Кирпичные дома</a><a href="/proekty.html">Монолитные дома</a><a href="/ceny.html">Цены и сметы</a></div>
      <div class="foot-col"><h4>Компания</h4><a href="/o-kompanii.html">О компании</a><a href="/o-kompanii.html#stages">Этапы работ</a><a href="/obekty.html">Портфолио</a><a href="/o-kompanii.html#reviews">Отзывы</a><a href="/o-kompanii.html#faq">Вопросы</a></div>
      <div class="foot-col"><h4>Навигация</h4><a href="/proekty.html">Проекты</a><a href="/obekty.html">Объекты</a><a href="/ceny.html">Калькулятор</a><a href="/kontakty.html">Контакты</a></div>
      <div class="foot-col foot-cta"><a href="#lead" class="btn btn-green">Получить смету</a><a href="/proekty.html" class="btn btn-light">Выбрать проект</a></div>
    </div>
    <p class="req">ООО ИСК «Девелоперы» · ИНН 2304085881 · КПП 230401001 · ОГРН 1252300031312<br>
    Юридический адрес: 353460, Краснодарский край, г. Геленджик, ул. Тельмана, д. 135<br>
    Любая информация на сайте носит информационный характер и не является публичной офертой, определяемой положениями ст. 437 ГК РФ. © 2026</p>
    <div class="foot-bottom"><div class="lg">ДОМ-<b>КК</b> · ООО ИСК «Девелоперы»</div></div>
  </div>
</footer>

<script src="/assets/app.js"></script>
</body>
</html>
"""

# === Генерация ===
urls = []
for city in cities:
    for pref, title_tpl, _intro, theme in SERVICES:
        slug_full = slug(pref + '-' + city)
        Path(slug_full).mkdir(parents=True, exist_ok=True)
        Path(slug_full, 'index.html').write_text(page(title_tpl, city, theme, slug_full), encoding='utf-8')
        urls.append(slug_full)

# === Редиректы со старых кириллических URL на новые латинские ===
# Старый генератор использовал кириллические префиксы. После переименования эти URL
# 404'ят. Создаём meta-refresh-редиректы, чтобы сохранить SEO-индекс и существующие ссылки.
LEGACY_MAP = [
    ('строительство-домов-в-',            'stroitelstvo-domov-v-'),
    ('дом-под-ключ-в-',                   'dom-pod-klyuch-v-'),
    ('строительство-домов-из-газобетона-в-','stroitelstvo-iz-gazobetona-v-'),
    ('строительство-кирпичных-домов-в-',  'stroitelstvo-kirpichnyh-domov-v-'),
    ('строительство-монолитных-домов-в-', 'stroitelstvo-monolitnyh-domov-v-'),
    ('проектирование-домов-в-',           'proektirovanie-domov-v-'),
    ('строительство-коттеджей-в-',        'dachnye-doma-v-'),  # коттеджи → дачные
]
LEGACY_CITIES = list(data['cities'])  # включая исключённые из новой генерации — старые ссылки могут быть и на них

def redirect_html(target_url: str, h1: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url={target_url}">
<link rel="canonical" href="{SITE}{target_url}">
<meta name="robots" content="noindex,follow">
<title>{h1} — ДОМ-КК</title>
<style>body{{font-family:Arial,sans-serif;text-align:center;padding:60px 20px;background:#fff}}a{{color:#00b956;font-weight:700}}</style>
</head>
<body>
<p>Страница переехала. Перенаправляем на <a href="{target_url}">{h1}</a>…</p>
<script>location.replace("{target_url}");</script>
</body>
</html>
"""

legacy_count = 0
for old_pref, new_pref in LEGACY_MAP:
    for city in LEGACY_CITIES:
        old_dir = (old_pref + city.lower().replace(' ', '-'))
        new_slug = slug(new_pref + city)
        # Если у новой страницы есть файл — редирект ведёт прямо на неё.
        # Если нет (город исключён) — редиректим на главную с пояснением.
        target = f"/{new_slug}/" if Path(new_slug, 'index.html').exists() else "/"
        Path(old_dir).mkdir(parents=True, exist_ok=True)
        Path(old_dir, 'index.html').write_text(redirect_html(target, city), encoding='utf-8')
        legacy_count += 1

# Индекс всех SEO-страниц
links = '\n'.join(f'<li><a href="/{u}/">{u.replace("-"," ")}</a></li>' for u in urls)
Path('seo-pages.html').write_text(
    f"<!doctype html><html lang='ru'><head><meta charset='utf-8'><title>SEO-карта · ДОМ-КК</title><link rel='stylesheet' href='/assets/style.css'></head><body><div class='wrap' style='padding:40px 28px'><h1>SEO-страницы ({len(urls)} шт.)</h1><ul style='columns:3;column-gap:30px'>{links}</ul></div></body></html>",
    encoding='utf-8'
)

# Sitemap (главные страницы + SEO)
today = date.today().isoformat()
main_pages = ['', 'proekty.html', 'obekty.html', 'ceny.html', 'o-kompanii.html', 'kontakty.html']
xml = ['<?xml version="1.0" encoding="UTF-8"?>',
       '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for p in main_pages:
    pri = '1.0' if p == '' else '0.9'
    xml.append(f'<url><loc>{SITE}/{p}</loc><lastmod>{today}</lastmod><priority>{pri}</priority></url>')
for u in urls:
    xml.append(f'<url><loc>{SITE}/{u}/</loc><lastmod>{today}</lastmod><priority>0.6</priority></url>')
xml.append('</urlset>')
Path('sitemap.xml').write_text('\n'.join(xml), encoding='utf-8')

print(f"Сгенерировано SEO-страниц: {len(urls)}")
print(f"Городов: {len(cities)} · Услуг на город: {len(SERVICES)}")
print(f"Редиректов со старых кириллических URL: {legacy_count}")
print(f"Sitemap: {len(main_pages) + len(urls)} URL")
