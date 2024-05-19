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
                text="Parent-Child"
                block
                hover
              ></v-btn>
            </template>
  
            <template v-slot:default="{ isActive }">
              <v-card>
              
  
                <v-card-text class="text-h3 pa-12">
                  <ParentComponent/>
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
  
        <v-col cols="12" md="4">
          <v-dialog
            transition="dialog-top-transition"
            width="auto"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                text="Child - Parent"
                block
                hover
              ></v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
              
  
                <v-card-text class="text-h3 pa-12">
                  <ChildComponent/>
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

        <v-col cols="12" md="4">
            <v-dialog
              transition="dialog-bottom-transition"
              width="auto"
            >
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  text="Child - Child"
                  block
                  hover
                ></v-btn>
              </template>
    
              <template v-slot:default="{ isActive }">
                <v-card>
                 
    
                  <v-card-text class="text-h3 pa-12">
                    <Child/>
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


import ParentComponent from './communication/Parent_Child/parent.vue';
import ChildComponent from './communication/Child_Parent/child.vue';
import Child from './communication/Child_Child/child1.vue';

export default {

components: {
 
  ParentComponent,
  ChildComponent,
  Child,
  
},
};
</script>

<style>
/* Add your styles here */
</style>