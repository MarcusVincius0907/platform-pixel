<template>
  <div>
    <va-modal v-model="showModalToggle" hide-default-actions overlay-opacity="0.2">
      <template #header>
        <div class="tw-flex tw-justify-between">
          <h2 class="tw-font-bold tw-text-xl">
            <span v-if="Type.EDIT === actionType">Editar sorteio</span>
            <span v-else>Criar sorteio</span>
          </h2>
          <div class="" v-if="Type.EDIT === actionType">
            <va-button color="danger" @click="deletarNFT()"> Excluir </va-button>
          </div>
        </div>
      </template>
      <slot>
        <div class="tw-w-full tw-max-w-2xl tw-mt-4">
          <va-form ref="form" @validation="validation = $event">
            <div class="line tw-flex tw-w-full tw-mb-2">
              <div class="tw-w-1/2 tw-mx-1">
                <div>
                  <va-input v-model="formData.name" type="text" label="Nome" :rules="[fieldsValidations.required]">
                  </va-input>
                </div>
              </div>
              <div class="tw-w-1/2 tw-mx-1">
                <va-select
                  v-model="option"
                  class="mb-6"
                  label="Quantidade de pixels"
                  :options="options"
                  track-by="id"
                />
              </div>
            </div>
            <div class="line tw-flex tw-w-full tw-mb-2"></div>
            <div class="line tw-flex tw-w-full tw-mb-2">
              <div class="tw-w-1/2 tw-mx-1">
                <va-input v-model="formData.themes" type="text" label="Tema" :rules="fieldsValidations.required">
                </va-input>
              </div>
            </div>
          </va-form>
        </div>
      </slot>
      <template #footer>
        <va-button @click="saveFormData($refs.form.validate())"> Salvar </va-button>
        <va-button class="tw-ml-2" @click="showModalToggle = false" outline> Cancelar </va-button>
      </template>
    </va-modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, PropType } from 'vue'
  import { ActionType as Type } from '@/utils/enums'
  import { NFTSummary } from '@/types/NFT'
  import { fieldValidations } from '@/utils/fieldValidations'
  import { MutationsType } from '@/store/modules/NFT/mutations'
  import { ActionTypes } from '@/store/modules/NFT/actions'

  export default defineComponent({
    name: 'modal-create',
    props: {
      showModal: {
        required: true,
        type: Boolean,
        default: false,
      },
      actionType: {
        required: true,
        type: String,
        default: Type.CREATE,
      },
      nft: {
        required: false,
        type: Object as PropType<NFTSummary>,
        default: null,
      },
    },
    setup() {
      const formData: Ref<NFTSummary> = ref({
        name: '',
        pixelQuantity: 10,
        themes: '',
      })

      const options = [
        {
          text: '800',
          value: '10',
          id: '1',
        },
        {
          text: '1152',
          value: '12',
          id: '2',
        },
        {
          text: '1568',
          value: '14',
          id: '3',
        },
      ]

      return {
        formData,
        fieldsValidations: fieldValidations,
        validation: ref(null),
        showModalToggle: ref(false),
        Type: Type,
        options,
        option: ref(options[0]),
        value: ref(options[0]),
      }
    },

    methods: {
      saveFormData(validation: boolean) {
        if (validation) {
          this.formData.pixelQuantity = Number(this.option.value)
          this.$store.commit(MutationsType.SET_FORM_DATA_NFT, this.formData)
          if (this.actionType === this.Type.CREATE) {
            this.$store.dispatch(ActionTypes.CREATE_NFT)
          } else {
            this.$store.dispatch(ActionTypes.UPDATE_NFT)
          }
          this.showModalToggle = false
        }
      },

      deletarNFT() {
        this.$store.commit(MutationsType.SET_FORM_DATA_NFT, this.formData)
        this.$store.dispatch(ActionTypes.DELETE_NFT)
        this.showModalToggle = false
      },
    },

    watch: {
      showModal() {
        this.showModalToggle = true
      },
      nft(newValue) {
        if (newValue) {
          this.formData = newValue
        }
      },
    },
  })
</script>
