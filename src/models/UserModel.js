import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid';
import { config } from '../lib/config.js';

export default class UserModel {
    constructor(name, connection) {}

    async addUserData(userData) {
        const url = config.MONGO_SETTINGS.URL;
        const client = new MongoClient(url);
        try {
            client.connect();
            const dbObject = client.db(config.MONGO_SETTINGS.DB_NAME);
            const collection = dbObject.collection(config.MONGO_SETTINGS.USER_COLLECTION);
            await collection.insertOne({_id: uuidv4(), firstname: userData.firstname, lastname: userData.lastname, uemail: userData.uemail });
            return true;
        } catch(e) {
            return false;
        }
    }

    async deleteUserData(_id) {
        const url = config.MONGO_SETTINGS.URL;
        const client = new MongoClient(url);
        try {
            client.connect();
            const dbObject = client.db(config.MONGO_SETTINGS.DB_NAME);
            const collection = dbObject.collection(config.MONGO_SETTINGS.USER_COLLECTION);
            const response = await collection.deleteOne({_id});
            if(response.deletedCount) {
                return true;
            } else {
                return false;
            }
        } catch(e) {
            return false;
        }
    }

    async getAllUsers() {
        const url = config.MONGO_SETTINGS.URL;
        const client = new MongoClient(url);
        try {
            client.connect();
            const dbObject = client.db(config.MONGO_SETTINGS.DB_NAME);
            const collection = dbObject.collection(config.MONGO_SETTINGS.USER_COLLECTION);
            return await collection.find({}).toArray();
        } catch(e) {
            return false;
        }
    }
}