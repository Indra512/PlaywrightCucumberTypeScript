const fs = require('fs');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// Influx Config
//const url = process.env.INFLUXDB_URL;
//const token = process.env.INFLUXDB_TOKEN;
//const org = process.env.INFLUXDB_ORG;
//const bucket = process.env.INFLUXDB_BUCKET;

const url = http://localhost:8086/orgs/2b57ae60bc5045c8;
const token = n3EQDWpJAplsOEY7kq34rTbU-w8Th61daSxKjkZGLiaADmsTcqXhvtZpItRLajikKT9s1pchxcrv-0KGHlbNjA==;
const org = my-org;
const bucket = playwright_metrics;

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
