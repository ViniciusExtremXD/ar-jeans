"""List product pages from the catalog metadata for manual selection."""
import json

META = r'c:\Users\Vini_\OneDrive - Instituto Presbiteriano Mackenzie\Área de Trabalho\Vesta\Albert\ar-jeans\public\assets\products\catalog\catalog-meta.json'

with open(META, encoding='utf-8') as f:
    meta = json.load(f)

for p in meta:
    if p['text'] and 'R$' in p['text'] and len(p['images']) >= 3:
        lines = [l.strip() for l in p['text'].split('\n') if l.strip()]
        name = lines[0] if lines else '?'
        price_line = next((l for l in lines if 'R$' in l), '?')
        imgs = [i for i in p['images'] if i['filename'].endswith('.jpeg') and i['size_kb'] > 50]
        colors_idx = -1
        for i, l in enumerate(lines):
            if l == 'Cores:':
                colors_idx = i
                break
        colors = []
        if colors_idx >= 0:
            for l in lines[colors_idx+1:]:
                if l.startswith('CATÁLOGO') or l.isdigit() or l.startswith('#'):
                    break
                colors.append(l)
        
        grades = ''
        for i, l in enumerate(lines):
            if l == 'Grades:':
                if i + 1 < len(lines):
                    grades = lines[i+1]
                break
        
        print(f"Page {p['page']:2d} | {name:40s} | {price_line:12s} | {grades:12s} | {len(imgs)} imgs | colors: {', '.join(colors[:3])}")
