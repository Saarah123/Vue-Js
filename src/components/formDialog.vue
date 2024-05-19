<template>
    <v-container>
      <v-row justify="space-around">
        <v-col cols="12" md="4">
          <v-dialog
            transition="dialog-bottom-transition"
            width="auto"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                text="Open Form"
                block
              ></v-btn>
            </template>
  
            <template v-slot:default="{ isActive }">
              <v-card hover>
              
  
                <v-card-text class="pa-12">
                <Form/>
                </v-card-text>
  
                <v-card-actions class="justify-end">
                   
                  <v-btn
                    text="Close"
                    @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
  
      
      </v-row>
    </v-container>
  </template>


  <script>

import Form from './form.vue';



export default {

  components: {
    
    Form
  },
};
</script>