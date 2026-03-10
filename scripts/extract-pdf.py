"""
Extract images + text from the AR Jeans PDF catalog.
Saves images to public/assets/products/catalog/
and prints page text for product data extraction.
"""
import fitz  # PyMuPDF
import os
import json
import sys

PDF_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'Catálogo Digital - AR Jeans.pdf')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'products', 'catalog')

os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print(f"PDF: {doc.page_count} pages")
print("=" * 60)

all_pages = []
image_index = 0

for page_num in range(doc.page_count):
    page = doc[page_num]
    text = page.get_text("text").strip()
    
    page_info = {
        "page": page_num + 1,
        "text": text,
        "images": []
    }
    
    # Extract images from page
    image_list = page.get_images(full=True)
    
    for img_idx, img_info in enumerate(image_list):
        xref = img_info[0]
        try:
            base_image = doc.extract_image(xref)
            if base_image:
                ext = base_image["ext"]
                img_bytes = base_image["image"]
                w = base_image.get("width", 0)
                h = base_image.get("height", 0)
                
                # Only save images that are reasonably sized (skip tiny icons)
                if w > 100 and h > 100 and len(img_bytes) > 5000:
                    filename = f"page{page_num+1:02d}-img{img_idx+1:02d}.{ext}"
                    filepath = os.path.join(OUT_DIR, filename)
                    with open(filepath, "wb") as f:
                        f.write(img_bytes)
                    
                    page_info["images"].append({
                        "filename": filename,
                        "width": w,
                        "height": h,
                        "size_kb": round(len(img_bytes) / 1024, 1)
                    })
                    image_index += 1
                    print(f"  [Page {page_num+1}] Saved: {filename} ({w}x{h}, {round(len(img_bytes)/1024,1)}KB)")
        except Exception as e:
            print(f"  [Page {page_num+1}] Error extracting image xref={xref}: {e}")
    
    all_pages.append(page_info)
    
    # Print text content
    if text:
        print(f"\n--- Page {page_num+1} text ---")
        print(text[:500])
        if len(text) > 500:
            print("...")

print(f"\n{'='*60}")
print(f"Total images extracted: {image_index}")

# Save structured data for reference
meta_path = os.path.join(OUT_DIR, "catalog-meta.json")
with open(meta_path, "w", encoding="utf-8") as f:
    json.dump(all_pages, f, ensure_ascii=False, indent=2)
print(f"Metadata saved to: {meta_path}")
