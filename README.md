# Track-A Portfolio Application 🚀

This is a full-stack Portfolio Management Application. The application allows users to view profile information, skills, and projects, while authenticated users (admin) can create, update, and delete data.
To login as admis use login username: zuheer123
---

## 🔗 Live Application

Frontend URL: https://your-frontend-url.netlify.app  
Backend API URL: https://your-backend-url.onrender.com  

---

##  Application Architecture

Frontend (HTML, CSS, JavaScript)  
        ↓  
REST API (JSON)  
        ↓  
Backend (FastAPI)  
        ↓  
Database (SQLite)

---

## 🛠️ Tech Stack

Frontend:
- HTML5
- CSS3
- JavaScript

Backend:
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

Deployment:
- Netlify (Frontend)
- Render (Backend)

---

## ⚙️ Local Setup Instructions

Backend Setup:
1. Clone the backend repository
2. Install dependencies using requirements.txt
3. Run the FastAPI server using (uvicorn main:app --reload) 

Backend runs at:  
http://127.0.0.1:8000

Frontend Setup:
1. Clone the frontend repository
2. Open index.html in a browser

---

## Authentication

Admin login is required to add, update, or delete profile data, skills, and projects. Authentication is handled on the frontend using sessionStorage.

---

## API Endpoints (Sample)

GET /profile  
POST /profile  
GET /skills  
POST /skills  
DELETE /skills/{id}  
GET /projects  
POST /projects  
DELETE /projects/{id}  

APIs can be tested using Postman or directly from the browser.

---

## 📄 Documentation & Testing

The backend exposes RESTful APIs following standard HTTP methods. JSON is used for request and response formats. CORS is enabled to allow communication between the deployed frontend and backend.

---

## ⚠️ Known Limitations

- Basic authentication without password hashing
- Single admin user support
- SQLite database used instead of a cloud database
- No role-based access control

---

## 📎 Resume

Resume Link:  
https://your-resume-link.com

---

## 👤 Author

Mohammad Zuheer  

