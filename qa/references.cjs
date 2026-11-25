const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const report=[];
  for(const [name,url] of [['Linear','https://linear.app/'],['Push','https://www.ableton.com/en/push/'],['GSAP','https://gsap.com/scroll/']]){
    const row={name,url,positions:[]};
    try{
      await page.goto(url,{waitUntil:'domcontentloaded',timeout:18000});
      await page.waitForTimeout(1200);
      for(const y of [0,780,2200,3700]){
        await page.evaluate(value=>scrollTo(0,value),y);
        await page.waitForTimeout(400);
        row.positions.push(await page.evaluate(()=>{
          const visible = el => {const r=el.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&r.width>12&&r.height>4;};
          const all=[...document.querySelectorAll('main *')];const elements=all.length?all:[...document.body.querySelectorAll('*')];
          return {y:scrollY,title:document.title,headings:elements.filter(el=>el.matches('h1,h2,h3')&&visible(el)).map(el=>el.innerText.trim()).filter(Boolean).slice(0,7),media:elements.filter(el=>el.matches('video,canvas,img')&&visible(el)).slice(0,6).map(el=>[el.tagName,el.alt||'']),sticky:elements.filter(el=>visible(el)&&getComputedStyle(el).position==='sticky').length,backgrounds:[...new Set(elements.filter(visible).map(el=>getComputedStyle(el).backgroundColor).filter(c=>c!=='rgba(0, 0, 0, 0)'))].slice(0,7)};
        }));
      }
    }catch(error){row.error=error.message;}
    report.push(row);
  }
  fs.writeFileSync('reference-observation.json',JSON.stringify(report,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
