const axios = require('axios'); 
const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('./test-results/cucumber-report.json')); 
const testResults = data.suites.flatMap(suite => suite.specs.flatMap(spec => spec.tests)); 
const lines = testResults.map(test => { 
return `playwright_tests,name=${test.title.replace(/ /g, "_")} 
status="${test.results[0].status}",duration=${test.results[0].duration}`; 
}).join('\n'); 
axios.post('http://localhost:8086/api/v2/write?org=YourOrg&bucket=test_metrics&precis
 ion=ms', lines, { 
headers: { 
'Authorization': 'n3EQDWpJAplsOEY7kq34rTbU-w8Th61daSxKjkZGLiaADmsTcqXhvtZpItRLajikKT9s1pchxcrv-0KGHlbNjA==', 
'Content-Type': 'text/plain' 
} 
}) 
.then(() => console.log('Test data sent to InfluxDB')) 
.catch(err => console.error(err)); 
