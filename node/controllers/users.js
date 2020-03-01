const usersSchema = require('../lib/schema/users');

const getAllUsers = async () => {
    return (await (usersSchema.find()));
}

const getUser = async (userObj) => {
    return (await (usersSchema.findOne(userObj)));
}

const createUser = async (userObj) => {
    return (await (usersSchema.create(userObj)))
}

const deleteUser = async (userObj) => {
    return (await (usersSchema.deleteOne(userObj)))
}

module.exports = {
    getUser,
    createUser,
    deleteUser,
    getAllUsers
}