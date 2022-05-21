<template>
<v-row class="mt-4 mb-3">
  <v-col align="center">
    <v-card
      elevation="3"
      width="fit-content"
      max-width="600px"
      align="center"
    >
      <v-card-title>Sign Up</v-card-title>
      <v-card-text>
        <v-row
          align="center"
          class="mx-0 my-1"
        >
          <form @submit.prevent="signUp(email, firstName, password)">
            <v-text-field
              v-model="firstName"
              label="First Name"
              filled 
              dense 
              required
              @input="v$.firstName.$touch()"
              @blur="v$.firstName.$touch()"
            />
            <v-text-field
              v-model="email"
              label="E-mail"
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
                Sign Up with Google
              </v-btn>
            </v-row>
            <v-row  class="mx-0 my-2">
              <v-btn @click="gotToLogIn">
                Already have an account? Log In
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
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithPopup
  } from 'firebase/auth'
import router from '../router/index'
import { db } from '../firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default {
  name: 'SignUpPage',
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    
    return {
      firstName: '',
      email: '',
      password: '',
      show1: false,
    }
  },
  validations() {
    return {
      firstName: { required, name },
      email: { required, email },
      password: { required, maxLength: maxLength(10) },
    }
  },
  methods: {
    submit () {
      this.v$.$touch()
    },
    clear () {
      this.v$.$reset()
      this.firstName = ''
      this.email = ''
      this.password = ''
    },
    signUp: (email, firstName, password) => {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then( async (data) => {
          const { uid } = data.user
          const userData = {
            uid,
            email,
            firstName,
            createdOn: Date.now()
          }

          const userRef = doc(db, 'users', uid)
          await setDoc(userRef, userData)

          router.push('/')
        }).catch((error) => {
          console.error(error)
        })
    },
    signInWithGoogle: () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then( async (result) => {
          const { uid, displayName, email } = result.user
          const firstName = displayName.split(' ')[0]
          const userData = {
            uid,
            email,
            firstName,
            createdOn: Date.now()
          }

          const userRef = doc(db, 'users', uid)
          await setDoc(userRef, userData)
          router.push('/')
        })
        .catch((error) => {
          console.error(error);
        })
    },
    gotToLogIn: () => {
      router.push('/login')
    }
  },
}

</script>