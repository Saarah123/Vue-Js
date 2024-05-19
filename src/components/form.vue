<template>
    <div>
      <form @submit.prevent="validateAndSubmit">
        <div v-for="block in blocks" :key="block.token">
          <label :for="block.token">{{ block.props.title }}</label>
          
         
          <v-text-field 
          :label="block.props.placeholder" 
          variant="outlined"  
          v-model="form[block.token]" 
          :type="block.type" 
          v-if="block.type === 'checkbox' || block.type === 'text' || block.type === 'date'"
          class="small-checkbox"
        ></v-text-field>
        

          
         
        </div>
        <v-btn variant="tonal" type="submit" :class="submit-btn">Submit</v-btn>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import * as Yup from 'yup';
  
  export default {
    name: 'DynamicForm',
    setup() {
      const blocks = ref([
        {
          token: 'PERSON_NAME',
          type: 'text',
          props: {
            title: 'Enter your name',
            required: true,
            placeholder: 'e.g. John Doe',
          },
        },
        {
          token: 'IS_PERSON_MINOR',
          type: 'checkbox',
          props: {
            title: 'Is the current person minor?',
            default: false,
          },
        },
        {
          token: 'PERSON_DOB',
          type: 'date',
          props: {
            title: 'Enter your DOB',
            required: 'IS_PERSON_MINOR',
            placeholder: 'e.g. 01/01/2000',
          },
        },
      ]);
  
      const form = ref({
        PERSON_NAME: '',
        IS_PERSON_MINOR: false,
        PERSON_DOB: '',
      });
  
      const errors = ref({});
  
      const validateAndSubmit = async () => {
        const schema = Yup.object().shape({
          PERSON_NAME: Yup.string().required('Name is required'),
          IS_PERSON_MINOR: Yup.boolean(),
          PERSON_DOB: Yup.string().when('IS_PERSON_MINOR', {
            is: true,
            then: Yup.string().required('DOB is required for minors'),
            otherwise: Yup.string().nullable(),
          }),
        }).test(
          'dob-checkbox-validation',
          'Please select the checkbox if you have entered DOB, and vice versa',
          (values) => {
            if (values.PERSON_DOB && !values.IS_PERSON_MINOR) {
              return false;
            }
            if (values.IS_PERSON_MINOR && !values.PERSON_DOB) {
              return false;
            }
            return true;
          }
        );
  
        try {
          await schema.validate(form.value, { abortEarly: false });
          alert('Form submitted successfully');
       
          console.log('Form data after successful validation:', form.value);
        } catch (err) {
          const validationErrors = {};
          if (err.inner) {
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
          }
          errors.value = validationErrors;
          alert('There are errors in the form');
         
          console.log('Validation errors:', errors.value);
        }
      };
  
      return {
        blocks,
        form,
        errors,
        validateAndSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  span {
    color: red;
    display: block;
  }
  .small-checkbox input[type="checkbox"] {
    /* Define smaller size properties for the checkbox input */
    transform: scale(0.75); /* Adjust the scale as needed */
  }
  .submit-btn{
    margin-top: 3rem;
  }
  </style>
  