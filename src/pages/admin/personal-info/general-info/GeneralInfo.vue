<template>
  <div>
    <va-card :title="$t('forms.inputs.title')">
      <va-card-content>
        <div class="mb-3 tw-font-bold">Informações Gerais</div>
        <va-form ref="formGeneralInfo" @validation="validation = $event">
          <div class="row">
            <div class="flex md4 sm6 xs12">
              <va-input v-model="email" type="email" label="Email" disabled>
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
                :value="hello"
                type="text"
                label="CPF"
                :rules="[
                  fieldsValidations.required,
                  fieldsValidations.cpf,
                  fieldsValidations.maxLength(11),
                ]"
              >
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input
                v-model="formData.cell"
                type="text"
                label="Celular"
                :rules="[
                  fieldsValidations.required,
                  fieldsValidations.maxLength(13),
                  fieldsValidations.number,
                ]"
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

          <va-button
            v-if="!hideSaveButton"
            @click="saveFormData($refs.formGeneralInfo.validate())"
            class="mr-2 mb-2"
          >
            Salvar</va-button
          >
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/PersonalInfo/actions";
import { MutationsType } from "@/store/modules/PersonalInfo/mutations";
import { GeneralInfo } from "@/types/User";
import { fieldValidations } from "@/utils/fieldValidations";
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  props: {
    hideSaveButton: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const formData: Ref<GeneralInfo> = ref({
      email: "",
      name: "",
      cpf: "",
      cell: "",
      birthDate: "",
    });

    return {
      formData,
      fieldsValidations: fieldValidations,
      validation: ref(null),
      timeout: ref(0),
    };
  },

  computed: {
    generalInfo() {
      return this.$store.state.user;
    },

    email() {
      return this.$store.state.user?.email;
    },
  },

  methods: {
    saveFormData(validation: boolean) {
      if (validation) {
        this.$store.commit(MutationsType.SET_FORM_GENERAL_INFO, this.formData);
        this.$store.dispatch(ActionTypes.UPDATE_GENERA_INFO);
      }
    },

    validate() {
      const formAddress = this.$refs.formAddress as any;
      return formAddress.validate();
    },

    formatDate(date: any) {
      return new Date(date);
    },
  },

  watch: {
    generalInfo: {
      handler(nValue) {
        const newObj = {
          email: nValue?.email ?? this.formData.email ?? "",
          name: nValue?.name ?? this.formData.name ?? "",
          cpf: nValue?.cpf ?? this.formData.cpf ?? "",
          cell: nValue?.cell ?? this.formData.cell ?? "",
          birthDate: this.formatDate(
            nValue?.birthDate ?? this.formData.birthDate ?? ""
          ),
        };
        this.formData = newObj;
      },

      deep: true,
    },

    formData: {
      handler(nValue) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.$store.commit(MutationsType.SET_FORM_GENERAL_INFO, nValue);
        }, 300);
      },
      deep: true,
    },
  },
});
</script>
