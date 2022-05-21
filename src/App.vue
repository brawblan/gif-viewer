<template>
  <v-app>
    <NavBar v-if="loggedIn" :user="currentUser" />
    <v-main class="grey lighten-4">
      <v-container fluid class="mx-4 mb-4 pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { auth } from './firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: "App",
  components: { 
    NavBar 
  },
  data() {

    return {
      auth,
      onAuthStateChanged,
      currentUser: {},
      searchHistory: [],
      loggedIn: false
    }
  },
  mounted() {
    let loggedIn
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true
        this.currentUser = user
      } else {
        this.loggedIn = false
      }
    })

    return {
      loggedIn
    }
  }
}
</script>
