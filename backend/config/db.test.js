const { testAndSync } = require('./db');

(async () => {
  try {
    await testAndSync({ force: false });
    console.log('DB test OK');
    process.exit(0);
  } catch (e) {
    console.error('DB test FAILED', e.message || e);
    process.exit(1);
  }
})();