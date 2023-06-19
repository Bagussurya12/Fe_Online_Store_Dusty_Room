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
          v-for="(sideMenu, i) in sideMenu"
          :key="i"
          :to="sideMenu.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ sideMenu.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ sideMenu.title }}</v-list-item-title>
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
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      sideDrawer: false,
      sideMenu: [],
      originalSideMenu: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
          middleware: ['authenticated'],
        },
        {
          icon: 'mdi-view-dashboard-variant',
          title: 'Dashboard',
          to: '/dashboard',
          middleware: ['authenticated'],
        },
        {
          icon: 'mdi-account',
          title: 'Proile',
          to: '/Profile',
          middleware: ['authenticated'],
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
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated',
      users: 'user',
    }),
  },
  methods: {
    isWelcomeScreen() {
      if (!localStorage.welcomeScreen) {
        if (
          this.$router.currentRoute.path != '/register' &&
          this.$router.currentRoute.path != '/login'
        ) {
          this.$router.push('/login')
        }
      }
    },
    filterSideMenu() {
      this.sideMenu = this.originalSideMenu.filter((item) => {
        if (item.middleware.includes(this.users.role)) {
          return true
        }
        if (this.authenticated) {
          return item.middleware.includes('authenticated')
        } else {
          return item.middleware.includes('unauthenticated')
        }
      })
    },
  },
  watch: {
    $route() {
      this.isWelcomeScreen()
    },
    authenticated() {
      this.filterSideMenu()
    },
  },
  mounted() {
    // localStorage.setItem('welcomeScreen', true)
    this.isWelcomeScreen()
    console.log(this.users)
    this.filterSideMenu()
  },
}
</script>
