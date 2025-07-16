const pool = require('../../db');

const getEventStats = async (req, res) => {
  const eventId = req.params.id;

  try {
    
    const eventQuery = `SELECT capacity FROM events WHERE id = $1`;
    const eventResult = await pool.query(eventQuery, [eventId]);

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const capacity = eventResult.rows[0].capacity;

    const regQuery = `SELECT COUNT(*) FROM registrations WHERE event_id = $1`;
    const regResult = await pool.query(regQuery, [eventId]);
    const totalRegistrations = parseInt(regResult.rows[0].count);

    const remainingCapacity = capacity - totalRegistrations;
    const percentageUsed = ((totalRegistrations / capacity) * 100).toFixed(2);

    res.status(200).json({
      total_registrations: totalRegistrations,
      remaining_capacity: remainingCapacity,
      percentage_used: `${percentageUsed}%`
    });
  } catch (err) {
    console.error('Error getting stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getEventStats;
