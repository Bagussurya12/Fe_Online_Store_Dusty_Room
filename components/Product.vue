<template>
  <v-row>
    <v-container>
      <v-row justify="center" class="searchBar">
        <v-col cols="8">
          <div width="400px">
            <v-autocomplete
              label=" Search Products"
              placeholder="Start Typing To Search"
              :search-input.sync="search"
              :loading="isLoading"
              color="black"
              light
              :items="itemSearch"
              item-text="title"
              item-value="_id"
              v-model="selectedSearch"
              return-object
              clearable
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-subtitle color="red"
                    >Produk yang kamu cari tidak ada, cari dengan keyword yang
                    lain Ya!</v-list-item-subtitle
                  >
                </v-list-item>
              </template>
            </v-autocomplete>
          </div>
        </v-col>
        <v-col cols="2">
          <v-menu>
            <template v-slot:activator="{ on: category }">
              <v-btn v-on="category" color="black" dark> Category </v-btn>
            </template>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category._id"
                  :disabled="category._id == categoryId"
                  @change="updateCategoryId(category._id)"
                >
                  <v-list-item-title>{{ category.title }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-5">
        <v-col
          cols="4"
          v-for="(product, index) in filteredProducts"
          :key="index"
          class="mt-8 produk mb-8"
        >
          <v-card class="mx-auto" max-width="344">
            <v-img
              :src="require(`../../Beckend-store/images/${product.image}`)"
              height="300px"
              cover
            ></v-img>
            {{ products.image }}

            <v-card-title :title="product.title">
              {{ product.title }}
            </v-card-title>

            <v-card-subtitle :subtitle="product.price">
              Rp.{{ currency(product.price) }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="black"
                variant="text"
                dark
                :ripple="true"
                @click="addToCart(product._id)"
                class="mb-3"
              >
                <h5 @click="onSubmit">Pesan Sekarang</h5>
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>

            <v-expand-transition>
              <div>
                <v-divider></v-divider>

                <v-card-text :description="product.description">
                  {{ product.description }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false,
      search: null,
      isLoading: false,
      itemSearch: [],
      selectedSearch: null,
    }
  },
  methods: {
    ...mapActions({
      updateCategoryId: 'products/updateCategoryId',
      fetchProducts: 'products/fetchProducts',
      fetchCategories: 'products/fetchCategories',
      addToCart: 'carts/addToCart',
    }),
    resetSearchCategory() {
      this.categoryId = false
    },
    onSubmit() {
      const isLogin = this.$route.meta.unauthenticated
      if (isLogin) {
        this.$router.push({
          name: 'login___' + this.$i18n.locale,
        })
      } else {
        this.$router.push({
          name: 'order___' + this.$i18n.locale,
        })
      }
    },
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
  },
  computed: {
    filteredProducts() {
      if (this.categoryId) {
        return this.products.filter((s) => s.categoryId == this.categoryId)
      } else if (this.selectedSearch) {
        return this.products.filter((s) => s.title == this.selectedSearch.title)
      }
      return this.products
    },
    ...mapState('products', {
      products: 'products',
      categories: 'categories',
      categoryId: 'categoryId',
    }),
  },
  watch: {
    search(val) {
      console.log(val)
      this.isLoading = true
      setTimeout(() => {
        this.itemSearch = this.products.filter((e) => {
          this.isLoading = false
          this.resetSearchCategory()
          return e.title
        })
      }, 1000)
    },
  },
  mounted() {
    this.fetchProducts()
    this.fetchCategories()
  },
}
</script>
<style>
/* .v-btn.v-btn {
  background-color: black;
  color: white;
} */
.produk {
  padding: 5px;
}
.searchBar {
  margin-top: 30px;
}
.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: red;
}
</style>
