import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    users: [],
    filteredUsers: [],
    searchQuery: '', 
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
    setFilterUsers(state) {
      const searchQuery = state.searchQuery.toLowerCase();
      if (searchQuery) {
        state.filteredUsers = state.users.filter(user =>
          ['userId', 'id', 'title', 'body'].some(key =>
            String(user[key]).toLowerCase().includes(searchQuery)
          )
        );
      } else {
        state.filteredUsers = state.users;
      }
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    searchUsers({ commit }, query) {
      commit('setSearchQuery', query);
      commit('setFilterUsers', query);
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
