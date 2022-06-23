<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Dados de Pagamento</div>
        
        <div class="row">
          <div class="flex xs12">
            <div class="table-wrapper">
              <table class="va-table va-table--striped va-table--hoverable">
                <thead>
                  <tr>
                    <th>Apelido</th>
                    <th>Dados</th>
                    <th>Deletar</th>
                    
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td><va-button class="mr-2 mb-2" color="danger" size="small"> <i class="fa-solid fa-trash"></i></va-button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="mt-5 tw-font-bold">Adicionar Novo Cartão</div>
        
        <div class="row" >
          
          <div class="flex xs12">
            <va-form
              ref="formBank"
              @validation="validation = $event"
            >
              <div class="row">
                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.nickname"
                    type="text"
                    label="Apelido"
                    :rules="fieldsValidations.required"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input 
                    v-model="formData.cardName" 
                    type="text" 
                    label="Agência"
                    :rules="fieldsValidations.required"  
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.cardNumber"
                    type="text"
                    label="Banco"
                    :rules="[fieldsValidations.required, fieldsValidations.number]"
                  >
                  </va-input>
                </div>

                

                <div class="flex md4 sm6 xs12">
                 
                  <va-date-input
                    v-model="formData.expirationDate"
                    label="Data de expiração"
                    :rules="fieldsValidations.required"
                  />
                </div>

               
              </div>
              <va-button @click="saveFormData($refs.formBank.validate())" class="mr-2 mb-2"> Adicionar</va-button>
            </va-form>
          </div>
        </div>
        
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
  import data from "@/data/tables/markup-table/data.json";
  import { defineComponent, Ref, ref } from 'vue';
  import { regex } from '../../../../utils/regex';

  interface FormData{
    nickname: string;
    cardNumber: string;
    cardName: string;
    expirationDate: string;
  } 

  

  export default defineComponent({
    setup() {
      const formData: Ref<FormData> = ref({
        nickname:'',
        cardNumber:'',
        cardName:'',
        expirationDate:'',
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
        tabTitles: ["Dados Bancários", "Chave Pix"],
        tabValue: ref(1),
        users: ref(data.slice(0, 8)),
      }      
    },
   
    methods: {
      saveFormData(validation: boolean){
        console.log(this.validation);
      }
    }
  });
</script>
