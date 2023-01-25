<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Informações Gerais</div>
        <va-form
          ref="form"
          @validation="validation = $event"
        >
          <div class="row">
            <div class="flex md4 sm6 xs12">
              <va-input 
                v-model="formData.email"
                type="email"
                label="Email"
                :rules="[fieldsValidations.required, fieldsValidations.email]"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input
                v-model="formData.name"
                type="text"
                label="Nome Completo"
                :rules="fieldsValidations.required"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input 
                v-model="formData.cpf"
                :value = "hello"
                type="text"
                label="CPF"
                :rules="[fieldsValidations.required, fieldsValidations.cpf, fieldsValidations.maxLength(11) ]"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input
                v-model="formData.cell"
                type="text" 
                label="Celular"
                :rules="[fieldsValidations.required,  fieldsValidations.maxLength(13), fieldsValidations.number]"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
             
             
              <!--  <va-input
                v-model="formData.birthDate"
                type="text"
                label="Data de Nascimento"
                :rules="fieldsValidations.required"
              >
              </va-input> -->
              <va-date-input
                v-model="formData.birthDate"
                label="Data de Nascimento"
                :rules="fieldsValidations.required"
              />
             
              
              
             
            </div>
          </div>
          
          <va-button v-if="!hideSaveButton" @click="saveFormData($refs.form.validate())" class="mr-2 mb-2"> Salvar</va-button>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">

  import { GeneralInfo } from '@/types/User';
  import { defineComponent, Ref, ref } from 'vue';
  import { regex } from '../../../../utils/regex';
  

  export default defineComponent({

    props:{
      hideSaveButton: {
        type: Boolean,
        default: false
      }
    },

    setup() {

      const formData: Ref<GeneralInfo> = ref({
        email: '',
        name: '',
        cpf: '',
        cell: '',
        birthDate: '' 
      })

      const fieldsValidations = {
        required: [(value: string) => (!!value && value.length > 0) || 'Campo é requirido'],
        email: [(value: string) => (regex.email.test(value)) || 'Email inválido'],
        cpf: [(value: string) => (regex.cpf.test(value)) || 'CPF inválido'],
        maxLength: (length: number) => [(value: string) => (value.length <= length) || `O limite é de ${length} caracteres`],
        number: [(value: number) => (Number(value)) || 'Só é permitido números']
        
      }

      return{
        formData,
        fieldsValidations,
        validation: ref(null)
      }      
    },

    methods:{
      saveFormData(validation: boolean){
        console.log(this.$store.state);
        if(validation){
          this.$store.commit('setFormGeneralInfo', this.formData)
        }
      }
    }

   
  })
</script>
