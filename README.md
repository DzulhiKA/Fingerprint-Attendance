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


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
