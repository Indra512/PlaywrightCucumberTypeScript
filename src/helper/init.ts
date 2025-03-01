const fse = require('fs-extra');

try {
    fse.ensureDir("test-results");
    fse.emptyDir("test-results");
} catch(err) {
    console.error("Not created folder called test-results", err);
}