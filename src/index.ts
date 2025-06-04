import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/User';
import * as Config from './Config';
const app = express();

mongoose.connect(Config.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/users/:id', async (req: any, res: any) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findOne({ _id: id, age: { $gt: 21 } });

    if (!user) {
      return res.status(404).json({ error: 'No user found' });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(Config.PORT, () => {
  console.log(`Server is running on port ${Config.PORT}`);
});