const express = require('express');
const router = express.Router();
const {createEvent} = require('../controllers/eventController');
const {getEventDetails} = require('../controllers/eventController');
 router.post('/',createEvent);
 router.get('/:id', getEventDetails);
 module.exports = router;