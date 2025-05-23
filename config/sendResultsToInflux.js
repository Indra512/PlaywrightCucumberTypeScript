const fs = require('fs');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

//Influx Config
const url = process.env.INFLUXDB_URL;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;

//const url = "http://localhost:8086";
//const token = "moOIm_nUYMZHuxxtI8z7pIjkuCj3xCkKda7JSSvvbtwKoJlaucMH0uHbCbC_bjXNGiQ6B5HfHyhtFZkNRqrcqg==";
//const org = "teknotrait";
//const bucket = "automations-results";

// Read JSON report
const rawData = fs.readFileSync('test-results/cucumber-report.json');
const report = JSON.parse(rawData);

// Parse results
const total = report.length;
const passed = report.filter(t => t.elements.every(e => e.steps.every(s => s.result.status === 'passed'))).length;
const failed = report.filter(t => t.elements.some(e => e.steps.some(s => s.result.status === 'failed'))).length;
const skipped = report.filter(t => t.elements.some(e => e.steps.some(s => s.result.status === 'skipped'))).length;

// Influx Connection
const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket);

//console.log(Pushing to InfluxDB: total=${total}, passed=${passed}, failed=${failed}, skipped=${skipped});

writeApi.useDefaultTags({ host: 'host1' })

const point = new Point('test_results')
  .intField('total', total)
  .intField('passed', passed)
  .intField('failed', failed)
  .intField('skipped', skipped)
  .timestamp(new Date());

writeApi.writePoint(point);
writeApi.close().then(() => {
  console.log('Test data pushed to InfluxDB ✅');
}).catch(e => {
  console.error(e);
});
