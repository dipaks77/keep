const express = require('express');
const {
  get, deleteOne, update, addMultiple
} = require('../controllers/index');

const router = express.Router();

router.get('/:id',async (req, res, next) => {
  try {
    const result = await get({_id: req.params.id});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).statusMessage(e.message);
  }
});

router.post('/',async (req, res, next) => {
  try {
    const result = await addMultiple(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).statusMessage(e.message);
  }
});

router.put('/:id',async (req, res, next) => {
  try {
    const result = await update({
      _id: req.params.id,
      ...req.body
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).statusMessage(e.message);
  }
});

router.delete('/:id',async (req, res, next) => {
  try {
    const result = await deleteOne({_id: req.params.id});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).statusMessage(e.message);
  }
});

module.exports = router;
