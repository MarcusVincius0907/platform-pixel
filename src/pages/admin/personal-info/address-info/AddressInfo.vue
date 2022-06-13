<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Endereço</div>
        <form>
          <div class="row">
            <div class=" tw-flex tw-w-full">
              <div class=" tw-w-2/3 flex md4 sm6 xs12">
                <va-input v-model="successfulEmail" type="number" label="CEP">
                </va-input>
              </div>
              <div class=" tw-w-1/3 d-flex tw-justify-center tw-items-center">
                <va-button class="" size="small"> Buscar</va-button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="flex md4 sm6 xs12">
              <va-input v-model="successfulEmail" type="text" label="Rua">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="successfulEmail" type="number" label="Número">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="successfulEmail" type="text" label="Bairro">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="successfulEmail" type="text" label="Cidade">
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-select
                label="Estado"
                v-model="searchableSelectModel"
                searchable
                textBy="description"
                :options="simpleOptions"
              />
            </div>

            <div class="flex md4 sm6 xs12">
              <va-select
                label="País"
                v-model="searchableSelectModel"
                searchable
                textBy="description"
                :options="simpleOptions"
              />
            </div>
          </div>
          <va-button class="mr-2 mb-2"> Salvar</va-button>
        </form>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    console.log("hello");
  },
  data() {
    return {
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
