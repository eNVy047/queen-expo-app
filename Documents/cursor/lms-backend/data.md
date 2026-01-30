# 📚 API Routes Documentation

**Base URL**: `http://localhost:8000/api/v1`

---

## 🔐 Authentication

# Register User

```
http://localhost:8000/api/v1/user/register
```

### 📦 Request Body (JSON)

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "role": "USER",
  "password": "StrongPassword@123",
  "address": "123 Main Street, New Delhi, India",
  "phone": {
    "code": "+91",
    "number": "9876543210"
  }
}
```

# Login User

```
http://localhost:8000/api/v1/user/login
```

### 📦 Request Body (JSON)

```json
{
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "StrongPassword@123"
}
```

# Logout User

```
http://localhost:8000/api/v1/user/logout
```

---

## 🏫 Institution & Setup

# Create Institution

```
http://localhost:8000/api/v1/lms/institution
```

### 📦 Request Body (JSON)

```json
{
  "name": "Delhi Public School",
  "affiliationNumber": "CBSE123456",
  "email": "admin@dps.com",
  "domain": "dps.edu.in",
  "phoneNumber": "9876543210",
  "address": "Mathura Road, New Delhi",
  "institutionType": "School",
  "logo": "https://cloudinary.com/url-to-logo.png"
}
```

# Step 1: Register University Address

```
http://localhost:8000/api/v1/lms/institution-setup/register-address
```

### 📦 Request Body (JSON)

```json
{
  "universityName": "Delhi University",
  "addressLine1": "North Campus",
  "city": "Delhi",
  "pincode": "110007",
  "country": "India"
}
```

# Step 2: Contact Verification

```
http://localhost:8000/api/v1/lms/institution-setup/verify-contact
```

### 📦 Request Body (JSON)

```json
{
    "email": "admin@univ.edu",
    "phone": "9999999999"
}
```

# Create Branch

```
http://localhost:8000/api/v1/lms/branch
```

### 📦 Request Body (JSON)

```json
{
  "name": "Science Block",
  "institution": "65b8c9d8123abc456def7890",
  "address": "Wing A, North Campus",
  "contactNumber": "011-23456789"
}
```

---

## 👥 User Profiles

# Create Student Profile

```
http://localhost:8000/api/v1/lms/student
```

### 📦 Request Body (JSON)

```json
{
  "userId": "65b8c9d8123abc456def7890",
  "institution": "65b8c9d8123abc456def7891",
  "enrollmentNumber": "2024001",
  "rollNumber": "101",
  "department": "Computer Science",
  "batch": "2024-2028",
  "currentSemester": 1,
  "section": "A",
  "guardianName": "Jane Doe",
  "guardianPhone": "9876543211"
}
```

# Create Teacher Profile

```
http://localhost:8000/api/v1/lms/teacher
```

### 📦 Request Body (JSON)

```json
{
  "userId": "65b8c9d8123abc456def7892",
  "institution": "65b8c9d8123abc456def7891",
  "employeeId": "TCH-001",
  "department": "Physics",
  "designation": "Assistant Professor",
  "qualifications": ["PhD", "MSc"],
  "experience": 5,
  "specializations": ["Quantum Physics", "Optics"]
}
```

---

## 📚 Academic

# Create Course

```
http://localhost:8000/api/v1/lms/courses
```

### 📦 Request Body (JSON)

```json
{
  "title": "Introduction to Computer Science",
  "code": "CS101",
  "description": "Basic concepts of programming",
  "credits": 4,
  "department": "Computer Science",
  "semester": 1,
  "institution": "65b8c9d8123abc456def7891"
}
```

# Create Subject

```
http://localhost:8000/api/v1/lms/subjects
```

### 📦 Request Body (JSON)

```json
{
  "name": "Data Structures",
  "code": "CS201",
  "course": "65b8c9d8123abc456def7893",
  "semester": 2,
  "credits": 3,
  "description": "Study of arrays, lists, trees",
  "institution": "65b8c9d8123abc456def7891"
}
```

# Enroll Student in Course

```
http://localhost:8000/api/v1/lms/enrolled-courses
```

### 📦 Request Body (JSON)

```json
{
  "student": "65b8c9d8123abc456def7894",
  "course": "65b8c9d8123abc456def7893",
  "semester": 1,
  "academicYear": "2024-2025"
}
```

---

## 📝 Content & Assessment

# Create Assignment

```
http://localhost:8000/api/v1/lms/assignment
```

### 📦 Request Body (JSON)

```json
{
  "title": "Recursion Practice",
  "content": "Solve the attached problems using recursion.",
  "subject": "65b8c9d8123abc456def7895",
  "course": "65b8c9d8123abc456def7893",
  "dueDate": "2024-02-15T23:59:00.000Z",
  "totalMarks": 20
}
```

# Submit Assignment

```
http://localhost:8000/api/v1/lms/submitted-assignment
```

### 📦 Request Body (JSON)

```json
{
  "assignment": "65b8c9d8123abc456def7896",
  "content": "Here is my submission...",
  "document": {
      "url": "https://cloudinary.com/my-homework.pdf",
      "localPath": "/tmp/my-homework.pdf"
  }
}
```

# Create Quiz

```
http://localhost:8000/api/v1/lms/quizz
```

### 📦 Request Body (JSON)

```json
{
  "title": "Logic Gates Quiz",
  "subject": "65b8c9d8123abc456def7895",
  "questions": [
    {
      "question": "What is the output of AND gate if inputs are 1 and 0?",
      "options": ["0", "1", "High", "Low"],
      "correctOption": 0,
      "marks": 1
    }
  ],
  "duration": 30,
  "totalMarks": 10
}
```

# Record Result

```
http://localhost:8000/api/v1/lms/result
```

### 📦 Request Body (JSON)

```json
{
  "student": "65b8c9d8123abc456def7894",
  "examType": "Mid-Term",
  "subject": "65b8c9d8123abc456def7895",
  "marksObtained": 45,
  "totalMarks": 50
}
```

---

## 📢 Operations

# Create Announcement

```
http://localhost:8000/api/v1/lms/announcement
```

### 📦 Request Body (JSON)

```json
{
  "title": "Holiday Notice",
  "content": "School will remain closed on Friday.",
  "type": "General",
  "targetAudience": ["Student", "Teacher"],
  "institution": "65b8c9d8123abc456def7891"
}
```

# Create Event

```
http://localhost:8000/api/v1/lms/event
```

### 📦 Request Body (JSON)

```json
{
  "title": "Annual Sports Day",
  "description": "Join us for track and field events.",
  "startDate": "2024-03-10T09:00:00.000Z",
  "endDate": "2024-03-10T17:00:00.000Z",
  "location": "Main Ground",
  "organizer": "Sports Department"
}
```

# Pay Fees

```
http://localhost:8000/api/v1/lms/fees
```

### 📦 Request Body (JSON)

```json
{
  "student": "65b8c9d8123abc456def7894",
  "amount": 50000,
  "currency": "INR",
  "type": "Tuition",
  "dueDate": "2024-04-01T23:59:00.000Z",
  "paymentMethod": "RAZORPAY",
  "transactionId": "pay_1234567890"
}
```
