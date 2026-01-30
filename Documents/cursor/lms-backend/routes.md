# 📚 API Routes Documentation

**Base URL**: `http://localhost:8000/api/v1`

> **Note**: All routes except Authentication require a valid JWT Access Token in the `Authorization` header (`Bearer <token>`) or `accessToken` cookie.

---

## 🔐 Authentication & User
**Base Path**: `/auth`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login user |
| `POST` | `/logout` | Logout user |
| `POST` | `/refresh-token` | Refresh access token |
| `POST` | `/change-password` | Change current password |
| `GET` | `/current-user` | Get logged-in user details |
| `PATCH` | `/update-account` | Update account details |
| `PATCH` | `/avatar` | Update user avatar |
| `POST` | `/forgot-password` | Request password reset |
| `POST` | `/reset-password/:resetToken` | Reset password |

---

## 🎓 LMS Module
**Base Path**: `/lms`

### 🏫 Institution & Setup

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/institution` | Create a new Institution (University/School) |
| `GET` | `/institution` | Get all institutions |
| `GET` | `/institution/:id` | Get institution by ID |
| `PATCH` | `/institution/:id` | Update institution details |
| `DELETE` | `/institution/:id` | Delete institution |
| `POST` | `/institution-setup` | Save setup details (Certificates, Bank Info) |
| `GET` | `/institution-setup/:institutionId` | Get setup details for an institution |
| `PATCH` | `/institution-setup/:id` | Update setup details |
| `POST` | `/branch` | Create a new Branch |
| `GET` | `/branch` | Get all branches |
| `GET` | `/branch/:id` | Get branch by ID |

### 👥 Students & Teachers

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/student` | Create Student Profile |
| `GET` | `/student` | Get all students |
| `GET` | `/student/profile` | Get **current** logged-in student profile |
| `GET` | `/student/:id` | Get student profile by ID |
| `PATCH` | `/student/:id` | Update student profile |
| `POST` | `/teacher` | Create Teacher Profile |
| `GET` | `/teacher` | Get all teachers |
| `GET` | `/teacher/profile` | Get **current** logged-in teacher profile |
| `GET` | `/teacher/:id` | Get teacher profile by ID |
| `PATCH` | `/teacher/:id` | Update teacher profile |

### 📚 Academic Structure

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/courses` | Create a new Course |
| `GET` | `/courses` | Get all courses |
| `GET` | `/courses/:id` | Get course by ID |
| `PATCH` | `/courses/:id` | Update course |
| `DELETE` | `/courses/:id` | Delete course |
| `POST` | `/subjects` | Create a new Subject |
| `GET` | `/subjects` | Get subjects (supports filters) |
| `GET` | `/subjects/:id` | Get subject by ID |
| `POST` | `/enrolled-courses` | Enroll a user in a course |
| `GET` | `/enrolled-courses/user/:userId?` | Get enrollments for user (defaults to self) |
| `DELETE` | `/enrolled-courses/:id` | Remove enrollment |

### 📝 Content & Assessment

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/assignment` | Create an Assignment |
| `GET` | `/assignment` | Get all assignments |
| `POST` | `/assignment/submit` | **Submit** an assignment (Student) |
| `GET` | `/assignment/:id` | Get assignment details |
| `POST` | `/notes` | Upload Notes |
| `GET` | `/notes` | Get notes |
| `POST` | `/video` | Upload Video |
| `GET` | `/video` | Get videos |
| `POST` | `/quizz` | Create a Quiz |
| `GET` | `/quizz` | Get quizzes |
| `POST` | `/result` | Create/Record a Result |
| `GET` | `/result` | Get results |

### 📢 Engagement & Operations

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/announcement` | Create Announcement |
| `GET` | `/announcement` | Get announcements |
| `POST` | `/event` | Create Event |
| `GET` | `/event` | Get events |
| `POST` | `/comment` | Add a comment to a post |
| `GET` | `/comment/post/:postId` | Get comments for a post |
| `POST` | `/like` | Toggle like on post/comment |
| `POST` | `/fees` | Create Fee record |
| `GET` | `/fees` | Get fee records |

---

### 🧪 Quick Postman Copy-Paste
*Copy these suffixes and append to `http://localhost:8000/api/v1/lms`*

```text
/institution
/institution-setup
/student
/student/profile
/teacher
/teacher/profile
/courses
/subjects
/enrolled-courses
/assignment
/assignment/submit
/notes
/video
/quizz
/result
/announcement
/event
/fees
```
