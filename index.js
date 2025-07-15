const express = require('express');
const app = express();
const pool = require('./db');
const eventRoutes = require('./routes/eventRoutes');
app.use(express.json());
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Event Management API is live ');
});

app.use('/api/events',eventRoutes);
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('DB connected at:', result.rows[0].now);
  }
});
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})