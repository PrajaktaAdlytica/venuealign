from pathlib import Path
from PIL import Image, ImageDraw
import math

MARK = '<path d="M0 2h8l8 16-4 8zM14 2h6l3 6-4 8zM25 2h7L19 29h-8z" fill="currentColor"/>'
def mark():
    return '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">'+MARK+'</svg>'
def brand(where):
    target=where/'assets'/'brand'
    target.mkdir(parents=True,exist_ok=True)
    for name,color in [('primary','#25261f'),('reverse','#fffdf7'),('mono','#000000')]:
        (target/f'mark-{name}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" color="'+color+'">'+MARK+'</svg>')
        (target/f'lockup-{name}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195 36" color="'+color+'">'+MARK+'<text x="40" y="28" fill="currentColor" font-family="Arial, sans-serif" font-size="28" font-weight="bold" letter-spacing="-1.8">VenueAlign</text></svg>')
    (where/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="7" fill="#dbed83"/><g transform="translate(4 4)" color="#181e1a">'+MARK+'</g></svg>')
    logo=Image.new('RGB',(512,512),'#dbed83')
    d=ImageDraw.Draw(logo)
    for pts in [[(0,2),(8,2),(16,18),(12,26)],[(14,2),(20,2),(23,8),(19,16)],[(25,2),(32,2),(19,29),(11,29)]]:
        d.polygon([((x+4)*12.8,(y+4)*12.8) for x,y in pts],fill='#181e1a')
    logo.resize((180,180),Image.Resampling.LANCZOS).save(target/'apple.png')
    logo.save(where/'favicon.ico',sizes=[(16,16),(32,32),(48,48)])
def illustration(i):
    grid=''.join(f'<path d="M{x} 0V230"/>' for x in range(0,400,20))+''.join(f'<path d="M0 {y}H400"/>' for y in range(0,230,20))
    base='<g opacity=".1" stroke="currentColor" stroke-width=".6">'+grid+'</g>'
    if i==0:
        obj='<g transform="rotate(-9 200 112)"><path fill="#a9b9a7" d="M118 28h159v178H118z"/><path fill="#f6f6e9" d="M108 19h153v180H108z"/><path d="M122 40h69m-69 9h45m-45 14h124m-124 30h124m-124 30h124m-124 30h124"/><path stroke-width="5" d="M132 78h66m-66 30h86m-86 30h55m-55 30h83"/><path stroke="#4263d1" stroke-width="3" d="M120 99h123v18H120z"/></g>'
    elif i==1:
        # A yoke-supported theatrical luminaire in a three-quarter elevation.
        obj='<g transform="rotate(-17 200 110)"><path fill="#969fcb" d="m124 83 19-18h93l24 19v48l-20 16h-97l-19-17z"/><path fill="#c8d2ea" d="m128 79 16-15h93l23 17-17 10h-98z"/><path d="m144 91 94 1v48m-94-48v49m10-39h56m-56 10h52m-52 10h49"/><ellipse cx="252" cy="108" rx="22" ry="36" fill="#8296c6"/><ellipse cx="256" cy="106" rx="13" ry="27" fill="#dbeaff"/><path d="M118 104v48q0 18 18 18h61q18 0 18-21v-19" fill="none" stroke-width="8"/><circle cx="126" cy="103" r="7" fill="#d5dff6"/><path d="M158 170v14h33v-14m-48 17h62"/></g><g stroke-dasharray="3 4" opacity=".6"><path d="M82 47v147m-7-147h14m-14 147h14M288 45h54M288 153h54"/></g>'
    elif i==2:
        obj='<path fill="#e3c7a8" d="M64 46h274v142H64z"/><path d="M85 61v113m44-113v113m45-113v113m44-113v113m45-113v113m44-113v113" opacity=".5"/><path fill="#f3ead9" d="M81 68h98v19H81zM136 99h92v19h-92zM214 130h96v19h-96z"/><path d="M179 78h17v31h31m0 0h15v31h16" stroke-dasharray="3 3"/><path stroke="#994c23" d="M200 40v151" stroke-width="3"/><circle cx="200" cy="40" r="5" fill="#994c23"/>'
    else:
        obj='<g transform="rotate(-6 200 115)"><path fill="#a2a79a" d="m104 54 133-17 65 27-12 126-145 15-55-30z"/><path fill="#ced2ba" d="m103 46 129-15 65 27-13 122-141 15-51-27z"/><path fill="#edf2d7" d="m107 34 129-14 56 28-14 121-140 15-45-25z"/><path d="m143 49 92-10m-97 40 105-13m-107 27 44-5m-48 17 84-10m-87 28 49-5"/><path fill="#9cb35e" d="m199 123 54-6-3 25-53 6z"/><path d="m206 134 5 5 11-13"/></g>'
    return '<svg role="img" aria-label="'+['Annotated rider page','Theatrical profile fixture in its yoke','Crew changeover sequence','Layered venue advance packet'][i]+'" viewBox="0 0 400 230" class="illustration">'+base+'<g stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none">'+obj+'</g></svg>'
