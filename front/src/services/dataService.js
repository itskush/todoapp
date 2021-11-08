import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_APIURL ? process.env.VUE_APP_APIURL : 'http://localhost:3000/';

export default {
    async getTasks() {
        try {
            return await axios.get("api/tasks/");
        } catch (error) {
            return error.response;
        }
    },
    async createTask(userId,description) {
        try {
            return await axios.post("api/tasks/" + userId, description);
        } catch (error) {
            return error.response;
        }
    },
    async updateTask(taskId , description) {
        try {
            return await axios.put("api/tasks/" + taskId, description);
        } catch (error) {
            return error.response;
        }
    },
    async updateTaskState(taskId) {
        try {
            return await axios.put("api/tasks/task-state/" + taskId);
        } catch (error) {
            return error.response;
        }
    },
    async deleteTask(taskId) {
        try {
            return await axios.delete("api/tasks/" + taskId);
        } catch (error) {
            return error.response;
        }
    },
    async getTasksByUserId(userId) {
        try {
            return await axios.get("api/tasks/user-tasks/" + userId);
        } catch (error) {
            return error.response;
        }
    },
    async getUsers() {
        try {
            return await axios.get("api/users/");
        } catch (error) {
            return error.response;
        }
    },
    async addUser(username) {
        try {
            return await axios.post("api/users/" + username);
        } catch (error) {
            return error.response;
        }
    },
    async updateUser(userId, name) {
        try {
            return await axios.put("api/users/" + userId , name);
        } catch (error) {
            return error.response;
        }
    },
    async deleteUser(userId) {
        try {
            return await axios.delete("api/users/" + userId);
        } catch (error) {
            return error;
        }
    },
}
