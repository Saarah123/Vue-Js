<template>
  <v-app>
    <v-main>
      <v-card title="Assignment">
       
       
      </v-card>
      <v-container>          
            <Dialog/>
            <FormDialog/>
           <UserList />
       
       
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserList from './components/list.vue';
import Dialog from './components/dialog.vue'
import FormDialog from './components/formDialog.vue'

export default {

  components: {
    UserList,
    FormDialog,
    
    Dialog
  },
};
</script>

