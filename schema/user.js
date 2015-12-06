import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  repos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const User = mongoose.model('User', UserSchema);

export default User;
