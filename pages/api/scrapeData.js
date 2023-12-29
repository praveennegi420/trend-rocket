const puppeteer = require('puppeteer-core');

export default async function handler(req, res) {
  const targetUrl = req.query.brand;

  try {
    const browser= await puppeteer.connect({ browserWSEndpoint:`wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`})
    // const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto(targetUrl);
    await page.waitForSelector('a');
    
    const socialMediaLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .filter(link => {
          const regex = /^(https:\/\/www\.facebook\.com\/|https:\/\/facebook\.com\/|https:\/\/www\.instagram\.com\/|https:\/\/instagram\.com\/)/;
          return regex.test(link.href);
        })
        .map(link => link.href);
    });

    await page.goto('https://facebook.com');
    await page.type('[id=email]', process.env.FB_EMAIL);
    await page.type('[id=pass]', process.env.FB_PASSWORD);
    await page.click('[type=submit]');
    
    await page.goto(`${socialMediaLinks[0]}`);
    await page.waitForSelector('a');  

    const data = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xi81zsa.x1s688f'));
      return links.map(link => link.innerText);
    });

    console.log(data)  
    await browser.close();
    return res.status(200).json({ socials: socialMediaLinks, fbLikes: data[0] });

  } catch (error) {
    console.error(error);
  }

  res.status(200).json({ name: 'John Doe' })
}


