const notesSchema = require('../lib/schema/notes');

const get = async (notesObj) => {
    return (await (notesSchema.find(notesObj)));
}

const addMultiple = async (notesObj) => {
    return (await (notesSchema.insertMany(notesObj, { ordered: false })))
}

const update = async (notesObj) => {
    return (await (notesSchema.updateOne(notesObj)));
}

const deleteOne = async (notesObj) => {
    return (await (notesSchema.deleteOne(notesObj)))
}

module.exports = {
    get,
    addMultiple,
    update,
    deleteOne
}