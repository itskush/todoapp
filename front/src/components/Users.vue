<template>
  <div>
    <button class="invite-button" type="button" title="Add member" @click="addModel">
      <font-awesome-icon icon="plus-square"  size="4x" color="#fff" />
    </button>
    <div class="main-content-row">
      <div v-for="user in users" :key="user.id" class="profile-card">
        <div class="profile-card-header">
          <img class="avatar"
               :src="getImage(user)"
               :title="user.name" alt="Avatar">
          <span class="whitespace"></span>
          <div class="content">
            <h1 style="text-transform: capitalize;">{{ user.name }}</h1>
          </div>
          <div class="profile-card-overflow-menu">
            <b-dropdown aria-role="list">
              <template #trigger="{ active }">
                <font-awesome-icon class="ellipsis" icon="ellipsis-v" :icon-right="active ? 'menu-up' : 'menu-down'"/>
              </template>
              <b-dropdown-item @click="updateModel(user)" aria-role="listitem">Update User</b-dropdown-item>
              <b-dropdown-item @click="confirmCustomDelete(user)" aria-role="listitem">Delete User</b-dropdown-item>
              <b-dropdown-item @click="viewTasks(user)" aria-role="listitem">View Tasks</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <b-field>
                <b-input placeholder="Type in name for user" v-model="selectedUser.name"></b-input>
              </b-field>
            </div>
          </div>
          <div class="content">
            <b-button type="is-dark" @click="updateUser">Save Changes</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal v-model="isCardModalAddActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <b-field>
                <b-input placeholder="No label" v-model="newUser"></b-input>
              </b-field>
            </div>
          </div>
          <div class="content">
            <b-button type="is-dark" @click="addUser">Save Changes</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <b-loading is-full-page v-model="isLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script>
import service from '../services/dataService'

export default {
  name: "Users",
  data() {
    return {
      isLoading: false,
      isCardModalActive: false,
      isCardModalDeleteActive: false,
      isCardModalAddActive: false,
      selectedUser: '',
      newUser: '',
      users: []
    }
  },
  methods: {
    async getUsers(){
      const res = await service.getUsers();
      if (res.data) {
        this.users = res.data
      }
      console.log(this.users)
    },
    confirmCustomDelete(user) {
      this.$buefy.dialog.confirm({
        title: 'Deleting account',
        message: 'Are you sure you want to <b>delete</b> this account? This action cannot be undone.',
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm:  async() => {
          const response = await service.deleteUser(user.id)
          if (response.status === 200 || response.status === 201 ){
            this.$buefy.toast.open('Account deleted!')
            await this.getUsers();
          }else{
            this.$buefy.toast.open('There was an error. Please try again later')
          }

        }
      })
    },
    updateModel(user) {
      this.isCardModalActive = true;
      this.selectedUser = '';
      this.selectedUser = user;
    },
    addModel() {
      this.isCardModalAddActive = true;
    },
    updateUser() {
      this.isLoading = true;
      setTimeout(async () => {
        const response = await service.updateUser(this.selectedUser.id, { name: this.selectedUser.name} )
        if (response.status === 200 || response.status === 201 ){
          this.$buefy.toast.open({
            message: 'User updated successfully',
            type: 'is-success'
          })
          await this.getUsers();
        }else{
          this.$buefy.toast.open('There was an error. Please try again later')
        }
        this.isLoading = false;
        this.isCardModalActive = false;
      }, 2000)
    },
    async addUser(){
      const response = await service.addUser(this.newUser)
      if (response.status === 200 || response.status === 201 ){
        this.$buefy.toast.open({
          message: 'Account added!',
          type: 'is-success'
        })
        this.isCardModalAddActive = false;
        await this.getUsers();
      }else{
        this.$buefy.toast.open('There was an error. Please try again later')
      }
    },
    viewTasks(user) {
      this.$router.push({name: 'tasks', params: {id: user.id}});
    },
    getImage(user){
      return user.image ? './icons/' + user.image : './icons/1.png'
    }
  },
  created() {
    this.getUsers()
  }
}
</script>

<style lang="scss" scoped>
.main-content-row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: calc(1140px);
  margin-right: auto;
  margin-left: auto;
}

.invite-button {
  position: fixed;
  top: 1rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  outline: 0;
  background-color: #c98eb4;
  box-shadow: rgb(0 0 0 / 25%) 0 4px 11px;
  cursor: pointer;
  z-index: 3;
}

.profile-card {
  align-self: flex-start;
  width: 100%;
  max-width: 360px;
  margin: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 13%) 0 2px 4px 0;
}

.profile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  height: 60px;

  img {
    height: 40px;
  }
}

.profile-card-header .content {
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 0;
  line-height: 1;
}

.profile-card-header .content h1 {
  margin: 0;
  font-size: 16px;
  line-height: 20px;
}

.profile-card-header .content p {
  margin: 0
}

.profile-card-overflow-menu {
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.ellipsis {
  cursor: pointer;
}
.content:not(:last-child){
  margin-bottom: 0;
}

</style>
