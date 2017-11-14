const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let jan;

  beforeEach((done) => {
    jan = new User({ name: 'Jan' });
    jan.save()
      .then(() => done());
  });

  it('finds all users with a name of Jan', (done) => {
    User.find({ name: 'Jan' })
      .then((users) => {
        assert(users[0]._id.toString() === jan._id.toString());
        done();
      });
  });

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: jan._id })
      .then((user) => {
        assert(user.name === 'Jan');
        done();
      });
  });
});
