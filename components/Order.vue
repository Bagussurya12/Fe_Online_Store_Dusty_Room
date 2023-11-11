<template>
  <v-row class="d-flex contentOrder">
    <v-col cols="6">
      <v-card
        class="mx-auto"
        max-width="344"
        v-for="(item, index) in cartItems"
        :key="index"
      >
        <v-img
          :src="require(`../../Beckend-store/images/${item.image}`)"
          height="200px"
          cover
        ></v-img>
        <v-card-title> {{ item.title }} </v-card-title>
        <v-card-subtitle> {{ currency(item.price) }}</v-card-subtitle>
      </v-card>
      <v-list class="mx-auto" max-width="344">
        <v-list-item
          v-for="(item, index) in cartItems"
          :key="index"
          @click="selectItemTitle(item)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="d-flex">
              Rp.{{ currency(item.price) }} X
              <v-btn
                icon
                x-small
                class="px-0"
                color="primary"
                @click="decrement(item.id)"
              >
                <v-icon>mdi-minus</v-icon></v-btn
              >
              <v-list-item-subtitle
                >{{ item.quantity }}
                <v-btn
                  icon
                  x-small
                  class="px-0"
                  color="primary"
                  @click="increment(item.id)"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
              </v-list-item-subtitle>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="error" x-small @click="remove(item.id)"
              ><v-icon>mdi-trash-can</v-icon></v-btn
            >
            <v-list-item-title>{{
              currency(itemTotal(item.price, item.quantity))
            }}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-if="cartItems.length"
          class="text-h6 black--text grey lighten-2"
        >
          <v-list-item-content>
            <v-list-item-title>SUBTOTAL</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action> Rp.{{ currency(subTotal) }} </v-list-item-action>
        </v-list-item>
        <v-list-group
          v-if="cartItems.length"
          :value="false"
          class="black--text grey lighten-3"
        >
          <template v-slot:activator>
            <v-list-item-content class="text h-5">
              <v-list-item-title>Additionals</v-list-item-title>
            </v-list-item-content>
          </template>
          <template v-for="(additional, index) in additionals">
            <v-list-item disabled class="black--text">
              <v-list-item-content>
                <v-list-item-title>{{ additional.title }}</v-list-item-title>

                <v-list-item-subtitle v-if="additional.mode == 'percentage'">
                  {{ currency(additional.value) }} %
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-title v-if="additional.mode == 'fix'">{{
                  currency(additional.value)
                }}</v-list-item-title>
                <v-list-item-title
                  v-else-if="additional.mode == 'percentage'"
                  >{{
                    currency(calculatePercentage(additional.value))
                  }}</v-list-item-title
                >
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-group>
        <v-list-item class="black--text grey lighten-2">
          <v-list-item-content>
            <v-list-item-title>Ongkir</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="ongkir"
            >Rp.{{ currency(ongkir) }}</v-list-item-action
          >
        </v-list-item>
        <v-list-item
          v-if="cartItems.length"
          class="text-h6 black--text grey lighten-2"
        >
          <v-list-item-content>
            <v-list-item-title>TOTAL</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            Rp.{{ currency(grandTotal) }}
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="4" class="formOrder">
      <v-list>
        <v-form
          class="mx-auto formOrder"
          v-for="(item, index) in cartItems"
          :key="index"
          ref="form"
          max-width="200"
          action="/orders"
          method="post"
          enctype="multipart/form-data"
        >
          <v-select
            v-model="form.printingType"
            :rules="rules.printingType"
            :items="printing"
            label="Jenis Sablon"
            color="black"
            light
            variant="solo-filled"
          ></v-select>
          <v-select
            v-model="form.size"
            :rules="rules.size"
            :items="size"
            label="Ukuran"
            color="black"
            light
            variant="solo-filled"
          ></v-select>
          <v-file-input
            type="file"
            name="image"
            accept="image/jpeg, image/png, image/jpeg"
            label="upload design"
            variant="solo-inverted"
            color="black"
            placeholder="Max 1 MB"
            light
            :rules="rules.image"
            v-model="form.image"
            show-size
            counter
            multiple
          ></v-file-input>
          <v-select
            v-model="form.shirtColor"
            :rules="rules.shirtColor"
            :items="color"
            name="shirtColor"
            label="Warna"
            type="text"
            color="black"
            variant="solo-filled"
          ></v-select>
          <v-text-field
            v-model="form.description"
            :rules="rules.description"
            name="description"
            placeholder="Masukan Catatan Pesanan"
            label="Catatan Pesanan"
            type="text"
            prepend-icon="mdi-comment"
            class="mb-5"
            color="black"
          >
          </v-text-field>
          <v-select
            v-model="selectedCity"
            :items="cities"
            item-text="city_name"
            item-value="city_id"
            label="Kota Tujuan"
            variant="solo-filled"
            @change="selectCity(selectedCity)"
          ></v-select>
          <v-btn @click="fetchDataOngkir" class="mb-5">Cek Ongkir</v-btn>
          <div>
            <div v-if="results.length > 0">
              <h5>Ongkir:</h5>
              <div v-for="(result, index) in results" :key="index">
                <label>
                  <input
                    type="radio"
                    v-model="selectedShipingCost"
                    :value="result.costs[0].cost[0].value"
                  />
                  Kurir: {{ result.name }} - Layanan:
                  {{ result.costs[0].description }}
                  - Biaya: {{ currency(result.costs[0].cost[0].value) }} -
                  Estimasi Pengiriman: {{ result.costs[0].cost[0].etd }} Hari
                </label>
              </div>
            </div>
            <div v-else>
              <p>Tidak Ada Hasil yang ditemukan</p>
            </div>
          </div>
          <v-textarea
            v-model="form.address"
            :rules="rules.address"
            type="text"
            prepend-icon="mdi-home"
            label="Alamat Pengiriman"
            placeholder="Alamat Wajib Lengkap, Contoh : Jln.Siliwangi, Kelurahan Pakansari, Kec.Cibinong Kab.Bogor"
            color="black"
            light
          ></v-textarea>
          <v-btn
            color="black"
            dark
            @click="onSubmit"
            :disabled="isDisable"
            block
          >
            <span v-if="!isDisable">Pesan</span>
            <v-progress-circular
              v-else
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-form>
      </v-list>
      <v-card-actions> </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  data() {
    return {
      selectedShipingCost: null,
      results: [],
      ongkir: '',
      isDisable: false,
      materials: ['Combed 24S', 'Combed 30S'],
      printing: ['Plastisol', 'Rubber', 'DTF'],
      size: ['S (42 x 30)', 'M (45 x 33)', 'L (50 x 37)', 'XL (55 x 40)'],
      token: '',
      color: [
        'Putih',
        'Hitam',
        'Abu Misty',
        'Hijau',
        'Hijau Toska',
        'Cream',
        'Biru Navy',
        'Biru Donker',
        'Merah Maroon',
        'Kuning',
        'Biru Muda',
      ],
      selectedCity: null,
      cities: [],
      courier: ['jne', 'tiki'],
      rules: {
        shirtColor: [(v) => !!v || this.$t('SHIRT_COLOR_IS_REQUIRED')],
        printingType: [(v) => !!v || this.$t('PRINTING_TYPE_IS_REQUIRED')],
        Process: [(v) => !!v || this.$t('PROCESS_IS_REQUIRED')],
        customerName: [(v) => !!v || this.$t('CUSTOMER_NAME_IS_REQUIRED')],
        description: [(v) => !!v || this.$t('DESCRIPTION_IS_REQUIRED')],
        emailCustomer: [(v) => !!v || this.$t('EMAIL_IS_REQUIRED')],
        phoneNumberCustomer: [
          (v) => !!v || this.$t('PHONE_NUMBER_IS_REQUIRED'),
        ],
        image: [(v) => !!v || this.$t('IMAGE_IS_REQUIRED')],
        address: [(v) => !!v || this.$t('ADDRESS_IS_REQUIRED')],
      },
      form: {
        size: '',
        address: '',
        shirtColor: '',
        product: '',
        amountOrder: '',
        printingType: '',
        description: '',
        totalPayment: '',
        amountPayment: '',
        image: null,
      },
      shiping: {
        origin: 78,
        weight: 500,
        destination: null,
        courier: 'jne',
      },
    }
  },
  async created() {
    await this.fetchCities()
  },

  methods: {
    ...mapActions('carts', {
      increment: 'increment',
      decrement: 'decrement',
      remove: 'remove',
    }),
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
    onSubmit() {
      this.grandTotal = this.form.totalPayment
      const formData = new FormData()
      formData.append('image', this.form.image[0])
      formData.append('customerName', this.users.fullname)
      formData.append('phoneNumberCustomer', this.users.phoneNumber)
      formData.append('emailCustomer', this.users.email)
      formData.append('shirtColor', this.form.shirtColor)
      formData.append('size', this.form.size)
      formData.append('address', this.form.address)
      formData.append('product', this.form.product)
      formData.append('amountOrder', this.form.amountOrder)
      formData.append('amountPayment', this.form.amountPayment)
      formData.append('totalPayment', this.grandTotal)
      formData.append('printingType', this.form.printingType)
      formData.append('description', this.form.description)
      formData.append('shippingCost', this.ongkir)

      this.$axios
        .$post('/orders/orderUser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.isDisable = false
          console.log(
            response.order._id,
            response.order.customerName,
            response.order.totalPayment,
            response.order.emailCustomer,
            response.order.phoneNumberCustomer
          )

          const data = {
            _id: response.order._id,
            totalPayment: response.order.totalPayment,
            customerName: response.order.customerName,
            emailCustomer: response.order.emailCustomer,
            phoneNumberCustomer: response.order.phoneNumberCustomer,
          }

          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
          this.$axios
            .$post('/orders/payment-transaction', data, config)
            .then((response) => {
              const snapToken = response.token
              const midtransUrl =
                'https://app.sandbox.midtrans.com/snap/snap.js'
              let scriptTag = document.createElement('script')
              scriptTag.src = midtransUrl

              const midtransClientKey = 'SB-Mid-client-1iYKBlTGB7BTS_YT'
              scriptTag.src = midtransUrl
              scriptTag.setAttribute('data-client-key', midtransClientKey)

              scriptTag.addEventListener('load', () => {
                // Script telah dimuat, Anda sekarang dapat mengarahkan pengguna ke Snap
                // window.snap.pay(snapToken); // Untuk versi Snap.js yang lebih lama
                snap.pay(snapToken) // Untuk versi Snap.js terbaru
              })

              document.body.appendChild(scriptTag)
              document.body.appendChild(scriptTag)

              return () => {
                document.body.removeChild(scriptTag)
              }
            })
        })
        .catch((error) => {
          console.log(error)
          this.isDisable = false
        })
    },
    fetchDataOngkir() {
      const body = {
        origin: this.shiping.origin,
        destination: this.shiping.destination,
        weight: this.shiping.weight,
        courier: this.shiping.courier,
      }

      // Menggunakan Axios untuk melakukan permintaan HTTP POST
      this.$axios
        .$post('shiping/cost', body)
        .then((response) => {
          // Mengisikan hasil dari permintaan ke dalam properti results
          this.results = response.data.rajaongkir.results

          if (this.results.length > 0) {
            const selectedResult = this.results[0]
            const shippingCost = selectedResult.costs[0].cost[0].value
            this.ongkir = shippingCost
            this.selectedShippingCost = shippingCost
          } else {
            this.ongkir = 0
          }
        })
        .catch((error) => {
          console.error('Gagal mengambil data ongkir:', error)
          this.results = [] // Mengatur results menjadi array kosong jika terjadi kesalahan.
        })
    },
    async fetchCities() {
      try {
        const response = await this.$axios.$get('/shiping/DataCity')

        this.cities = response.rajaongkir.results.map((city) => city)
      } catch (error) {
        console.error('Gagal mengambil data kota:', error)
      }
    },
    async getShippingCost() {
      this.shiping.destination = this.selectedCity
      console.log(this.selectedCity)
    },

    selectItemTitle(item) {
      this.form.product = item.title
      this.form.amountOrder = item.quantity
      this.form.amountPayment = this.subTotal
      this.form.totalPayment = this.total
    },
    selectCity(city) {
      this.selectedCity = city // Mengatur seluruh objek city sebagai selectedCity.
      this.shiping.destination = city.city_id // Pastikan city memiliki properti city_id.
    },
  },
  computed: {
    ...mapState('carts', {
      items: 'items',
      additionals: 'additionals',
    }),
    ...mapGetters({
      cartItems: 'carts/cartItems',
      itemTotal: 'carts/itemTotal',
      subTotal: 'carts/subTotal',
      calculatePercentage: 'carts/calculatePercentage',
      total: 'carts/total',
      sumAdditional: 'carts/sumAdditional',
      users: 'auth/user',
    }),
    grandTotal() {
      return this.subTotal + this.ongkir
    },
  },
  watch: {
    'form.totalPayment': {
      handler(newTotalPaymentValue) {
        this.grandTotal = newTotalPaymentValue
      },
      immediate: true,
    },
    selectedCity: {
      handler: 'getShippingCost',
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.fetchCities()
    this.fetchDataOngkir()
  },
}
</script>

<style>
.contentOrder {
  margin-top: 20px;
}
</style>
