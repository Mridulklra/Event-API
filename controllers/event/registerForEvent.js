const pool = require('../../db');
const registerForEvent = async (req, res) => {
  const eventId = req.params.id;
  const { user_id } = req.body;

  try {
  
    const eventQuery = `SELECT * FROM events WHERE id = $1`;
    const eventResult = await pool.query(eventQuery, [eventId]);

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = eventResult.rows[0];

 
    const now = new Date();
    if (new Date(event.date_time) < now) {
      return res.status(400).json({ error: 'Cannot register for a past event' });
    }

   
    const regCheckQuery = `
      SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2
    `;
    const regCheck = await pool.query(regCheckQuery, [user_id, eventId]);

    if (regCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already registered for this event' });
    }

  
    const countQuery = `
      SELECT COUNT(*) FROM registrations WHERE event_id = $1
    `;
    const countResult = await pool.query(countQuery, [eventId]);
    const totalRegistered = parseInt(countResult.rows[0].count);

    if (totalRegistered >= event.capacity) {
      return res.status(400).json({ error: 'Event is full' });
    }

   
    const insertQuery = `
      INSERT INTO registrations (user_id, event_id)
      VALUES ($1, $2)
    `;
    await pool.query(insertQuery, [user_id, eventId]);

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = registerForEvent;