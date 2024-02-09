const { Book, User } = require('../models');

const resolvers = {
  Query: {
    User: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const newUser = await User.create(args);
      return newUser;
    },
    saveBook: async (parent, { _id, body}) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: _id },
            { $addToSet: { savedBooks: body } },
            { new: true, runValidators: true }
          );
      return updatedUser;
    },
    deleteBook: async (parent, {_id, bookId} ) => {
        const deleteUser = await User.findOneAndUpdate(
            { _id: _id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
    },
    login: async (parent, {_id, bookId} ) => {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
       
    }
  },
};

module.exports = resolvers;
