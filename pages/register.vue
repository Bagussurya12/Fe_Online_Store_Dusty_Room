<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Register</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field name="name" label="Full name" type="text" />
            <v-text-field name="email" label="E-mail" type="email" />
            <v-text-field
              name="phoneNumber"
              label="Phone number"
              type="number"
            />
            <v-text-field name="addres" label="Addres" type="text" />
            <v-text-field name="password" label="Password" type="password" />
            <v-text-field
              name="repassword"
              label="Re-password"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" dark>Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
