 Event Management API
This is a backend API I built using Node.js, Express, and PostgreSQL to handle event creation, user registrations, cancellations, and stats tracking. 
How to Run It Locally
1. Clone the repo
git clone https://github.com/your-username/event-management-api.git
cd event-management-api
2. npm install
3. Set up PostgreSQL
4. Create a .env file
5. Run the server
6. API Features
7. Create an Event
 POST /api/events
 Request:
{
  "title": "Tech Fest",
  "date_time": "2025-08-01T00:00:000",
  "location": "Bhopal",
  "capacity": 200
}
Response:
{ "event_id": 1 }

8. Get Event Details
GET /api/events/:id
Response:
{
  "id": 1,
  "title": "Tech Fest",
  "date_time": "2025-08-01T00:00:000",
  "location": "/bhopal",
  "capacity": 200,
  "registered_users": [
    {
      "id": 1,
      "name": "Mrunal",
      "email": "Abc@example.com"
    }
  ]
}

9.  Register for Event
POST /api/events/:id/register
Request:
{ "user_id": 1 }
Response:
{ "message": "User registered successfully" }
10. Cancel Registration
DELETE /api/events/:id/cancel
Request 
{ "user_id": 1 }
Response:
{ "message": "Registration cancelled successfully" }
11.  List Upcoming Events
Response:
{
  "title": "Tech Fest",
  "date_time": "2025-08-01T00:00:000",
  "location": "Bhopal",
  "capacity": 200
}

GET /api/events/upcoming
12. Get Event Stats
GET /api/events/:id/stats
Response 
{
  "total_registrations": 45,
  "remaining_capacity": 155,
  "percentage_used": "22.50%"
}
