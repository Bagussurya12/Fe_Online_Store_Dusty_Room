<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-3">
        <v-card-text>
          <h2>Logout <v-icon class="ml-4 spin-loading">mdi-loading</v-icon></h2>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  middleware: ['authenticated'],
  methods: {
    ...mapMutations('auth', {
      setFullname: 'setFullname',
      setAccessToken: 'setAccessToken',
      setRefreshToken: 'setRefreshToken',
    }),
  },
  mounted() {
    setTimeout(() => {
      this.setAccessToken(null),
        this.setRefreshToken(null),
        this.setFullname(null),
        this.$router.push('/login')
    }, 1000)
  },
}
</script>
