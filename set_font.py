from pathlib import Path
p = Path(r'D:\Bz\n.css')
s = p.read_text(encoding='utf-8-sig')
s = s.replace("@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');", "@import url('https://fonts.googleapis.com/css2?family=Phetsarath+OT&family=Manrope:wght@400;500;600;700;800&display=swap');")
s = s.replace("font-family:'IBM Plex Sans Thai',sans-serif", "font-family:'Phetsarath OT','Noto Sans Lao',sans-serif")
s = s.replace("'IBM Plex Sans Thai',sans-serif", "'Phetsarath OT','Noto Sans Lao',sans-serif")
p.write_text(s, encoding='utf-8')
print('Updated CSS font stack to Phetsarath OT with Noto Sans Lao fallback.')
