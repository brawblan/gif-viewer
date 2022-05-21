<template>
  <div>
    <h1 class="subheading grey--text">Search History</h1>
    <p>Showing 10 most recent searches.</p>
    <p>
      <v-btn 
        icon
        @click="refreshPage"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
      Refresh to delete all history.
    </p>
    <v-row warp>
      <v-col
        v-for="(history, index) in getAllState.searchHistory.slice(0, 10)"
        :key="index"
        class="ma-5 mb-16"
        sm="5"
        md="2"
      >
        <v-card
          class="mx-auto"
          max-width="100%"
          outlined
        >
          <v-card-text class="black--text font-weight-bold text-overline">
            {{history}}
          </v-card-text>
  
          <v-card-actions>
            <v-row>
              <v-btn
                outlined
                rounded
                text
                class="text-overline ma-2"
                width="100px"
                @click="searchAgain(history)"
              >
                Search
              </v-btn>
              <v-btn
                outlined
                rounded
                text
                class="text-overline ma-2"
                width="100px"
                @click="queryToDelete(history)"
              >
                Delete
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '../router/index'

export default {
  name: 'SearchHistory',
  data() {

    return {
    }
  },
  methods: {
    ...mapActions({
      setGifs: 'setGifs',
      setCurrentQuery: 'setCurrentQuery',
      setCurrentPage: 'setCurrentPage',
      removeFromHistory: 'removeFromHistory'
    }),
    searchAgain(history) {
      this.setCurrentQuery(history)
      this.setCurrentPage(1)
      this.setGifs()
      router.push('/')
    },
    queryToDelete(history) {
      this.removeFromHistory(history)
    },
    refreshPage() {
      location.reload()
    }
  },
  computed: {
    ...mapGetters({
      getAllState: 'getAllState'
    })
  }
}
</script>
