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
            <form>
              <div class="row">
                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="successfulEmail"
                    type="text"
                    label="Apelido"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="successfulEmail"
                    type="text"
                    label="Número"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input v-model="successfulEmail" type="text" label="Titular">
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="successfulEmail"
                    type="text"
                    label="Data de Expiração"
                  >
                  </va-input>
                </div>

               
              </div>
              <va-button class="mr-2 mb-2"> Adicionar</va-button>
            </form>
          </div>
        </div>
        
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import data from "@/data/tables/markup-table/data.json";

export default defineComponent({
  setup() {
    console.log("hello");
  },
  data() {
    return {
      tabTitles: ["Dados Bancários", "Chave Pix"],
      tabValue: 1,
      users: data.slice(0, 8),
      isMale: true,
      chosenCountry: "",
      simple: "",
      withIcon: "",
      withButton: "",
      withDescription: "",
      clearableText: "Vasili Savitski",
      successfulEmail: "andrei@dreamsupport.io",
      wrongEmail: "andrei@dreamsupport",
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
          "incididunt ut labore et dolore magna aliqua."
      ],
      errorMessages: ["Field should contain a valid email"],
      simpleOptions: [
        {
          id: 1,
          description: "First option"
        },
        {
          id: 2,
          description: "Second option"
        },
        {
          id: 3,
          description: "Third option"
        }
      ],
      simpleSelectModel: "",
      multiSelectModel: [],
      multiSelectCountriesModel: [],
      searchableSelectModel: "",
      multiSearchableSelectModel: [],
      radioSelectedOption: "option1",
      radioSelectedDisableOption: "option1",
      checkbox: {
        unselected: false,
        selected: true,
        readonly: true,
        disabled: true,
        error: false,
        errorMessages: true
      },
      toggles: {
        unselected: false,
        selected: true,
        disabled: true,
        small: false,
        large: false
      },
      datepicker: {
        simple: "2018-05-09",
        time: "2018-05-08 14:10",
        range: "2018-05-08 to 2018-05-23",
        disabled: "2018-05-09",
        multiple: "2018-04-25, 2018-04-27",
        customFirstDay: "2018-05-09",
        customDate: "2017-Dec-06"
      }
    };
  },
  methods: {}
});
</script>
