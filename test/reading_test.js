const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let jan, maria, alex, jack;

  beforeEach((done) => {
    jan = new User({ name: 'Jan' });
    maria = new User({ name: 'Maria' });
    alex = new User({ name: 'Alex' });
    zack = new User({ name: 'Zack' });

    Promise.all([jan.save(), maria.save(), alex.save(), zack.save()])
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

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Jan');
        assert(users[1].name === 'Maria');
        done();
      })
  });
});
