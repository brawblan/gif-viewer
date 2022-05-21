<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon 
        v-if="!drawer"
        class="grey--text" 
        @click="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon 
        v-if="drawer"
        class="grey--text" 
        @click="drawer = !drawer">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">gif</span>
        <span>viewer</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer 
      v-model="drawer" 
      app 
      class="primary"
    >
      <v-row>
        <v-col align="center" class="mt-5">
          <p class="white--text subheading mt-1">
            {{currentUser.firstName ? `Howdy, ${currentUser.firstName}!` : 'Hello!'}}
          </p>
        </v-col>
      </v-row>
      <v-list nav class="d-flex flex-column">
        <v-list-item 
          v-for="{icon, title, route} in links" 
          :key="title" 
          route 
          :to="route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-row>
        <v-col align="center">
          <v-btn
            width="80%"
            color="grey lighten-2"
            @click="logOut(auth)"
          >
            <span>Sign Out</span>
            <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { signOut, getAuth } from 'firebase/auth'
import router from '../router/index'
import UserService from '../services/user-service/user-service'

export default {
  name: 'NavBar',
  props: {
    user: Object
  },
  data(props) {
    let auth
    return {
      drawer: false,
      auth,
      props,
      currentUser: '',
      links: [
        { icon: 'home', title: 'Home', route: '/' },
        { icon: 'search', title: 'Search History', route: '/search-history' }
      ]
    }
  },
  methods: {
    logOut(auth) {
      signOut(auth).then(() => {
        router.push('/login')
      })
    },
    async getCurrentUser() {
      const user = await UserService.getUserByID(this.props.user.uid)
      return user
    }
  },
  async mounted() {
    this.auth = getAuth()
    this.currentUser = await this.getCurrentUser()
  }
}
</script>