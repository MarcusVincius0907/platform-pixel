<template>
  <div>
    <va-card>
      <va-card-content>
        <div class="mb-3 tw-font-bold">Dados de Recebimento</div>

        <div class="row">
          <div class="flex xs12">
            <div v-if="receiveInfoList && receiveInfoList.length > 0" class="table-wrapper tw-overflow-y-auto">
              <table class="va-table va-table--striped va-table--hoverable">
                <thead>
                  <tr>
                    <th>Apelido</th>
                    <th>Descrição</th>
                    <th>Deletar</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(receiveItem, i) in receiveInfoList" :key="i">
                    <td>{{ receiveItem.nickname }}</td>
                    <td>{{ receiveItem.description }}</td>
                    <td>
                      <va-button @click="deleteReceiveItem()" class="mr-2 mb-2" color="danger" size="small">
                        <i class="fa-solid fa-trash"></i
                      ></va-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="mt-5 tw-font-bold">Adicionar Novo</div>
        <div class="row">
          <div class="flex xs12">
            <va-tabs grow v-model="tabValue" style="width: 100%">
              <template #tabs>
                <va-tab @click="changeType()" v-for="title in tabTitles.slice(0, 3)" :key="title">
                  {{ title }}
                </va-tab>
              </template>
            </va-tabs>
          </div>
        </div>
        <div class="row" v-if="tabValue === 1">
          <div class="flex xs12">
            <va-form ref="formBank" @validation="validation = $event">
              <div class="row">
                <div class="flex md4 sm6 xs12">
                  <va-input v-model="formData.nickname" type="text" label="Apelido" :rules="fieldValidations.required">
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.bankInfo.bankName"
                    type="text"
                    label="Banco"
                    :rules="fieldValidations.required"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.bankInfo.agency"
                    type="text"
                    label="Agência"
                    :rules="fieldValidations.required"
                  >
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input
                    v-model="formData.bankInfo.account"
                    type="text"
                    label="Conta"
                    :rules="fieldValidations.required"
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
            <va-form ref="formPix" @validation="validation = $event">
              <div class="row">
                <div class="flex md4 sm6 xs12">
                  <va-input v-model="formData.nickname" type="text" label="Apelido" :rules="fieldValidations.required">
                  </va-input>
                </div>

                <div class="flex md4 sm6 xs12">
                  <va-input v-model="formData.pixKey" type="text" label="Chave" :rules="fieldValidations.required">
                  </va-input>
                </div>
              </div>
              <va-button @click="saveFormData($refs.formPix.validate())" class="mr-2 mb-2"> Salvar</va-button>
            </va-form>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
  import { ReceiveInfo, ReceiveInfoItem, ReceiveInfoType } from '@/types/User'
  import { defineComponent, Ref, ref } from 'vue'
  import { fieldValidations } from '@/utils/fieldValidations'
  import { ActionTypes } from '@/store/modules/PersonalInfo/actions'
  import { MutationsType } from '@/store/modules/PersonalInfo/mutations'

  const FORM_INITIAL_STATE = {
    nickname: '',
    bankInfo: {
      bankName: '',
      agency: '',
      account: '',
    },
    pixKey: '',
    type: ReceiveInfoType.BANK_TYPE,
  }

  export default defineComponent({
    setup() {
      const formData: Ref<ReceiveInfo> = ref(FORM_INITIAL_STATE)

      const receiveInfoList: Ref<Array<ReceiveInfoItem>> = ref([])

      return {
        formData,
        fieldValidations: fieldValidations,
        validation: ref(null),
        tabTitles: ['Dados Bancários', 'Chave Pix'],
        tabValue: ref(1),
        receiveInfoList,
        showForm: ref(true),
      }
    },

    mounted() {
      if (this.$store.state.user?.receiveInfo) {
        this.formData = this.$store.state.user?.receiveInfo
        this.receiveInfoList = [this.formatReceiveItem(this.$store.state.user?.receiveInfo)]
        this.tabValue = this.formData.type === ReceiveInfoType.BANK_TYPE ? 1 : 2
      }
    },

    methods: {
      saveFormData(validation: boolean) {
        if (validation) {
          this.$store.commit(MutationsType.SET_FORM_RECEIVE_INFO, this.formData)
          this.$store.dispatch(ActionTypes.UPDATE_RECEIVE_INFO)
        }
      },

      changeType() {
        if (this.tabValue === 1) {
          this.formData.type = ReceiveInfoType.BANK_TYPE
        } else if (this.tabValue === 2) {
          this.formData.type = ReceiveInfoType.PIX_TYPE
        }
      },

      formatReceiveItem(receiveInfo: ReceiveInfo) {
        if (receiveInfo.type === ReceiveInfoType.BANK_TYPE) {
          return {
            nickname: receiveInfo.nickname,
            description: `${receiveInfo.bankInfo?.bankName}/${receiveInfo.bankInfo?.agency}/${receiveInfo.bankInfo?.account}`,
          }
        } else {
          return {
            nickname: receiveInfo.nickname,
            description: receiveInfo.pixKey,
          }
        }
      },

      deleteReceiveItem() {
        this.$store.dispatch(ActionTypes.DELETE_RECEIVE_INFO)
        this.receiveInfoList = []
        this.formData = FORM_INITIAL_STATE
      },
    },

    computed: {
      receiveInfo() {
        return this.$store.state.user?.receiveInfo
      },
    },

    watch: {
      receiveInfo(nValue) {
        if (nValue) {
          this.formData = nValue
          this.receiveInfoList = [this.formatReceiveItem(nValue)]
          this.tabValue = this.formData.type === ReceiveInfoType.BANK_TYPE ? 1 : 2
        }
      },
    },
  })
</script>
