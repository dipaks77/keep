const express = require('express');
const {
  getNotes, deleteNote, updateNote, createNote
} = require('../controllers/notes');

const {
  getUser,
  createUser,
  deleteUser,
  getAllUsers
} = require('../controllers/users');

const router = express.Router();

router.get('/user', async (req, res, next) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error, status: '500' });
  }
});

router.post('/user', async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    var response = {
      status: 'success',
      data: result
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error, status: 500, data: req.body });
  }
});

router.post('/user/login', async (req, res, next) => {
  try {
    const result = await getUser(req.body);
    var response = {};
    if (result) {
      response = {
        status: 'success',
        data: result
      };
    } else {
      response.status = 'failed';
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/user/:id', async (req, res, next) => {
  try {
    const result = await deleteUser({ _id: req.params.id });
    var response = {
      status: 'success',
      data: result
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error, status: '500' });
  }
});

router.get('/note/:email', async (req, res, next) => {
  try {
    const result = await getNotes(req.params);
    var response = {
      status: 'success',
      data: result
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error, status: '500' });
  }
});

router.post('/note', async (req, res, next) => {
  try {
    const result = await createNote(req.body);
    var response = {
      status: 'success',
      data: result
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error, status: '2', data: req.body });
  }
});

router.put('/note/:id', async (req, res, next) => {
  try {
    const result = await updateNote({
      _id: req.params.id
    }, req.body);
    var response = {
      status: 'success',
      data: result
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error, status: '500' });
  }
});

router.delete('/note/:id', async (req, res, next) => {
  try {
    const result = await deleteNote({ _id: req.params.id });
    var response = {
      status: 'success',
      data: result
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error, status: '500' });
  }
});

module.exports = router;
