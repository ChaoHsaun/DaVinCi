const axios = require('axios');
const cheerio = require('cheerio');

async function fetchEarthquakeInfo() {
  try {
    const response = await axios.get('https://www.cwb.gov.tw/V8/C/E/Q/EQ.html');
    const html = response.data;
    const $ = cheerio.load(html);

    // 解析HTML資料，獲取地震相關資訊
    const earthquakeInfo = [];
    $('table[class="BoxTable"]').each((index, element) => {
      const location = $(element).find('td').eq(0).text();
      const magnitude = $(element).find('td').eq(1).text();
      const time = $(element).find('td').eq(2).text();
      earthquakeInfo.push({ location, magnitude, time });
    });

    return earthquakeInfo;
  } catch (error) {
    console.error('Error fetching earthquake information:', error);
    return null;
  }
}

module.exports = { fetchEarthquakeInfo };
