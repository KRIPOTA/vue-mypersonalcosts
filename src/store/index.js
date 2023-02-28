import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [
      { id: 1, date: "01.01.2022", name: "Transport", value: 169, isShown: false },
      { id: 2, date: "01.01.2022", name: "Food", value: 290, isShown: false },
      { id: 3, date: "01.01.2022", name: "Education", value: 500, isShown: false },
      { id: 4, date: "01.01.2022", name: "Sport", value: 300, isShown: false },
      { id: 4, date: "01.01.2022", name: "Navigation", value: 350, isShown: false },
    ],
    pageList: [1],
    page: 1,
    perPage: 5,
    categoryList: ['Transport', 'Food', 'Education', 'Sport', 'Navigation', 'Entertaiment'],
    values: {
      newId: 1,
      newDate: '',
      newCategory: '',
      newValue: '',
    },
    showCharts: true,
  },
  getters: {
    getList: (state) => {
      const pageCount = state.list.length / state.perPage;
      const startIdx = (state.page - 1) * state.perPage;
      const endIdx = (startIdx + state.perPage <= state.list.length) ? startIdx + state.perPage : state.list.length;
      return state.list.slice(startIdx, endIdx);
    },
    getPage: (state) => state.page,
    getPageList: (state) => state.pageList,
    getCategoryList: (state) => state.categoryList,
  },
  mutations: {
    addList: (state, payload) => state.list.push(payload),
    addPageList: (state, payload) => state.pageList.push(payload),
    setPage: (state, pageNum) => (state.page = pageNum),
    setValues(state, values) {
      state.values = Object.assign({}, state.values, values);
    }
  },
  actions: {
  },
  modules: {
  }
})
