<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mb-3">
        <v-toolbar color="black" dark> Dashboard</v-toolbar>
        <v-card-text>
          <h3>Hello Nama,</h3>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['authenticated'],
}
</script>
