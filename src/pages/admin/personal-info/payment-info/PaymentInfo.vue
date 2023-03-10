<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Dados de Pagamento</div>

        <div class="row">
          <div class="flex xs12">
            <div
              v-if="cards && cards.length > 0"
              class="table-wrapper tw-overflow-y-auto"
            >
              <!-- <span class=" tw-mb-2 tw-text-sm tw-text-gray-400">Click em uma linha para edita-la</span> -->
              <table class="va-table va-table--striped va-table--hoverable">
                <thead>
                  <tr>
                    <th>Titular</th>
                    <th>Número</th>
                    <th>Expiração</th>
                    <th>Deletar</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(card, i) in cards" :key="i">
                    <td>{{ card.cardName }}</td>
                    <td>{{ card.cardNumber }}</td>
                    <td>{{ card.expirationDate }}</td>
                    <td>
                      <va-button
                        @click="deleteItem(card.cardNumber)"
                        class="mr-2 mb-2"
                        color="danger"
                        size="small"
                      >
                        <i class="fa-solid fa-trash"></i
                        ></va-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="mt-5 tw-font-bold">Adicionar Novo Cartão</div>

        <div class="row">
          <div class="flex xs12">
            <va-form ref="form" @validation="validation = $event">
              <div class="row">
                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.cardName"
                    type="text"
                    label="Nome do titular do cartão"
                    :rules="fieldValidations.required"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.cardNumber"
                    type="text"
                    label="Número do cartão"
                    mask="creditCard"
                    :rules="[
                      fieldValidations.required,
                      fieldValidations.number,
                    ]"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.expirationDate"
                    label="Data de expiração"
                    :rules="[fieldValidations.required]"
                    :maxLength="5"
                    @keydown="onKeyup"
                  ></va-input>
                </div>
              </div>
              <va-button
                @click="saveFormData($refs.form.validate())"
                class="mr-2 mb-2"
              >
                Salvar</va-button
              >
            </va-form>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/PersonalInfo/actions";
import { MutationsType } from "@/store/modules/PersonalInfo/mutations";
import { Card } from "@/types/User";
import { fieldValidations } from "@/utils/fieldValidations";
import { formatExpDate } from "@/utils/formatExpDate";
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  setup() {
    const formData: Ref<Card> = ref({
      cardNumber: "",
      cardName: "",
      expirationDate: "",
    });

    const cards: Ref<Array<Card>> = ref([]);

    return {
      formData,
      fieldValidations: fieldValidations,
      validation: ref(null),
      cards,
    };
  },

  mounted() {
    if (this.$store.state.user?.paymentInfo) {
      this.cards = this.$store.state.user?.paymentInfo.cards ?? [];
    }
  },

  methods: {
    saveFormData(validation: boolean) {
      if (validation) {
        const paymentInfo = {
          cards: [...this.cards, { ...this.formData }],
        };
        this.$store.commit(MutationsType.SET_FORM_PAYMENT_INFO, paymentInfo);
        this.$store.dispatch(ActionTypes.UPDATE_PAYMENT_INFO);
      }
    },

    deleteItem(cardNumber: string) {
      this.cards = this.cards.filter((card) => card.cardNumber !== cardNumber);

      const paymentInfo = {
        cards: this.cards,
      };

      if (this.cards.length === 0) {
        this.$store.dispatch(ActionTypes.DELETE_PAYMENT_INFO);
      } else {
        this.$store.commit(MutationsType.SET_FORM_PAYMENT_INFO, paymentInfo);
        this.$store.dispatch(ActionTypes.UPDATE_PAYMENT_INFO);
      }
    },

    onKeyup(event) {
      this.formData.expirationDate =
        formatExpDate(event, this.formData.expirationDate) ?? "";
    },
  },

  computed: {
    paymentInfo() {
      return this.$store.state.user?.paymentInfo;
    },
  },

  watch: {
    paymentInfo(nValue) {
      if (nValue) {
        this.formData = nValue;
        this.cards = nValue.cards;
      }
    },
  },
});
</script>
