const fs = require('fs');
try {
  require('./index.js');
} catch (e) {
  fs.writeFileSync('crash.txt', e.message);
}
