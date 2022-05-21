<template>
  <div 
    class="text-center"
    style="maxWidth: 600px; width: 80%; margin: 1rem auto"
  >
    <v-pagination
      v-model="getAllState.page"
      @input="setNewPage"
      :length="Math.ceil(getAllState.gifs.pagination.total_count / 10)"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      total-visible="8"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PaginationBar',
  methods: {
    ...mapActions({
      setCurrentPage: 'setCurrentPage',
      setGifs: 'setGifs'
    }),
    setNewPage(page) {
      this.setCurrentPage(page)
      this.setGifs()
    }
  },
  computed: {
    ...mapGetters({
      getAllState: 'getAllState'
    })
  }
}
</script>