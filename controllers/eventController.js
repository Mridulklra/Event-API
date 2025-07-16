const pool = require('../db');


const createEvent = async (req, res) => {
  try {
    const { title, date_time, location, capacity } = req.body;

  
    if (!title || !date_time || !location || !capacity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (capacity <= 0 || capacity > 1000) {
      return res.status(400).json({ error: 'Capacity must be between 1 and 1000' });
    }

    const insertQuery = `
      INSERT INTO events (title, date_time, location, capacity)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [title, date_time, location, capacity];

    const result = await pool.query(insertQuery, values);

    res.status(201).json({ eventId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getEventDetails = async (req, res) => {
  const eventId = req.params.id;

  try {
   const eventQuery = `
      SELECT * FROM events WHERE id = $1
    `;
    const eventResult = await pool.query(eventQuery, [eventId]);

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = eventResult.rows[0];

  
    const userQuery = `
      SELECT u.id, u.name, u.email
      FROM users u
      JOIN registrations r ON u.id = r.user_id
      WHERE r.event_id = $1
    `;
    const userResult = await pool.query(userQuery, [eventId]);

    event.registered_users = userResult.rows;

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createEvent,
  getEventDetails
};

