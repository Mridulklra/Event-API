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

module.exports = { createEvent };
