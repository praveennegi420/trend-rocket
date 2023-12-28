const puppeteer = require('puppeteer');
const axios = require('axios');

export default async function handler(req, res) {
  const targetUrl = req.query.brand;
  // const apiKey = process.env.API_KEY;
  try {
    const browser = await puppeteer.launch(`headless:true`);
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
    await browser.close();
    
    return res.status(200).json({ data: socialMediaLinks });
    // const response = await axios.get(
    //   `https://api.similarweb.com/v1/website/${targetUrl}/total-traffic-and-engagement/visits?api_key=${apiKey}&country=world&granularity=monthly`
    // );

    // // Print the response data
    // console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
  res.status(200).json({ name: 'John Doe' })
}
