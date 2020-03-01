const notesSchema = require('../lib/schema/notes');

const getNotes = async (notesObj) => {
    return (await (notesSchema.find(notesObj)));
}

const createNote = async (notesObj) => {
    return (await (notesSchema.create(notesObj)));
}

const updateNote = async (condition, data) => {
    return (await (notesSchema.findOneAndUpdate(condition, { $set: data })));
}

const deleteNote = async (notesObj) => {
    return (await (notesSchema.deleteOne(notesObj)));
}

module.exports = {
    getNotes,
    updateNote,
    deleteNote,
    createNote
}