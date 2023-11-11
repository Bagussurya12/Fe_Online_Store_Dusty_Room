<template>
  <v-row>
    <v-col cols="10" offset="1" class="mb-5">
      <v-card class="my-3">
        <v-toolbar color="black" dark>
          Riwayat Pesanan
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-toolbar>
        <v-card-text>
          <v-alert v-if="alert.show" :type="alert.type">
            {{ alert.message }}
          </v-alert>
          <div class="mb-4 d-flex">
            <v-breadcrumbs :items="breadCrumbs" class="pa-0" />
            <v-spacer></v-spacer>
          </div>
          <v-data-table
            :headers="headers"
            :items-per-page="3"
            :server-items-length="totalData"
            :items="order"
            :loading="loading"
            :search.sync="search"
            :options.sync="options"
            :footer-props="{
              itemsPerPageOptions: [3, 6, 10],
            }"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn :to="`cart/detail/${item._id}`" icon color="black" dark>
                <v-icon class="small">mdi-clipboard-text-search-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  head: {
    title: 'Cart',
  },
  data() {
    return {
      show: false,
      search: '',
      loading: false,
      options: {},
      totalData: 0,
      order: [],
      headers: [
        { text: '#', value: 'row', sortable: false },
        { text: 'ID Order', value: '_id', sortable: false },
        { text: 'Produk Pesanan', value: 'product', sortable: false },
        { text: 'Pelanggan', value: 'customerName', sortable: false },
        { text: 'Status Pesanan', value: 'orderProcess', sortable: false },

        { text: '', value: 'actions', sortable: false },
      ],
      breadCrumbs: [
        {
          text: 'Home',
          disabled: true,
          to: '/',
        },
      ],
      alert: {
        show: false,
        type: '',
        message: '',
      },
    }
  },
  methods: {
    fetchOrder() {
      const { page, itemsPerPage } = this.options
      this.loading = true
      const userId = this.users.id

      this.$axios
        .$get(
          `/orders/getOrderUser/${userId}?page=${page}&limit=${itemsPerPage}&search=${this.search}`
        )
        .then((response) => {
          ;(this.loading = false), (this.order = response.order.docs.reverse())
          this.totalData = response.order.totalDocs

          let startItem = response.order.pagingCounter
          this.order.map((order) => (order.row = startItem++))
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    },
    showAlert(params) {
      if (params.message == 'UPDATE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      } else if (params.message == 'DELETE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      } else if (params.message == 'CREATE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      } else if (params.message == 'ID_NOT_FOUND') {
        ;(this.alert.show = true),
          (this.alert.type = 'error'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      } else if (params.message == 'POST_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      }
    },
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated',
      users: 'user',
    }),
  },
  watch: {
    options: {
      handler() {
        this.fetchOrder()
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchOrder()
      },
    },
  },
  mounted() {
    this.showAlert(this.$route.params)
  },
}
</script>
