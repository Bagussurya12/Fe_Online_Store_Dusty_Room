<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4" class="mt-5">
      <v-card class="mb-3">
        <v-toolbar color="black" dark>Register</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              name="fullname"
              label="Nama"
              type="text"
              color="black"
              light
              :rules="rules.fullname"
              v-model="form.fullname"
            />
            <v-text-field
              name="email"
              label="Email"
              type="email"
              color="black"
              light
              :rules="rules.email"
              v-model="form.email"
              @keydown="checkEmaiExist"
            />
            <v-text-field
              name="phoneNumber"
              label="Nomor Handphone"
              type="number"
              color="black"
              light
              :rules="rules.phoneNumber"
              v-model="form.phoneNumber"
            />

            <v-text-field
              name="password"
              label="Password"
              type="password"
              color="black"
              light
              :rules="rules.password"
              v-model="form.password"
            />
            <v-text-field
              name="retype_password"
              label="Re-password"
              type="password"
              color="black"
              light
              :rules="rules.retype_password"
              v-model="form.retype_password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            dark
            @click="onSubmit"
            :disabled="isDisable"
            block
            class="mb-5"
          >
            <span v-if="!isDisable">Register</span>
            <v-progress-circular
              v-else
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Kamu Sudah Memiliki Akun?
        <v-btn to="/login" plain class="text-btn">Login</v-btn>
      </p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ['unauthenticated'],
  data() {
    return {
      emailExist: false,
      isDisable: false,
      form: {
        fullname: '',
        email: '',
        phoneNumber: '',
        addres: '',
        password: '',
        retype_password: '',
      },
      rules: {
        fullname: [(v) => !!v || this.$t('Full_Name_Is_Required')],
        email: [
          (v) => !!v || this.$t('Email_Is_Required'),
          (v) => /.+@.+/.test(v) || this.$t('Email_InValid'),
          (v) => !this.emailExist || this.$t('EMAIL_EXIST'),
        ],
        phoneNumber: [(v) => !!v || this.$t('Phone_Number_Is_Required')],

        password: [
          (v) => !!v || this.$t('Password_Is_Required'),
          (v) =>
            v.length >= 7 || this.$t('Password_Must_Be_at_Least_7_Character'),
        ],
        retype_password: [
          (v) =>
            v === this.form.password ||
            this.$t('Re_Password_Must_Be_Same_With_Password'),
        ],
      },
    }
  },
  methods: {
    checkEmaiExist() {
      this.emailExist = false
    },
    onSubmit() {
      ;(this.isDisable = true),
        this.$axios
          .$post('/auth/register', this.form)
          .then((response) => {
            this.isDisable = false
            // REDIRECT TO LOGIN PAGE
            this.$router.push('/login')
          })
          .catch((error) => {
            this.isDisable = false
          })
    },
  },
}
</script>

<style>
.text-btn {
  font-weight: bold;
}
</style>
