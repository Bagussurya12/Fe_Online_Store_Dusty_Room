<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card v-if="userProfile" justify="center" class="pb-3">
        <v-toolbar color="black" dark>Profile </v-toolbar>
        <v-card-text color="black">
          <v-card-title class="justify-center bg-surface-variant itemProfile">{{
            userProfile.fullname
          }}</v-card-title>
          <v-card-subtitle
            class="m-0 d-flex justify-center bg-surface-variant itemProfile"
            color="black"
          >
            <v-icon class="mr-3" color="black">mdi-email-check-outline</v-icon
            >{{ userProfile.email }}</v-card-subtitle
          >
          <v-card-subtitle
            color="black"
            class="m-0 p-0 d-flex justify-center bg-surface-variant itemProfile"
          >
            <v-icon class="mr-3" color="black">mdi-phone</v-icon>
            {{ userProfile.phoneNumber }}</v-card-subtitle
          >
        </v-card-text>
        <v-card-text
          ><v-btn :to="`profile/edit/_id`" color="black" dark block>
            Edit Profil
          </v-btn></v-card-text
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      userProfile: null,
    }
  },
  mounted() {
    this.fetchProfile()
  },
  methods: {
    async fetchProfile() {
      try {
        const userId = this.users.id // Mengambil ID pengguna dari parameter rute
        const response = await axios.get(
          `http://localhost:3000/users/profile/${userId}`
        )
        this.userProfile = response.data.User
      } catch (error) {
        console.error(error)
        // Tambahkan penanganan kesalahan jika diperlukan
      }
    },
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated',
      users: 'user',
    }),
  },
}
</script>
<style>
.itemProfile {
  margin-top: 0;
  padding-top: 0;
  color: black;
}
</style>
