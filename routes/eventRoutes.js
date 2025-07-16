const express = require('express');
const router = express.Router();
const createEvent = require('../controllers/event/createEvent');
const getEventDetails = require('../controllers/event/getEventDetails');
const registerForEvent = require('../controllers/event/registerForEvent');
const cancelRegistration = require('../controllers/event/cancelRegisteration');
const listUpcomingEvents = require('../controllers/event/listUpcomingEvents');
 router.post('/',createEvent);
 router.get('/:id', getEventDetails);
 router.post('/:id/register', registerForEvent);
router.delete('/:id/cancel', cancelRegistration);
router.get('/upcoming', listUpcomingEvents);

 module.exports = router;