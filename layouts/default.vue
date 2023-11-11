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
      <v-spacer></v-spacer>
      <v-toolbar-title class="mr-5">
        <h3>{{ title }}</h3></v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#00000"
        fill-opacity="1"
        d="M0,160L48,186.7C96,213,192,267,288,277.3C384,288,480,256,576,229.3C672,203,768,181,864,181.3C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
    <v-footer class="d-flex justify-space-between" color="black" dark>
      <div>
        <div>
          <h4 class="mb-3">Follow Us</h4>
          <div class="pt-0 d-flex mb-6">
            <v-icon class="mr-1">mdi-instagram</v-icon>
            <h4 class="dark text-decoration-none" dark>
              <a
                class="text-decoration-none"
                dark
                style="color: white"
                href="https://www.instagram.com/dustyroom_screenprinting/?igshid=YmMyMTA2M2Y%3D"
                >Dustyroom</a
              >
            </h4>
          </div>
        </div>
        <div>
          <h4 class="mb-2">Contact Us</h4>
          <div class="pt-0 d-flex justify-end mb-6">
            <v-icon class="mr-1">mdi-email</v-icon>
            <h4>Dustyroom@gmail.com</h4>
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex justify-center">
          <h3 class="font-weight-bold">Dusty Room Best Clothing Maker</h3>
        </div>
        <div>
          Copy Right <v-icon>mdi-copyright</v-icon>
          {{ new Date().getFullYear() }}
          <strong>Dusty Room Screen Printing</strong>
        </div>
      </div>
      <div class="justify-content-start mr-3">
        <h3 class="font-weight-bold mb-4">Customer Service</h3>
        <h4><v-icon class="mr-2 mb-2">mdi-whatsapp</v-icon>085888714165</h4>
        <h4><v-icon class="mr-2">mdi-phone</v-icon> 08999533311</h4>
      </div>
    </v-footer>
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
          title: 'Beranda',
          to: '/',
          middleware: ['authenticated'],
        },
        {
          icon: 'mdi-account',
          title: 'Profil',
          to: `/profile`,
          middleware: ['authenticated'],
        },

        {
          icon: 'mdi-cart',
          title: 'Pesanan',
          to: '/cart',
          middleware: ['authenticated'],
        },

        {
          icon: 'mdi-account-plus',
          title: 'Daftar',
          to: '/register',
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
