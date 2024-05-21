<template>


  <div class="container">

    <div class="box-container">
      <ParentComponent />
    </div>
    <div class="box-container">
      <ChildComponent />
    </div>
    <div class="box-container">
      <Child />
    </div>

  </div>



  <UserList />
  <div class="form">
    <Form />
  </div>

</template>

<script>
import UserList from './components/list.vue';
import Form from './components/form.vue'
import ParentComponent from './components/communication/Parent_Child/parent.vue';
import ChildComponent from './components/communication/Child_Parent/child.vue';
import Child from './components/communication/Child_Child/child1.vue';


export default {

  components: {
    UserList,
    Form,
    ParentComponent,
    ChildComponent,
    Child
  },
};
</script>


<style>
.container {
  display: flex;
  gap: 20%;
  margin-left: 5%;
}

.box-container {
  border: 1px solid black;
  padding: 10px;
  margin-top: 5%;
  background-color: lavender;
}

.form {
  margin: 5% 10% 5% 30%;
  height: 300px;
  width: 500px;


}
</style>