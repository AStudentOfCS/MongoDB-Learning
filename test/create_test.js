const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const jan = new User({ name: 'Jan' });

    jan.save()
      .then(() => {
        // Is saved successfully?
        assert(!jan.isNew);
        done();
      });
  });
});
