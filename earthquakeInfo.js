const axios = require('axios');
const cheerio = require('cheerio');

async function fetchEarthquakeInfo() {
  try {
    const response = await axios.get('https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=CWA-E7806F72-E26F-4236-8250-055D6048C4C3&limit=30&format=JSON&AreaName=%E8%87%BA%E5%8D%97%E5%B8%82');
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
