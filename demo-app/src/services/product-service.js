



module.exports = {
  getOne(id) {
    return {id, name: 'stub'};
  },

  getAll() {
    return [
      {id: '1', name: 'stub'},
      {id: '2', name: 'stub'}
    ]
  },

  create(product) {
    return {...product, id: '1'};
  }
};