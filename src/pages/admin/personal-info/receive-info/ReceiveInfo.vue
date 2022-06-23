<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Dados de Recebimento</div>
        
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
        <div class="mt-5 tw-font-bold">Adicionar Novo</div>
        <div class="row">
          <div class="flex xs12">
            <va-tabs grow v-model="tabValue" style="width: 100%;">
              <template #tabs>
                <va-tab v-for="title in tabTitles.slice(0, 3)" :key="title">
                  {{ title }}
                </va-tab>
              </template>
            </va-tabs>
          </div>
        </div>
        <div class="row" v-if="tabValue === 1">
          
          <div class="flex xs12">
            <va-form
              ref="formBank"
              @validation="validation = $event"
            >
              <div class="row">
                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formDataBank.nickname"
                    type="text"
                    label="Apelido"
                    :rules="fieldsValidations.required"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formDataBank.bankName"
                    type="text"
                    label="Banco"
                    :rules="fieldsValidations.required"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input 
                    v-model="formDataBank.agency" 
                    type="text" 
                    label="Agência"
                    :rules="fieldsValidations.required"  
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formDataBank.account"
                    type="text"
                    label="Conta"
                    :rules="fieldsValidations.required"  
                  >
                  </va-input>
                </div>

               
              </div>
              <va-button @click="saveFormData($refs.formBank.validate())" class="mr-2 mb-2"> Adicionar</va-button>
            </va-form>
          </div>
        </div>
        <div class="row" v-if="tabValue === 2">
          
          <div class="flex xs12">
            <va-form
              ref="formPix"
              @validation="validation = $event"
            >
              <div class="row">
                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formDataPix.nickname"
                    type="text"
                    label="Apelido"
                    :rules="fieldsValidations.required"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formDataPix.pixKey"
                    type="text"
                    label="Chave"
                    :rules="fieldsValidations.required"
                  >
                  </va-input>
                </div>
               
              </div>
              <va-button  @click="saveFormData($refs.formPix.validate())" class="mr-2 mb-2"> Adicionar</va-button>
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
    bankName?: string;
    agency?: string;
    account?: string;
    birthDate?: string;
    pixKey?: string;
  } 

  

  export default defineComponent({
    setup() {
      const formDataBank: Ref<FormData> = ref({
        nickname: '',
        bankName: '',
        agency: '',
        account: '',
        birthDate: '',
      })

      const formDataPix: Ref<FormData> = ref({
        nickname: '',
        pixKey: ''
      })

      const fieldsValidations = {
        required: [(value: string) => (!!value && value.length > 0) || 'Campo é requirido'],
        email: [(value: string) => (regex.email.test(value)) || 'Email inválido'],
        cpf: [(value: string) => (regex.cpf.test(value)) || 'CPF inválido'],
        maxLength: (length: number) => [(value: string) => (value.length <= length) || `O limite é de ${length} caracteres`],
        number: [(value: number) => (Number(value)) || 'Só é permitido números']
        
      }

      return{
        formDataBank,
        formDataPix,
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
