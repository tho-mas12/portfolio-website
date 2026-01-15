# Hostel Student Leave Management System

## Folder Structure
```
leave_takes/
├── app.py
├── templates/
│   ├── admin_login.html
│   ├── admin_dashboard.html
│   ├── student_login.html
│   ├── leave_application.html
│   └── layout.html
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── scripts.js
└── database.db
```

## Database Schema
```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    register_number TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE leaves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    reason TEXT NOT NULL,
    out_date DATE NOT NULL,
    return_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students (id)
);

CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
```

## Sample Credentials
- **Admin**: 
  - Username: admin
  - Password: admin123

- **Student**: 
  - Name: John Doe
  - Register Number: 123456
  - Department: Computer Science
  - Password: student123
