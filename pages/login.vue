<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-3">
        <v-toolbar color="black" dark>Login</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              name="email"
              label="email"
              type="email"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="password"
              type="password"
              v-model="form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" dark @click="onSubmit" :disabled="isDisable">
            <span v-if="!isDisable">Login</span>
            <v-progress-circular
              v-else
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Do You Have an account?
        <v-btn to="/register" plain class="text-btn">Register</v-btn>
      </p>
      <v-alert color="red lighten-2" dark v-if="isError">
        {{ $t(message) }}
      </v-alert>
    </v-col>
  </v-row>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  middleware: ['unauthenticated'],
  head: {
    title: 'Login',
  },
  data() {
    return {
      isDisable: false,
      isError: false,
      message: '',
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapMutations('auth', {
      setFullname: 'setFullname',
      setAccessToken: 'setAccessToken',
      setRefreshToken: 'setRefreshToken',
    }),
    storeWelcomeScreen() {
      localStorage.setItem('welcomeScreen', true)
    },
    onSubmit() {
      this.isDisable = true
      this.$axios
        .$post('http://localhost:3000/auth/login', this.form)
        .then((response) => {
          this.isDisable = false
          // Login Success
          // Store Passed Welcome
          if (!localStorage.welcomeScreen) {
            this.storeWelcomeScreen()
          }
          // Store Auth data
          this.setFullname(response.fullname)
          this.setAccessToken(response.accessToken)
          this.setRefreshToken(response.refreshToken)

          // Redirect TO login Page
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.isError = true
          this.message = error.response.data.message
          this.isDisable = false
        })
    },
  },
  mounted() {
    if (this.$route.params.message === 'AUTH_REQUIRED') {
      this.message = this.$route.params.message
      this.isError = true
    }
  },
}
</script>
<style>
.text-btn {
  font-weight: bold;
}
</style>
