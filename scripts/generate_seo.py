import json
from pathlib import Path
from datetime import date

SITE='https://dom-kk.ru'
data=json.loads(Path('scripts/seo_cities.json').read_text(encoding='utf-8'))
cities=[c for c in dict.fromkeys(data['cities']) if c not in set(data['exclude'])]
services=[
('строительство-домов-в','Строительство домов в {city} под ключ'),
('дом-под-ключ-в','Дом под ключ в {city}'),
('строительство-домов-из-газобетона-в','Строительство домов из газобетона в {city}'),
('строительство-кирпичных-домов-в','Строительство кирпичных домов в {city}'),
('строительство-монолитных-домов-в','Строительство монолитных домов в {city}'),
('проектирование-домов-в','Проектирование домов в {city}')]
top=['Геленджик','Краснодар','Новороссийск','Анапа','Славянск-на-Кубани','Крымск','Темрюк','Абинск','Динская','Северская','Ейск','Горячий Ключ','Армавир','Тимашевск']
extra=('строительство-коттеджей-в','Строительство коттеджей в {city}')
def slug(s): return s.lower().replace(' ','-')
def page(title,city):
    return f"""<!doctype html><html lang='ru'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>{title} — ДОМ-КК</title><meta name='description' content='{title}: фиксированная смета, поэтапная оплата, гарантия 10 лет.'><style>body{{font-family:Arial,sans-serif;margin:0;line-height:1.55}}.wrap{{max-width:1100px;margin:auto;padding:24px}}.btn{{background:#00b956;color:white;padding:14px 22px;border-radius:12px;text-decoration:none;font-weight:bold}}header{{border-bottom:1px solid #eee}}h1{{font-size:48px;line-height:1.05}}section{{padding:35px 0}}.grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}}.card{{border:1px solid #eee;border-radius:18px;padding:18px}}@media(max-width:760px){{h1{{font-size:32px}}.grid{{grid-template-columns:1fr}}}}</style></head><body><header><div class='wrap'><b>ДОМ-КК</b> · <a href='/'>главная</a></div></header><main><section><div class='wrap'><h1>{title}</h1><p>Строим частные дома в {city} и рядом. Подбираем проект, считаем смету, фиксируем стоимость в договоре и ведём работы по этапам.</p><a class='btn' href='/#lead'>Получить смету</a></div></section><section><div class='wrap grid'><div class='card'>Фундамент, коробка, кровля</div><div class='card'>Газобетон, кирпич, монолит</div><div class='card'>Гарантия 10 лет</div></div></section></main></body></html>"""
items=[]
for city in cities:
    for pref,title in services: items.append((city,pref,title))
for city in top: items.append((city,extra[0],extra[1]))
items=items[:500]
urls=[]
for city,pref,title in items:
    title=title.format(city=city); u=slug(pref+'-'+city); urls.append(u)
    Path(u).mkdir(parents=True,exist_ok=True)
    Path(u,'index.html').write_text(page(title,city),encoding='utf-8')
Path('seo-pages.html').write_text('<br>'.join(f"<a href='/{u}/'>{u}</a>" for u in urls),encoding='utf-8')
xml=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in ['']+urls: xml.append(f'<url><loc>{SITE}/{u}/</loc><lastmod>{date.today().isoformat()}</lastmod></url>')
xml.append('</urlset>')
Path('sitemap.xml').write_text('\n'.join(xml),encoding='utf-8')
print(len(urls))
