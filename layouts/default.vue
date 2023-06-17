<template>
  <v-app dark color="black">
    <v-navigation-drawer
      disable-resize-watcher
      v-model="sideDrawer"
      color="black"
      dark
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="black" dark app>
      <v-app-bar-nav-icon @click.stop="sideDrawer = !sideDrawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      sideDrawer: false,

      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-view-dashboard-variant',
          title: 'Dashboard',
          to: '/inspire',
        },
        {
          icon: 'mdi-account',
          title: 'Proile',
          to: '/Profile',
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login',
          middleware: ['unauthenticated'],
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout',
          middleware: ['authenticated'],
        },
      ],
      right: true,
      // rightDrawer: false,
      title: 'Dusty Store',
    }
  },
  methods: {
    isWelcomeScreen() {
      if (!localStorage.welcomeScreen) {
        if (this.$router.currentRoute.path == '/') {
          this.$router.push('/login')
        }
      }
    },
  },
  watch: {
    $route() {
      this.isWelcomeScreen()
    },
  },
  mounted() {
    localStorage.setItem('welcomeScreen', true)
    this.isWelcomeScreen()
  },
}
</script>
