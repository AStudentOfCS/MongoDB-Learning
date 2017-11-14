const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let jan;

  beforeEach((done) => {
    jan = new User({ name: 'Jan', likes: 0 });
    jan.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Joe');
        done();
      });
  };

  // Model Instance
  it('instance type using set & save', (done) => {
    jan.set('name', 'Joe');
    assertName(jan.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(jan.update({ name: 'Joe' }), done);
  });

  // Model Class
  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Jan' }, { name: 'Joe' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Jan'}, { name: 'Joe' }),
      done
    );
  });

  it('A model class can find a record with Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(jan._id, { name: 'Joe'} ),
      done
    );
  });

  it('A user can have their likes incremented by 1', (done) => {
    User.update({ name: 'Jan' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Jan' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
