<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Informações Gerais</div>
        <va-form>
          <div class="row">
            <div class="flex md4 sm6 xs12">
              <va-input v-model="v$.email.$model" type="email" label="Email">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input
                v-model="v$.name.$model"
                type="text"
                label="Nome Completo"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="v$.cpf.$model" type="text" label="CPF">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="v$.cell.$model" type="text" label="Celular">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
             
             
              <va-input
                v-model="v$.birthDate.$model"
                type="text"
                label="Data de Nascimento"
                :rules="[value => (value && value.length > 0) || 'Field is required']"
              >
              </va-input>
             
              
              
              <div
                v-for="(error, i) in v$.birthDate.$errors"
                :key="i"
              >
                <div class="tw-text-red-500 tw-text-sm tw-mt-1">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
          <va-button class="mr-2 mb-2"> Salvar</va-button>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">

  import { defineComponent, Ref, ref } from 'vue';

  import useVuelidate from '@vuelidate/core'
  import { required, email, maxLength } from '@vuelidate/validators'

  interface FormData{
    email: string;
    name: string;
    cpf: string;
    cell: string;
    birthDate: string;
  }

  export default defineComponent({
    setup() {

      const validationRules = {
        email: { required, email }, 
        name: { required }, 
        cpf: { required, maxLength: 11 },
        cell: { required },
        birthDate: { required }
      }

      const formData: Ref<FormData> = ref({
        email: '',
        name: '',
        cpf: '',
        cell: '',
        birthDate: ''
      })

      const v$ = useVuelidate(validationRules, formData)
      return{
        v$,
        formData
      }      
    },

   
  })
</script>
