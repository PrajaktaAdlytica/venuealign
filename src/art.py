from PIL import Image, ImageDraw
from scenic import illustration

POLYGON=[(1,4),(13,4),(13,5),(10,6),(18,24),(25,6),(21,5),(21,4),(31,4),(31,5),(28,6),(17,31),(15,31),(4,6),(1,5)]
MARK='<path fill="currentColor" d="M'+' '.join(f'{x},{y}' for x,y in POLYGON)+'Z"/>'
def mark():
    return '<svg viewBox="0 0 32 36" aria-hidden="true">'+MARK+'</svg>'
def brand(where):
    target=where/'assets'/'brand'
    target.mkdir(parents=True,exist_ok=True)
    for name,color in [('primary','#342a26'),('reverse','#fcf2db'),('mono','#000000')]:
        base=f'<svg xmlns="http://www.w3.org/2000/svg" color="{color}"'
        (target/f'mark-{name}.svg').write_text(base+' viewBox="0 0 32 36">'+MARK+'</svg>')
        (target/f'lockup-{name}.svg').write_text(base+' viewBox="0 0 190 36">'+MARK+'<path stroke="currentColor" d="M39 5v25"/><text x="49" y="27" fill="currentColor" font-family="Georgia,serif" font-size="29">VenueAlign</text></svg>')
    (where/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="#642b30" d="M0 0h40v40H0z"/><g transform="translate(4 2)" color="#f8efd9">'+MARK+'</g></svg>')
    icon=Image.new('RGB',(512,512),'#642b30')
    ImageDraw.Draw(icon).polygon([((x+4)*12.8,(y+2)*12.8) for x,y in POLYGON],fill='#f8efd9')
    icon.resize((180,180),Image.Resampling.LANCZOS).save(target/'apple.png')
    icon.save(where/'favicon.ico',sizes=[(16,16),(32,32),(48,48)])
