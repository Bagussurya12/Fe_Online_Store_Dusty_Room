<template>
  <v-row>
    <v-col cols="10" md="8" offset="1" offset-md="2">
      <v-card>
        <v-toolbar color="black" dark class="no-print"
          >Detail Order
          <v-spacer></v-spacer>
          <v-btn
            @click="updateStatusOrder"
            variant="tonal"
            color="primary"
            v-if="order.orderProcess === 'On Delivery'"
            >Terima Barang</v-btn
          >
        </v-toolbar>
        <v-list lines="three">
          <v-list-item-subtitle class="d-flex justify-center my-6"
            ><h3>Detail Order</h3>
          </v-list-item-subtitle>

          <v-list-item>
            <v-list-item-title>OrderId</v-list-item-title>
            <v-list-item-subtitle>{{ order._id }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>User Id</v-list-item-title>
            <v-list-item-subtitle>{{ order.userId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nama Pelanggan</v-list-item-title>
            <v-list-item-subtitle>{{
              order.customerName
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nomor Handphone</v-list-item-title>
            <v-list-item-subtitle>{{
              order.phoneNumberCustomer
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{
              order.emailCustomer
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Alamat Pengiriman</v-list-item-title>
            <v-list-item-subtitle>{{ order.address }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Produk Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.product
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Warna Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.shirtColor
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Jenis Sablon</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.printingType
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Ukuran</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.size
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Jumlah Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.amountOrder
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">
              <h3 class="orderProcess">
                {{ order.orderProcess }}
              </h3></v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Total Harga Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold"
              >Rp.{{ currency(order.amountPayment) }}</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Ongkos Kirim</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold"
              >Rp.{{ currency(order.shippingCost) }}</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Total Pembayaran</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">
              <h3 class="total">
                Rp.{{ currency(order.totalPayment) }}
              </h3></v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status Pembayaran</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.paymentStatus
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Kurir / Nomor Resi Pengiriman</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold"
              >JNE / -{{ order.resiNumber }}</v-list-item-subtitle
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Deskripsi Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.description
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item class="no-print">
            <v-list-item-title>Desaign Pesanan </v-list-item-title>
            <v-img
              class="mt-5 mb-10"
              :src="requireImage(order.image)"
              width="200px"
            ></v-img>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ['authenticated'],
  asyncData({ params }) {
    return {
      id: params.id,
    }
  },
  data() {
    return {
      asyncData({ params }) {
        return {
          id: params.id,
        }
      },
      isDisable: false,
      breadCrumbs: [
        { text: 'History Order', disabled: false, to: '/cart', exact: true },
        { text: 'Detail Order', disabled: true },
      ],
      order: [],
    }
  },
  methods: {
    fetchOrderById() {
      this.$axios
        .$get(`orders/${this.id}`)
        .then((response) => {
          this.order = response.Order
        })
        .catch((error) => {
          this.$router.push({
            name: 'cart___' + this.$i18n.locale,
            params: {
              message: 'ID_NOT_FOUND',
            },
          })
        })
    },
    requireImage(imagePath) {
      if (!imagePath) {
        return '' // Atau kembalikan placeholder gambar atau teks kesalahan
      }
      return require(`../../../../Beckend-store/images/${imagePath}`)
    },
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
    updateStatusOrder() {
      this.$axios.$put(`/orders/update-status/${this.id}`).then((response) => {
        console.log('Status pesanan berhasil diperbarui')
        window.location.reload()
      })
    },
  },
  mounted() {
    this.fetchOrderById()
  },
}
</script>
<style>
.text {
  margin: 20px;
}
.total {
  color: red;
}
.orderProcess {
  color: green;
}
</style>
