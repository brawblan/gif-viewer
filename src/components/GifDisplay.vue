<template>
  <div>
    <v-row wrap>
      <!-- On page load -->
      <GifErrorCard 
        v-if="!getAllState.gifs.data"
        :message1="pageLoadMessage"
        :smiley="smiley"
      />
      <!-- Search that comes up empty -->
      <GifErrorCard 
        v-else-if="!getAllState.gifs.data.length"
        :message1="noMatchOne"
        :message2="noMatchTwo"
        :smiley="smiley"
      />
      <v-col
        v-else
        v-for="gif in getAllState.gifs.data"
        :key="gif.id"
        class="ma-5"
        sm="5"
        md="2"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-card
              class="ma-5"
              max-width="300"
              width="100%"
              max-height="160"
              height="100%"
              v-bind="attrs"
              v-on="on"
              @click="copyToClipBoard(gif)"
            >
              <v-img
                :lazy-src="copySrc(gif.id)"
                :src="copySrc(gif.id)"
                height="100%"
              />
              <v-card-text class="black--text">
                {{gif.title}}
              </v-card-text>
            </v-card>
          </template>
            <span>Click to copy!</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="ma-5"
      >
        <PaginationBar /> 
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PaginationBar from './PaginationBar.vue'
import GifErrorCard from './GifErrorCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: "GifDisplay",
  components: { PaginationBar, GifErrorCard },
  data() {
    return {
      pageLoadMessage: "Type in a search and find some awesome GIFS! 😀",
      noMatchOne: "No gifs match that search.",
      noMatchTwo: "Try another! 😀",
      smiley: '😀',
      copySrc: (id) => {
        return `https://media.giphy.com/media/${id}/giphy.gif`
      }
    }
  },
  methods: {
    copyToClipBoard(gif) {
      navigator.clipboard.writeText(gif.embed_url);
    }
  },
  computed: {
    ...mapGetters({
      getAllState: 'getAllState'
    })
  },
}
</script>