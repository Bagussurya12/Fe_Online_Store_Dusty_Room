<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4" class="mt-5">
      <v-card>
        <v-toolbar color="black" dark> KONFIRMASI PEMBAYARAN</v-toolbar>
        <form
          class="text"
          method="post"
          enctype="multipart/form-data"
          max-width="300"
        >
          <v-text-field
            v-model="form.orderId"
            :rules="rules.orderId"
            label="ORDER ID"
            type="text"
            color="black"
            light
          ></v-text-field>

          <v-text-field
            v-model="form.senderName"
            :rules="rules.senderName"
            label="NAMA PENGIRIM"
            type="text"
            color="black"
            light
          ></v-text-field>
          <v-text-field
            v-model="form.bank"
            :rules="rules.bank"
            label="NAMA BANK PENGIRIM, contoh : BCA/GOPAY"
            type="text"
            color="black"
            light
          ></v-text-field>
          <v-text-field
            v-model="form.bankAccount"
            :rules="rules.bankAccount"
            label="NOMOR REKENING PENGIRIM"
            type="text"
            color="black"
            light
          ></v-text-field>
          <v-text-field
            v-model="form.amount"
            :rules="rules.amount"
            label="NOMINAL PENGIRIMAN"
            type="number"
            color="black"
            light
          ></v-text-field>
          <v-file-input
            type="file"
            name="image"
            accept="image/jpeg, image/png, image/jpeg"
            label="Bukti Pembayaran"
            variant="solo-inverted"
            color="black"
            light
            :rules="rules.image"
            v-model="form.image"
            show-size
            counter
            multiple
          ></v-file-input>
        </form>
        <v-btn
          class="text"
          color="black"
          dark
          @click="onSubmit"
          :disabled="isDisable"
        >
          <span v-if="!isDisable">KIRIM</span>
          <v-progress-circular
            v-else
            color="black"
            indeterminate
          ></v-progress-circular>
        </v-btn>
      </v-card>
      <v-alert color="red lighten-2" dark v-if="isError">
        {{ $t(message) }}</v-alert
      >
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      isDisable: false,
      isError: false,
      message: '',
      rules: {
        orderId: [(v) => !!v || this.$t('ORDERID_IS_REQUIRED')],
        senderName: [(v) => !!v || this.$t('SENDER_NAME_IS_REQUIRED')],
        bank: [(v) => !!v || this.$t('BANK_NAME_IS_REQUIRED')],
        bankAccount: [(v) => !!v || this.$t('BANK_ACCOUNT_IS_REQUIRED')],
        amount: [(v) => !!v || this.$t('AMOUNT_SEND_IS_REQUIRED')],
        image: [(v) => !!v || this.$t('IMAGE_IS_REQUIRED')],
      },
      form: {
        orderId: '',
        senderName: '',
        bank: '',
        bankAccount: '',
        image: null,
        amount: '',
      },
    }
  },
  methods: {
    onSubmit() {
      const formData = new FormData()
      formData.append('orderId', this.form.orderId)
      formData.append('image', this.form.image[0])
      formData.append('senderName', this.form.senderName)
      formData.append('bank', this.form.bank)
      formData.append('bankAccount', this.form.bankAccount)
      formData.append('amount', this.form.amount)

      this.$axios
        .$post(`/payments`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.isDisable = false
          console.log(response.data)
          this.$router.push({
            name: 'cart___' + this.$i18n.locale,
            params: {
              message: 'POST_SUCCESS',
              title: this.form.senderName,
            },
          })
        })
        .catch((error) => {
          this.isError = true
          this.message = error.response.data.message
          this.isDisable = false
        })
    },
  },
  mounted() {
    if (this.$route.params.message === 'ORDERID_IS_REQUIRED') {
      this.message = this.$route.params.message
      this.isError = true
    }
  },
}
</script>
<style>
.text {
  margin: 20px;
}
</style>
