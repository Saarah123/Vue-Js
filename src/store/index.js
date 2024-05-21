import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    users: [],
    filteredUsers: [],
    searchQuery: '',
    currentFilter: 'All',
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
      state.filteredUsers = users;
      console.log('Users List--->:', state.users);
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
      console.log('Search Query set:', state.searchQuery);
    },
    setFilter(state, filter) {
      state.currentFilter = filter;
      console.log('Filter set:', state.currentFilter);
    },
    filterUsers(state) {
      const searchQuery = state.searchQuery.toLowerCase();
      const filter = state.currentFilter.toLowerCase();

      state.filteredUsers = state.users.filter(user => {
        const matchesQuery = searchQuery
          ? ['id', 'name', 'email', 'address.city', 'company.name', 'phone'].some(key => {
              const value = key.split('.').reduce((o, i) => (o ? o[i] : null), user);
              return String(value).toLowerCase().includes(searchQuery);
            })
          : true;

        const matchesFilter =
          filter === 'all'
            ? true
            : ['id', 'name', 'address.city', 'company.name'].some(key => {
                const value = key.split('.').reduce((o, i) => (o ? o[i] : null), user);
                return filter === key;
              });

        return matchesQuery && matchesFilter;
      });
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    searchUsers({ commit }, query) {
      commit('setSearchQuery', query);
      commit('filterUsers');
    },
    setFilterUsers({ commit }, filter) {
      commit('setFilter', filter);
      commit('filterUsers');
    },
  },
  getters: {
    paginatedUsers: (state) => (page, pageSize) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return state.filteredUsers.slice(start, end);
    },
    totalUsers: (state) => state.filteredUsers.length,
  },
});

export default store;
