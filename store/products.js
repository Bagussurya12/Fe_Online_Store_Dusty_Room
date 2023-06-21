export const state = () => ({
  products: [],
  categories: [{ _id: false, title: 'All-Products' }],
  categoryId: 0,
})
export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId
  },
  updateProducts(state, products) {
    state.products = products
  },
  updateCategories(state, categories) {
    state.categories.push(...categories)
  },
}

export const actions = {
  updateCategoryId({ commit }, categoryId) {
    commit('updateCategoryId', categoryId)
  },
  fetchProducts({ commit }) {
    return this.$axios.$get('/products').then((response) => {
      commit('updateProducts', response.products)
      // console.log(response)
    })
  },
  fetchCategories({ commit }) {
    return this.$axios.$get('/categories').then((response) => {
      commit('updateCategories', response.categories)
    })
  },
}
