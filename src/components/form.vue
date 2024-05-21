<template>
  <div>
    <form @submit.prevent="validateAndSubmit">
      <h3>Form</h3>

      <div v-for="block in blocks" :key="block.token">
        <label :for="block.token">{{ block.props.title }}</label>
        <input
          v-if="block.type === 'checkbox' || block.type === 'text' || block.type === 'date'"
          :id="block.token"
          :placeholder="block.props.placeholder"
          v-model="form[block.token]"
          :type="block.type"
          class="form-control"
        />
        <span v-if="errors[block.token]">{{ errors[block.token] }}</span>
      </div>
      <button type="submit" class="submit-btn">Submit</button>
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
      console.log('Form values before validation:', form.value);

      const schema = Yup.object().shape({
        PERSON_NAME: Yup.string().required('Name is required'),
        IS_PERSON_MINOR: Yup.boolean(),
        PERSON_DOB: Yup.string().when('IS_PERSON_MINOR', {
          is: true,
          then: (schema) => schema.required('DOB is required for minors'),
          otherwise: (schema) => schema.nullable(),
        }),
      });

      try {
        await schema.validate(form.value, { abortEarly: false });
        alert('Form submitted successfully');
        console.log('Form data after successful validation:', form.value);
        errors.value = {};
      } catch (err) {
        const validationErrors = {};
        if (err.inner) {
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
        }
        errors.value = validationErrors;
        alert('There are errors in the form');
        console.log('Validation errors:', err);
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

  transform: scale(1.5);

}

.submit-btn {
  margin-top: 3rem;
}
</style>


<style scoped>
span {
  color: red;
  display: block;
  margin-top: 0.5rem;
}

.small-checkbox {
  transform: scale(1.5);
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: #007bff;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin-top: 2rem;
  cursor: pointer;
  text-align: center;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>