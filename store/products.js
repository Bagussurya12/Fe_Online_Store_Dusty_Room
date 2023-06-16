export const state = () => ({
  products: [
    {
      id: 1,
      title: 'Kaos Polos 24s',
      price: 420.0,
      thumbnail: 'kaospolos.jpeg',
      description: 'Kaos Ini dengan harga perlusin, bahan cotton combed 24s',
      categoryId: 1,
    },
    {
      id: 2,
      title: 'Kaos Polos 30s',
      price: 420000,
      thumbnail: 'kaosPolos30s.jpeg',
      description: 'Kaos Ini dengan harga perlusin, bahan cotton combed 30s',
      categoryId: 1,
    },
    {
      id: 3,
      title: 'Kaos Sablon DTF',
      price: 750000,
      thumbnail: 'kaosSablon.jpeg',
      description: 'Kaos Ini dengan harga perlusin, bahan cotton combed 30s',
      categoryId: 1,
    },
    {
      id: 4,
      title: 'Kaos Sablon Plastisol',
      price: 750000,
      thumbnail: 'plastisol.jpeg',
      description: 'Kaos Ini dengan harga perlusin, bahan cotton combed 30s',
      categoryId: 1,
    },
    {
      id: 5,
      title: 'Kaos Sablon Rubber',
      price: 750000,
      thumbnail: 'rubber.jpeg',
      description: 'Kaos Ini dengan harga perlusin, bahan cotton combed 30s',
      categoryId: 1,
    },
    {
      id: 6,
      title: 'Tote Bag',
      price: 420000,
      thumbnail: 'ToteBag.jpeg',
      description: 'Kaos Ini dengan harga perlusin, bahan Premium',
      categoryId: 2,
    },
    {
      id: 7,
      title: 'Sling Bag',
      price: 420000,
      thumbnail: 'slingBag.png',
      description: 'Tas Ini dengan harga perlusin, bahan Premium',
      categoryId: 2,
    },
    {
      id: 8,
      title: 'Lanyard',
      price: 420000,
      thumbnail: 'lanyard.jpeg',
      description: 'Lanyard Ini dengan harga perlusin, bahan Premium',
      categoryId: 2,
    },
    {
      id: 9,
      title: 'Hoodie',
      price: 420000,
      thumbnail: 'hoodie.png',
      description: 'Jacket Hoodie Ini dengan harga perlusin, bahan Premium',
      categoryId: 3,
    },
    {
      id: 10,
      title: 'Crewneck',
      price: 420000,
      thumbnail: 'crewNeck.jpeg',
      description: 'Jacket Crewneck Ini dengan harga perlusin, bahan Premium',
      categoryId: 3,
    },
  ],
  categories: [
    { id: false, title: 'All-Products' },
    { id: 1, title: 'T-Shirt' },
    { id: 2, title: 'Accsesories' },
    { id: 3, title: 'Jacket' },
  ],
  categoryId: 0,
})
export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId
  },
}

export const actions = {
  updateCategoryId({ commit }, categoryId) {
    commit('updateCategoryId', categoryId)
  },
}
