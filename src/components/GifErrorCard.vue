<template>
  <v-col>
    <v-card
      class="ma-5 mb-16 mx-auto pa-2"
      max-width="300"
      width="100%"
      height="100%"
    >
      <v-card-text>
        <p class="black--text text-lg-overline">{{props.message1}}</p>
        <p class="black--text text-lg-overline">
          {{props.message2}}
        </p>
        <p class="black--text mt-16" style="fontSize: 8rem; text-align: center;">
          {{props.smiley}}
        </p>
      </v-card-text>
    </v-card>
  </v-col>  
</template>

<script>
export default {
  name: 'GifErrorCard',
  props: {
    message1: String,
    message2: String,
    smiley: String
  },
  data(props) {
    return {
      props
    }
  }
}
</script>