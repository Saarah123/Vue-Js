<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="searchQuery"
            @input="searchUsers"
            label="Search users..."
            class="mb-4"
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="6">
          <v-select
            v-model="selectedFilter"
            :items="filterOptions"
            label="Filter by"
            class="mb-4"
          ></v-select>
        </v-col> -->
      </v-row>
      <v-data-table
        :headers="headers"
        :items="paginatedUsers"
        :items-per-page="pageSize"
        :page.sync="page"
        :server-items-length="totalUsers"
        class="elevation-1"
      ></v-data-table>
      <v-pagination
        v-model="page"
        :length="Math.ceil(totalUsers / pageSize)"
        class="mt-4"
      ></v-pagination>
    </v-container>
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
        filterOptions: ['All','ID', 'Title', 'Body'], 
        headers: [
            { title: 'ID', key: 'id', align: 'start', sortable: true },
        { title: 'Title', key: 'title', align: 'start' , sortable: true},
        { title: 'Body', key: 'body', align: 'start', sortable: true },
        ],
      };
    },
  
    computed: {
      ...mapGetters(['totalUsers']),
      ...mapState(['searchQuery', 'filteredUsers']),
      paginatedUsers() {
        return this.$store.getters.paginatedUsers(this.page, this.pageSize);
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
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
 
  