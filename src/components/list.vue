<template>
  <div  class="row">
    <div class="col-4">
      <input
        v-model="searchQuery"
        @input="searchUsers"
        type="text"
        placeholder="Search users..."
        class="form-control"
      />
    </div>
    <!-- Uncomment if filter functionality is needed -->
    <div class="col-4">
      <select
        v-model="selectedFilter"
        @change="handleFilterChange"
        class="form-control"
      >
        <option v-for="option in filterOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
  <div class="container">
  
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.title }}</td>
              <td>{{ user.body }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>  
  </div>
  <div class="row">

    <div class="col-12">
      <button class="button" @click="changePage(page - 1)" :disabled="page === 1">Previous</button>
      <button class="button" @click="changePage(page + 1)" :disabled="page === totalPages">Next</button>
    </div>
  </div>
</template>

  
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      page: 1,
      pageSize: 5,
      searchQuery: '', 
      selectedFilter: 'All', 
      filterOptions: ['All', 'ID', 'Title', 'Body'], 
    };
  },
  computed: {
    ...mapGetters(['totalUsers']),
    ...mapState(['searchQuery', 'filteredUsers']),
    paginatedUsers() {
      return this.$store.getters.paginatedUsers(this.page, this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.totalUsers / this.pageSize);
    },
  },
  methods: {
    ...mapActions(['fetchUsers', 'searchUsers']),
    searchUsers() {
      this.$store.dispatch('searchUsers', this.searchQuery);
    },
    handleFilterChange() {
      this.$store.dispatch('setSearchQuery', '');
      this.$store.dispatch('setFilterUsers', this.selectedFilter);
    },
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.totalPages) {
        this.page = newPage;
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>
.container {
  padding: 20px;
}
.row{
  display:flex;
  gap:5px;
  margin-left:10%
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
.pagination {
  display: flex;
  gap:10px;
}
.button{
  border: 1px solid black;
  background-color: rgb(144, 184, 233);
  height: 50px;
  width: 100px;
  border-radius: 2px;
  margin-right:10px
}
</style>

  
 
  