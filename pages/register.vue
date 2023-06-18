<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-3">
        <v-toolbar color="black" dark>Register</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              name="fullname"
              label="Full name"
              type="text"
              color="black"
              light
              :rules="rules.fullname"
              v-model="form.fullname"
            />
            <v-text-field
              name="email"
              label="E-mail"
              type="email"
              color="black"
              light
              :rules="rules.email"
              v-model="form.email"
              @keydown="checkEmaiExist"
            />
            <v-text-field
              name="phoneNumber"
              label="Phone number"
              type="number"
              color="black"
              light
              :rules="rules.phoneNumber"
              v-model="form.phoneNumber"
            />
            <v-text-field
              name="addres"
              label="Addres"
              type="text"
              color="black"
              light
              :rules="rules.addres"
              v-model="form.addres"
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
          <v-btn color="black" dark @click="onSubmit" :disabled="isDisable">
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
        Do You Have an account?
        <v-btn to="/login" plain class="text-btn">Login</v-btn>
      </p>
    </v-col>
  </v-row>
</template>
<script>
export default {
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
        fullname: [(v) => !!v || 'Full Name Is Required'],
        email: [
          (v) => !!v || 'EMAIL Is Required',
          (v) => /.+@.+/.test(v) || 'Email InValid',
          (v) => !this.emailExist || 'EMAIL_EXIST',
        ],
        phoneNumber: [(v) => !!v || 'Phone Number Is Required'],
        addres: [(v) => !!v || 'Addres Is Required'],
        password: [
          (v) => !!v || 'Password Is Required',
          (v) => v.length >= 7 || 'Password Must Be at Least 7 Character',
        ],
        retype_password: [
          (v) =>
            v === this.form.password ||
            'Re password Must Be Same With Password',
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
          .$post('http://localhost:3000/auth/register', this.form)
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
