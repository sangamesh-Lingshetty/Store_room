# Store Room - To-Do List App

![Store Room Logo](https://img.icons8.com/ios/452/task.png)

A full-stack MERN (MongoDB, Express, React, Node) To-Do List application to help you manage your tasks and stay organized. Add, update, delete, and set reminders for your tasks, and track your productivity with ease.

## 🚀 Live Demo
You can try the live version of the app here:  
[Store Room - To-Do List App](https://store-room-aqioly7jf-sangameshs-projects.vercel.app/)

## 🔧 Technologies Used
- **Frontend**: React, React Hooks, Axios, React Router, Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, Bootstrap
- **Deployment**: Vercel for frontend, Heroku for backend (optional)

## ✨ Features
- **Add Tasks**: Create new tasks with titles and descriptions.
- **Set Reminders**: Add reminders to your tasks and get notified.
- **Mark Tasks as Complete**: Complete tasks and mark them with a checkbox.
- **Edit Tasks**: Update existing tasks.
- **Delete Tasks**: Remove tasks you no longer need.
- **Responsive Design**: The app is fully responsive and works well on both desktop and mobile devices.

## 🛠️ How to Run the Project Locally

### Prerequisites:
Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### Steps to Get Started:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/store-room.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd store-room
    ```

3. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

4. **Set up environment variables** in the `.env` file (in the backend folder):
    ```
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```

5. **Run the backend server**:
    ```bash
    npm start
    ```

6. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

7. **Run the frontend**:
    ```bash
    npm start
    ```

8. The app should now be running on `http://localhost:3000`.

---

## 🛠️ Contribution Task: Fix the Reminder UI Issue

### Bug Description:
Currently, in the application, when you set a reminder for a task, it gets saved successfully in the backend. However, in the To-Do List UI, the reminder **does not display correctly**. Instead, it always shows a default message like "No reminder set," even when a reminder has been set.

### Expected Behavior:
- **Current Behavior**: When a reminder is set, the task should show the reminder time and an appropriate reminder icon in the UI.
- **Desired Fix**: The reminder UI should correctly display the time and icon when a reminder is set, and show a "No reminder set" message when no reminder is assigned.

### How to Contribute:
1. **Fork** this repository by clicking the "Fork" button in the top-right corner of this page.
2. **Clone** the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/store-room.git
    ```
3. **Create a new branch** for the bug fix:
    ```bash
    git checkout -b fix-reminder-ui-bug
    ```
4. **Make the necessary changes** to the code to fix the reminder display issue. Specifically, ensure that the reminder is shown correctly in the UI (in the To-Do List).
5. **Commit your changes**:
    ```bash
    git add .
    git commit -m "Fix: Display reminder correctly in To-Do List UI"
    ```
6. **Push your changes** to your forked repository:
    ```bash
    git push origin fix-reminder-ui-bug
    ```
7. **Create a pull request** by clicking the "New Pull Request" button on GitHub, compare your changes with the original repository, and submit the PR.

---

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author
- **Sangamesh** - Full Stack Developer
- GitHub: [@sangamesh123](https://github.com/sangamesh-Lingshetty)
- Email: [your-email@example.com](sangameshlingshetty@gmail.com)

---

### Thanks for contributing to Store Room! 🚀🎉
