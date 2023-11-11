<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mb-3">
        <v-toolbar color="black" dark> Dashboard</v-toolbar>

        <h3 class="font-weight-bold d-flex justify-center my-6">
          Hello {{ userProfile.fullname }}, Silakan Pilih Menu Untuk Mengakses
        </h3>

        <v-spacer></v-spacer>
        <h4 class="font-weight-bold d-flex justify-center my-6">
          Jika Ada Keluhan Silakan Chat Ke
          <v-icon class="ml-5 font-weight-bold">mdi-whatsapp</v-icon
          >085888714165
        </h4>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axiosInterceptors from '~/plugins/axiosInterceptors'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  middleware: ['authenticated'],
  data() {
    return {
      userProfile: '',
    }
  },
  methods: {
    async fetchProfile() {
      try {
        const userId = this.users.id
        const response = await axios.get(
          `http://localhost:3000/users/profile/${userId}`
        )
        this.userProfile = response.data.User
      } catch (error) {
        console.error(error)
      }
    },
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated',
      users: 'user',
    }),
  },
  mounted() {
    this.fetchProfile()
  },
}
</script>
