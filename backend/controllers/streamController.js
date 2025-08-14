import { StreamClient } from '@stream-io/node-sdk';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

export const getStreamToken = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("Authenticated user ID:", userId);

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No user ID in request' });
    }

    const user = await User.findById(userId).select('_id fullName profilePic');
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
    }

    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Stream credentials missing' });
    }

    console.log('API Key from env:', apiKey);
    console.log('API Secret from env:', apiSecret ? 'Loaded' : 'Missing');

    // Use positional params — this matches latest SDK
    const serverClient = new StreamClient(apiKey, apiSecret);

    const token = serverClient.createToken(user._id.toString());

    res.json({
      token,
      apiKey,
      user: {
        id: user._id,
        name: user.fullName,
        image: user.profilePic
      }
    });
  } catch (err) {
    console.error('Stream token error:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: err.message });
  }
};
