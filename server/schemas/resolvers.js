const { Book, User } = require('../models');
import { sign } from 'jsonwebtoken';
import { signToken, AuthenticationError } from '../utils/auth';

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
      const token = signToken(newUser);
      return {newUser, token};
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
        return deleteUser
    },
    login: async (parent, {username, email} ) => {
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        const token = signToken(user)
        return {user, token}
       
    }
  },
};

module.exports = resolvers;
