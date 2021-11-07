import Vue from 'vue'
import Router from 'vue-router'
import users from '../components/Users'
import tasks from '../components/Tasks'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'users',
            component: users

        },
        {
            path: '/tasks',
            name: 'tasks',
            component: tasks
        },
        {
            path: '/tasks/:id',
            name: 'tasksId',
            component: tasks
        }
    ]
})
