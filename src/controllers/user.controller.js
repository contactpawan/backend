import { HTTP_CODES } from "../lib/constants.js";
import { validateInputs } from "../lib/utils.js";
import UserModel from "../models/UserModel.js"

export const addUser = async (userData) => {
    try{
        const inputValidated = validateInputs(userData);
        if(inputValidated) {
            const userModal = new UserModel();
            return await userModal.addUserData(userData);
        } else {
            return HTTP_CODES.BAD_REQUEST;
        }
    } catch(err) {
        return HTTP_CODES.INTERNAL_SERVER_ERROR;
    }
}

export const deleteUser = async (_id) => {
    try{
        if(_id){
            const userModal = new UserModel();
            const response = await userModal.deleteUserData(_id);
            if(response) {
                return HTTP_CODES.SUCCESS
            } else {
                return HTTP_CODES.NOT_FOUND
            }
        } else {
            return HTTP_CODES.BAD_REQUEST;
        }
    } catch(err) {
        return HTTP_CODES.INTERNAL_SERVER_ERROR;
    }
}

export const getUsers = async () => {
    try{
        const userModal = new UserModel();
        const users = await userModal.getAllUsers();
        if(users) {
            return users;
        } else {
            HTTP_CODES.INTERNAL_SERVER_ERROR;
        }
    } catch(err) {
        return HTTP_CODES.INTERNAL_SERVER_ERROR;
    }
}