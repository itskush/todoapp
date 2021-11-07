<template>
  <div class="main-content">
    <div class="card" v-for="(task, id) in tasks" :key="id">
      <div class="card-content">
        <div class="card-header media">
          <div class="media-content">
            <h1 style="text-transform: capitalize;"><span>{{ task.user.name }}</span></h1>
            <div style="display: flex;align-items: center;"><p>{{ task.tasks.length }} tasks</p></div>
          </div>
        </div>
        <div class="content">
          <div class="add-button-container">
            <div class="task-item" style="cursor: initial;">
              <div class="task">
                <div class="checkmark-button">
                  <font-awesome-icon icon="plus-square" color="#90c1d7"/>
                </div>
                <div aria-hidden="true" class="textarea-container">
                  <textarea @input="onEdit" @keyup.enter="addATask($event,task.user.id)" rows="1" class="" spellcheck="false" placeholder="Enter a text"></textarea>
                </div>
                <img class="enter-icon" v-show="showEnterIcon" src="https://img.icons8.com/ios/50/000000/enter-key.png" alt=""/>
              </div>
            </div>
          </div>
          <div class="task-container" style="height: calc(428px);margin-top: 57px;">
            <div class="separator"></div>
            <div v-for="singleTask in task.tasks" :key="singleTask.id" class="task-item" :class="singleTask.state === true ? 'completed' : ''">
              <div class="separator"></div>
              <div class="task">
                <b-field>
                  <b-checkbox :value="singleTask.state === true"
                              type="is-success"
                              @input="setTaskState(singleTask.id)">
                  </b-checkbox>
                </b-field>
                <div class="textarea-container">
                  <b-field>
                    <b-input class="tasks-container" v-model="singleTask.description"  @keyup.native.enter="updateTask($event,singleTask)"></b-input>
                  </b-field>
                </div>
                <div @click="deleteTask(singleTask.id)" type="button" class="delete-button" style="margin-top: -1px; cursor:pointer">
                  <font-awesome-icon icon="minus-square" color="#90c1d7"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <b-field label="Description">
            <b-input maxlength="100" type="textarea"></b-input>
          </b-field>
        </div>
      </div>
    </b-modal>
  </div>

</template>

<script>
import services from '../services/dataService'
export default {
  name: "Tasks",
  data() {
    return {
      txt: '',
      showEnterIcon: false,
      isCardModalActive: false,
      tasks:[]
    }
  },
  methods: {
    onEdit(evt) {
      this.showEnterIcon = evt.target.value !== '';
    },
    async addATask(evt,userid) {
      this.txt = evt.target.value;
      if (this.txt !== '') {
        const response = await services.createTask(userid,{description: this.txt})
        if (response.status === 200 || response.status === 201 ) {
          if (this.id) {
            await this.getTasksUser(this.id)
          } else {
            await this.getTasks()
          }
        }
        evt.target.value = ''
        this.txt = ''
        this.showEnterIcon = false
      }
    },
    async setTaskState(taskid){
      const response = await services.updateTaskState(taskid)
      if (response.status === 200 || response.status === 201 ) {
        if (this.id) {
          await this.getTasksUser(this.id)
        } else {
          await this.getTasks()
        }
      }
    },
    async updateTask(evt,singleTask){
      evt.target.blur()
      singleTask.visible = false;
      if (evt.target.value !== '') {
        const response = await services.updateTask(singleTask.id, {description: evt.target.value})
        if (response.status === 200 || response.status === 201 ) {
          if (this.id) {
            await this.getTasksUser(this.id)

          } else {
            await this.getTasks()
          }
        }
      }
    },
    async getTasks(){
      const response  = await services.getTasks()
      if (response.status === 200) {
        this.tasks = response.data.map(task => {
          task.tasks.visible = true;
          return task;
        })
      }

    },
    async getTasksUser(userId){
      const response  = await services.getTasksByUserId(userId)
      if (response.status === 200) {
        this.tasks = response.data.map(task => {
          task.tasks.visible = true;
          return task;
        })
      }
    },
    async deleteTask(taskid){
      const response  = await services.deleteTask(taskid)
      if (response.status === 200 || response.status === 201 ) {
        if (this.id) {
          await this.getTasksUser(this.id)
        } else {
          await this.getTasks()
        }
      }

    },
    showText(singleTask){
      console.log(singleTask)
      singleTask.visible = true;
    }

  },
  created() {
    this.id = this.$route.params.id ? this.$route.params.id : '' ;
    if(this.id){
      this.getTasksUser(this.id)
    }else{
      this.getTasks()
    }
  },
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc((100vh - 56px) - 56px);
  padding: 0 1rem 1rem;
}

.card {
  min-width: 33%;
  min-height: 600px;
  margin: 10px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(229, 229, 229);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 50%) 0 5px 23px -18px;
  overflow: hidden;
  opacity: 1;
  transition: all 0.2s ease 0s;
  will-change: opacity;
}

.card-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  .media-content {
    flex-grow: 1;
    flex-shrink: 0;
    line-height: 1;

    h1 {
      display: flex;
      align-items: center;
      margin: 0;
      font-size: 16px;
      line-height: 20px;
    }

    p {
      margin: 0;
      font-size: 12px;
      line-height: 14px;
      opacity: 0.6;
    }
  }
}

.card-content {
  padding: 0.1rem !important;
}

.content {
  height: 100%;
  position: relative;
  border-top: 1px solid rgb(229, 229, 229);
  overflow-y: auto;

  .task {
    position: relative;
    display: flex;
    align-items: center;
    padding: 14px 28px;
    background-color: rgb(255, 255, 255);
    border-width: 1px 0;
    border-style: solid;
    border-color: transparent;
    transition: all 0.2s ease 0s;

    .button {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-top: 2px;
      padding: 0;

      button, .button {
        padding: 0.75rem 1.25rem;
        font-family: inherit;
        font-size: 1em;
        text-align: center;
        text-decoration: none;
        background-color: transparent;
        border: 0;
        border-radius: 25px;
        cursor: pointer;
        opacity: 1;
        transition: all 0.2s ease 0s;
      }
    }

    .textarea-container {
      position: relative;
      display: flex;
      align-items: center;
      flex-grow: 1;
      flex-shrink: 0;
      height: auto;
      margin-right: 28px;
      margin-left: 10px;
    }
  }
}

.add-button-container {
  position: absolute;
  border-bottom: 1px solid transparent;
  background-color: rgb(255, 255, 255);
  transition: all 0.2s ease 0s;
  z-index: 2;
  width: 100%;
}

.add-task-button {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  border-bottom: 1px solid transparent;
  background-color: rgb(255, 255, 255);
  transition: all 0.2s ease 0s;
  z-index: 2;
  margin-bottom: 1rem;
}

.enter-icon {
  height: 24px;
}

.field:not(:last-child) {
  margin-bottom: 0 !important;
}

.reference-text {
  position: absolute;
  width: 246px;
  min-height: 24px;
  pointer-events: none;
  word-break: break-word !important;
}

.task:not(.is-dragging):hover {
  box-shadow: rgb(0 0 0 / 13%) 0 0 13px 0;
  z-index: 1;
}
.card .media:not(:last-child) {
  margin-bottom: 0;
}

.is-focused {
  background-color: rgb(241, 241, 241);
  border-color: rgb(229, 229, 229) rgb(229, 229, 229) rgb(0, 186, 99);
}

.task textarea {
  width: 246px;
  line-height: 24px;
  caret-color: black;
  background-color: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  resize: none;
  overflow: hidden;
  user-select: text !important;
}

.separator {
  width: calc((100% - 28px) - 58px);
  height: 1px;
  background-color: rgb(229, 229, 229);
  margin-right: 28px;
  margin-left: 58px;
  transition: all 0.2s ease 0s;
}

.completed{
  text-decoration: line-through;
  opacity: 0.6;
}

.border{
  border: none;
}
</style>
