const pool = require('../../db');
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

module.exports = getEventDetails;


