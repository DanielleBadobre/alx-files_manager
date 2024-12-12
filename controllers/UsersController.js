import { ObjectID } from 'mongodb';

const dbClient = require('../utils/db');
const sha1 = require('sha1');
const redisClient = require('../utils/redis');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }
    
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }


    const userExists = await dbClient.db.collection('users').findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedpasswd = sha1(password);
    const result = await dbClient.db.collection('users').insertOne({ email, password: hashedpasswd });

    const user = { _id: result.insertedId, email };
    return res.status(201).json(user);
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const userId = await redisClient.get(`auth_${token}`);
    const idObject = new ObjectID(userId);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await dbClient.db.collection('users').findOne({ _id: idObject });

    return res.status(200).json({ id: userId, email: user.email });
  }
}

module.exports = UsersController;