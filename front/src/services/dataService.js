import axios from "axios"
//https://lofi-tune.herokuapp.com/
export default {
    async getTasks() {
        try {
            return await axios.get("http://localhost:3000/api/tasks/");
        } catch (error) {
            return error.response;
        }
    },
    async createTask(userId,description) {
        try {
            return await axios.post("http://localhost:3000/api/tasks/" + userId, description);
        } catch (error) {
            return error.response;
        }
    },
    async updateTask(taskId , description) {
        try {
            return await axios.put("http://localhost:3000/api/tasks/" + taskId, description);
        } catch (error) {
            return error.response;
        }
    },
    async updateTaskState(taskId) {
        try {
            return await axios.put("http://localhost:3000/api/tasks/task-state/" + taskId);
        } catch (error) {
            return error.response;
        }
    },
    async deleteTask(taskId) {
        try {
            return await axios.delete("http://localhost:3000/api/tasks/" + taskId);
        } catch (error) {
            return error.response;
        }
    },
    async getTasksByUserId(userId) {
        try {
            return await axios.get("http://localhost:3000/api/tasks/user-tasks/" + userId);
        } catch (error) {
            return error.response;
        }
    },
    async getUsers() {
        try {
            return await axios.get("http://localhost:3000/api/users/");
        } catch (error) {
            return error.response;
        }
    },
    async addUser(username) {
        try {
            return await axios.post("http://localhost:3000/api/users/" + username);
        } catch (error) {
            return error.response;
        }
    },
    async updateUser(userId, name) {
        try {
            return await axios.put("http://localhost:3000/api/users/" + userId , name);
        } catch (error) {
            return error.response;
        }
    },
    async deleteUser(userId) {
        try {
            return await axios.delete("http://localhost:3000/api/users/" + userId);
        } catch (error) {
            return error;
        }
    },
}
