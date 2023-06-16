<template>
  <v-row>
    <v-row justify="center" class="searchBar">
      <v-col cols="8">
        <v-autocomplete
          label=" Search Products"
          placeholder="Start Typing To Search"
          :search-input.sync="search"
          :loading="isLoading"
          color="black"
          light
          :items="itemSearch"
          item-text="title"
          item-value="id"
          v-model="selectedSearch"
          return-object
          hide-no-data
        >
        </v-autocomplete>
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
                :value="category.id"
                :disabled="category.id == categoryId"
                @change="updateCategoryId(category.id)"
              >
                <v-list-item-title>{{ category.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="4"
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="mt-8 produk mb-8"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="require(`@/assets/images/products/${product.thumbnail}`)"
            height="200px"
            cover
          ></v-img>

          <v-card-title :title="product.title">
            {{ product.title }}
          </v-card-title>

          <v-card-subtitle :subtitle="product.price">
            {{ product.price }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="black" variant="text" dark :ripple="true">
              Order
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn small color="black" @click="show = !show" :ripple="true">
              Desc
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text :description="product.description">
                {{ product.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
    ...mapActions('products', {
      updateCategoryId: 'updateCategoryId',
    }),
    resetSearchCategory() {
      this.categoryId = false
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
}
</script>
<style>
.v-btn.v-btn {
  background-color: black;
  color: white;
}
.produk {
  padding: 5px;
}
.searchBar {
  margin-top: 30px;
}
</style>
