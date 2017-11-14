const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let jan;

  beforeEach((done) => {
    jan = new User({ name: 'Jan' });
    jan.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    jan.remove()
      .then(() => User.findOne({ name: 'Jan' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Remove a bunch of records with some given criteria
    User.remove({ name: 'Jan' })
      .then(() => User.findOne({ name: 'Jan'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Jan' })
      .then(() => User.findOne({ name: 'Jan' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(jan._id)
      .then(() => User.findOne({ name: 'Jan' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
