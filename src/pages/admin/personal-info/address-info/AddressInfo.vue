<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Endereço</div>
        <va-form
          ref="formAddress"
          @validation="validation = $event"
        >
          <div class="row">
            <div class=" tw-flex tw-w-full">
              <div class=" tw-w-2/3 flex md4 sm6 xs12">
                <va-input 
                  v-model="formData.zipcode"
                  type="number"
                  label="CEP"
                  :rules="[fieldsValidations.required, fieldsValidations.maxLength(8) ]"
                >
                </va-input>
              </div>
              <div class=" tw-w-1/3 d-flex tw-justify-center tw-items-center">
                <va-button class="" size="small"> Buscar</va-button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="flex md4 sm6 xs12">
              <va-input 
                v-model="formData.street"
                type="text"
                label="Rua"
                :rules="fieldsValidations.required"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input 
                v-model="formData.number"
                type="text"
                label="Número"
                :rules="fieldsValidations.required"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="formData.complement" type="text" label="Complemento (opcional)">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input 
                v-model="formData.district"
                type="text"
                label="Bairro"
                :rules="fieldsValidations.required"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input 
                v-model="formData.city"
                type="text"
                label="Cidade"
                :rules="fieldsValidations.required"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-select
                label="Estado"
                v-model="formData.estate"
                searchable
                textBy="description"
                :rules="fieldsValidations.required"
                :options="estates"
              />
            </div>

            
          </div>
          <va-button @click="saveFormData($refs.formAddress.validate())" class="mr-2 mb-2"> Salvar</va-button>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>


<script lang="ts">

  import { defineComponent, Ref, ref } from 'vue';
  import { regex } from '../../../../utils/regex';
  //import  formatCPF from '../../../../utils/formatCPF'


  interface FormData{
    zipcode: string;
    streeet: string;
    number: string;
    district: string;
    city: string;
    estate: string;
    complement: string;
  }

  interface Form{
    validate: Function;
  }

  export default defineComponent({
    setup() {


      const formData: Ref<FormData> = ref({
        zipcode: '',
        streeet: '',
        number: '',
        district: '',
        city: '',
        estate: '',
        complement: ''
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
        validation: ref(null),
        estates: ['SP', 'RJ', 'MG', 'ES']
      }      
    },

    methods:{
      saveFormData(validation: boolean){
        console.log(validation);
        console.log(this.formData);
        console.log(this.validation);
      }
    }

   
  })
</script>
