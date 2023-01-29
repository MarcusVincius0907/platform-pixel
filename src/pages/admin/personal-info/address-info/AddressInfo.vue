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
              <div class=" tw-w-1/3 tw-flex tw-justify-start tw-items-center">
                <va-button class="" size="small" @click="getAddressByZipcode()"> Buscar</va-button>
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
              <va-input 
                label="Estado"
                v-model="formData.estate"
                type="text"
                :rules="fieldsValidations.required"
              >
              </va-input>
            </div>

            
          </div>
          <va-button v-if="!hideSaveButton" @click="saveFormData($refs.formAddress.validate())" class="mr-2 mb-2"> Salvar</va-button>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>


<script lang="ts">

  import UserService from '@/services/userService';
  import { MutationsType } from '@/store/modules/PersonalInfo/mutations';
  import { ActionTypes } from '@/store/modules/PersonalInfo/actions';
  import { AddressInfo } from '@/types/User';
  import {defineComponent, Ref, ref } from 'vue';
  import { regex } from '../../../../utils/regex';
  //import  formatCPF from '../../../../utils/formatCPF'

  interface Form{
    validate: Function;
  }

  export default defineComponent({

    props:{
      hideSaveButton: Boolean
    },

    setup() {


      const formData: Ref<AddressInfo> = ref({
        zipcode: '',
        street: '',
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
        userService: ref<UserService>(),
        timeout: ref(0)
      }      
    },

    computed: {
      formAddressInfo(){
        return this.$store.state.PersonalInfo.formAddressInfo
      }
    },

    methods:{
      getAddressByZipcode(){
        if(this.formData && this.formData.zipcode)
          {this.$store.dispatch(ActionTypes.REQUEST_ADDRESS_BY_ZIPCODE, this.formData.zipcode)}
      },

      validate(){
        return this.$refs.formAddress.validate()
      }
    },

    watch:{
      formAddressInfo(nValue, oValue){
        console.log('form has changed', nValue);
        this.formData = nValue
      },

      formData: {
        handler(nValue, oValue) {

          if(this.timeout)
            {clearTimeout(this.timeout)}

          this.timeout = setTimeout(() => {
            this.$store.commit(MutationsType.SET_FORM_ADDRESS_INFO, nValue)
          }, 300);

        },
        deep: true
      }
    }

   
  })
</script>
