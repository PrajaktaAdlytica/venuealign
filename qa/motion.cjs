const {spawnSync}=require('child_process');
const fs=require('fs');
const path=require('path');

// Capture the actual browser frames. The optional film uses the runner's FFmpeg.
async function captureMotion(browser) {
  if(spawnSync('ffmpeg',['-version'],{stdio:'ignore'}).status!==0) return;
  const directory=fs.mkdtempSync(path.join(require('os').tmpdir(),'venuealign-film-'));
  const page=await browser.newPage({viewport:{width:1100,height:760}});
  let frame=0;
  async function sequence(seconds,action) {
    const start=Date.now();
    for(let i=0;i<seconds*12;i++) {
      if(action) await action(i/(seconds*12));
      const name=String(frame++).padStart(4,'0')+'.jpg';
      await page.screenshot({path:path.join(directory,name),type:'jpeg',quality:78});
      await page.waitForTimeout(Math.max(0,start+((i+1)*1000/12)-Date.now()));
    }
  }
  try {
    await page.goto('http://localhost:8080/');
    await page.evaluate(()=>document.fonts.ready);
    await page.getByRole('button',{name:'Replay opening'}).click();
    await sequence(2.5);
    const target=await page.locator('.traceframe').evaluate(el=>el.getBoundingClientRect().top+scrollY-innerHeight*.15);
    await sequence(2, t=>page.evaluate(y=>scrollTo(0,y),target*t));
    await sequence(.75);
    await page.locator('.evidence .console').evaluate(el=>el.scrollIntoView({block:'center'}));
    await sequence(2);
    await page.getByRole('button',{name:'Stage width',exact:true}).click();
    await sequence(1.25);
    await page.getByRole('button',{name:'Fixture',exact:true}).click();
    await sequence(1.25);
    const clip=spawnSync('ffmpeg',['-loglevel','error','-framerate','12','-i',path.join(directory,'%04d.jpg'),'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-y','captures/home-motion.mp4']);
    if(clip.status!==0) throw new Error(clip.stderr.toString());
  } finally {
    await page.close();
    fs.rmSync(directory,{recursive:true,force:true});
  }
}
module.exports=captureMotion;
