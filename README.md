# Educase-backend-School-Api
# 🏫 School Management API (Node.js + MySQL)

RESTful API to manage schools, allowing users to add schools and fetch a list sorted by distance from a user’s location.

---

## 🚀 Tech Stack
- Node.js + Express
- MySQL (mysql2)
- dotenv

---

## 📦 Setup

```bash
git clone https://github.com/Rajnish1947/Educase-backend-School-Api.git
cd server
npm install
Create .env file:

env
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb
🧱 MySQL Table
sql
Copy
Edit
CREATE DATABASE schooldb;
USE schooldb;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);
▶️ Run
bash
Copy
Edit
npm start
Server: http://localhost:5000

📬 API Endpoints
POST /addSchool
Add a new school
Body:

json
Copy
Edit
{
  "name": "ABC School",
  "address": "Street 1",
  "latitude": 12.9716,
  "longitude": 77.5946
}
GET /listSchools?latitude=12.97&longitude=77.59
List schools sorted by distance





