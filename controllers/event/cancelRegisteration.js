const pool = require('../../db');

const cancelRegistration = async (req, res) => {
  const eventId = req.params.id;
  const { user_id } = req.body;

  try {
  
    const regQuery = `
      SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2
    `;
    const regResult = await pool.query(regQuery, [user_id, eventId]);

    if (regResult.rows.length === 0) {
      return res.status(400).json({ error: 'User is not registered for this event' });
    }

   
    const deleteQuery = `
      DELETE FROM registrations WHERE user_id = $1 AND event_id = $2
    `;
    await pool.query(deleteQuery, [user_id, eventId]);

    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = cancelRegistration;
