import axios from "axios"
//https://lofi-tune.herokuapp.com/
export default {
    async getTasks() {
        return await axios.get("http://localhost:3000/api/tasks/");
    },
    async createTask(userId,description) {
        return await axios.post("http://localhost:3000/api/tasks/" + userId, description);
    },
    async updateTask(taskId) {
        return await axios.put("http://localhost:3000/api/tasks/" + taskId);
    },
    async updateTaskState(taskId) {
        return await axios.put("http://localhost:3000/api/tasks/task-state/" + taskId);
    },
    async deleteTask(taskId) {
        return await axios.delete("http://localhost:3000/api/tasks/" + taskId);
    },
    async getTasksByUserId(userId) {
        return await axios.get("http://localhost:3000/api/tasks/user-tasks/" + userId);
    },
    async getUsers() {
        return await axios.get("http://localhost:3000/api/users/");
    },
    async addUser(username) {
        return await axios.post("http://localhost:3000/api/users/" + username);
    },
    async updateUser(userId, name) {
        return await axios.put("http://localhost:3000/api/users/" + userId , name);
    },
    async deleteUser(userId) {
        return await axios.delete("http://localhost:3000/api/users/" + userId);
    },
}
