const pool = require('../../db');

const listUpcomingEvents = async (req, res) => {
  try {
    const now = new Date().toISOString();

    const query = `
      SELECT * FROM events
      WHERE date_time > $1
      ORDER BY date_time ASC, location ASC
    `;

    const result = await pool.query(query, [now]);

    res.status(200).json({
      upcoming_events: result.rows
    });
  } catch (err) {
    console.error('Error listing upcoming events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = listUpcomingEvents;
