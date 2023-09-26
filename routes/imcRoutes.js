const express = require('express');
const router = express.Router();
const ImcController = require('../controllers/ImcController');

router.get('/', ImcController.getImcUser);

router.post('/', ImcController.insertImcUser);

module.exports = router;
