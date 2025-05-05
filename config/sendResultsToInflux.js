const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const fs = require('fs');

const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;
const url = process.env.INFLUXDB_URL;

const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket);
writeApi.useDefaultTags({ host: 'github_actions_runner' });

const data = JSON.parse(fs.readFileSync('results.json', 'utf8'));

data.suites?.forEach(suite => {
  suite.specs.forEach(spec => {
    spec.tests.forEach(test => {
      const duration = test.results[0]?.duration ?? 0;
      const status = test.results[0]?.status ?? 'unknown';

      const point = new Point('playwright_test')
        .tag('test_name', spec.title)
        .tag('status', status)
        .intField('duration_ms', duration);

      writeApi.writePoint(point);
    });
  });
});

writeApi
  .close()
  .then(() => console.log('✅ Test results pushed to InfluxDB'))
  .catch(err => console.error('❌ Error pushing results:', err));
