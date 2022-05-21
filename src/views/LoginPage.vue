<template>
  <v-row class="mt-4 mb-3">
    <v-col align="center">
      <v-card
        width="fit-content"
        elevation="3"
        max-width="600px"
        align="center"
      >
        <v-card-title>
          Log In
        </v-card-title>
        <v-card-text>
          <v-row class="mx-0 my-1">
            <form @submit.prevent="signUp(email, password)">
              <v-text-field
                v-model="email"
                label="E-mail"
                full-width
                filled 
                dense 
                required
                @input="v$.email.$touch()"
                @blur="v$.email.$touch()"
              />
              <v-text-field
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                v-model="password"
                label="Password"
                full-width
                filled 
                dense 
                required
                @input="v$.password.$touch()"
                @blur="v$.password.$touch()"
              />
              <v-row class="mx-0 my-2">
                <v-btn type="submit">
                  submit
                </v-btn>
              </v-row>
              <v-row class="mx-0 my-2">
                <v-btn @click="signInWithGoogle">
                  Sign In with Google
                </v-btn>
              </v-row>
              <v-row  class="mx-0 my-2">
                <v-btn @click="gotToSignUp">
                  Need an account? Sign Up
                </v-btn>
              </v-row>
            </form>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, maxLength, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import router from '../router/index'

export default {
  name: 'LoginPage',
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    
    return {
      email: '',
      password: '',
      show1: false,
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required, maxLength: maxLength(10) },
    }
  },
  methods: {
    submit () {
      this.v$.$touch()
    },
    signUp: (email, password) => {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          router.push('/')
        }).catch((error) => {
          console.error(error)
        })
    },
    signInWithGoogle: () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then(() => {
          router.push('/')
        })
        .catch((error) => {
          console.error(error);
        })
    },
    gotToSignUp: () => {[
      router.push('/signup')
    ]}
  },
}

</script>