# 🏋️‍♂️ Gym Member Fingerprint Attendance System

A backend system that allows gym members to check in using their **fingerprint**, removing the need for membership cards. Attendance is automatically logged via integration with a biometric device such as **Fingerspot**.

---

## 📌 Features

- 🔒 **Fingerprint-Based Check-In**
- 🔄 **Automated Sync with Biometric Device**
- 👤 **Member Management (CRUD)**
- 🗓️ **Daily Attendance Logging**
- 📊 **Attendance History & Reports**
- 🛡️ **JWT Authentication for Admin Access**

---

## 🛠️ Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Backend      | Next.js              |
| Database     | MySQL / PostgreSQL   |
| ORM          | Sequelize            |
| Auth         | JWT                  |
| Tools        | Postman              |
| Deployment   | Local                |

---

## 🧠 System Overview

1. Admin registers gym members into the system.
2. Each member is enrolled in the fingerprint scanner.
3. When a member scans their fingerprint:
   - Device logs the check-in.
   - A scheduled sync job fetches new logs.
   - The backend records the check-in with timestamp.
4. Admins can view attendance history or generate reports.

---

## 🧩 Project Structure

