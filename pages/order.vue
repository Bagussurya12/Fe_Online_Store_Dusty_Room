<template>
  <v-row> <order></order><v-col cols="12"> </v-col> </v-row>
</template>
<script>
export default {
  middleware: ['authenticated'],
  head: {
    title: 'Login',
  },
}
</script>
