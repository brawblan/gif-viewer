<template>
  <div>
    <h1 class="subheading grey--text">GifViewer</h1>
    <SearchBar />
    <GifDisplay />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import GifDisplay from '@/components/GifDisplay.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    GifDisplay
  }
}
</script>
