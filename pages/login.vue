<template>
  <v-row class="mt-5 d-flex flex-wrap">
    <v-col cols="8">
      <div>
        <v-img
          :src="require(`../assets/images/login2.jpg`)"
          :width="900"
          cover
        ></v-img>
      </div>
    </v-col>
    <v-col cols="3" class="mt-5 login">
      <div class="d-flex justify-center mb-6">
        <v-img
          :src="require(`../assets/images/logo.png`)"
          :width="200"
          cover
        ></v-img>
      </div>
      <v-card class="mb-3 mt-5" height="400px">
        <v-toolbar color="black" dark><h3>Login</h3></v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              v-model="form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            dark
            @click="onSubmit"
            :disabled="isDisable"
            block
            class="mb-1 mr-3"
          >
            <span v-if="!isDisable">Login</span>
            <v-progress-circular
              v-else
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
        <div class="d-flex justify-center mb-3">
          <p class="font-weight-bold">
            Belum Memiliki Akun?
            <v-btn variant="text" to="/register" plain color="red"
              >Daftar</v-btn
            >
          </p>
        </div>
      </v-card>

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
        .$post('/auth/login', this.form)
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
          this.$router.push(`/`)
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
  color: red;
}
.login {
  padding-top: 30px;
}
.btn {
  color: red;
}
</style>
