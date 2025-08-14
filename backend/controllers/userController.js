import User from '../models/User.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } })
      .select('_id fullName email profilePic createdAt');
    res.json(users);
  } catch (err) { next(err); }
};