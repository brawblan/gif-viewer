<template>
  <v-form 
    @submit.prevent="searchGifs(query)"
    style="width: 320px"
    class="mx-auto"
  >
    <v-text-field
      label="GIF Search"
      hide-details="auto"
      v-model="query"
    />
    <div class="my-4">
      <v-btn
        type="submit"
        class="mr-4"
      >
        submit
      </v-btn>
      <v-btn @click="() => setCurrentQuery('')">
        clear
      </v-btn>
    </div>
  </v-form>    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SearchBar',
  data(getAllState) {
    return {
      query: getAllState.query
    }
  },  
  methods: {
    ...mapActions({
      setGifs: 'setGifs',
      setCurrentQuery: 'setCurrentQuery',
      setSearchHistory: 'setSearchHistory',
      setCurrentPage: 'setCurrentPage',
    }),
    searchGifs(query) {
      this.setCurrentQuery(query)
      this.setCurrentPage(1)
      this.setSearchHistory(query)
      this.setGifs()
      this.query = ''
    }
  },
  computed: {
    ...mapGetters({
      getAllState: 'getAllState'
    })
  }
}
</script>