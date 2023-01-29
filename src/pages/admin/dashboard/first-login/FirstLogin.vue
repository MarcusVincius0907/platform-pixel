<template>
  <div class=" tw-flex tw-justify-center tw-items-center">
    <div class=" tw-max-w-2xl">

      <div class=" tw-mb-5">

        <va-card>
          <va-card-content>
            <div class="tw-text-th-dark-green">
              <h1 class=" tw-text-3xl tw-mb-3"> Bem Vindo! </h1>
              <p class=" tw-mb-3">Aqui na plataforma da L2M você pode concorrer a vários prêmios e receber muito dinheiro!</p>
              <p class=" tw-mb-3">Mas antes, precisamos que preencha suas informações pessoais.</p>
            </div>
          </va-card-content>
        </va-card>
      </div>

      <GeneralInfo :hideSaveButton="true"  ref="generalInfoRef" class=" tw-mb-5"/>
      <AddressInfo :hideSaveButton="true"  ref="addressInfoRef"  class=" tw-mb-5"/>

      <div>
        <va-button class="mr-2 mb-2" @click="createUser()"> Salvar</va-button>
      </div>

    </div>
  </div>
</template>

<script lang='ts'>

import GeneralInfo from  '../../personal-info/general-info/GeneralInfo.vue'
import AddressInfo from  '../../personal-info/address-info/AddressInfo.vue'
import { defineComponent } from 'vue'
import { ActionTypes } from '@/store/actions'
import User from '@/types/User'
import { MutationsType as MainMutationsType} from '@/store/mutations'

export default defineComponent({
  name: 'first-login',
  components: {
    GeneralInfo,
    AddressInfo,
  },

  
  methods:{
    createUser(){
  
      const generalInfo = this.$store.state.PersonalInfo.formGeneralInfo;
      const addressInfo = this.$store.state.PersonalInfo.formAddressInfo;
      const isAddressInfoValid = (this.$refs?.addressInfoRef as any)?.validate();
      const isGeneralInfoValid = (this.$refs?.generalInfoRef as any)?.validate();
      
      let newUser: User;

      if( (isAddressInfoValid &&  isGeneralInfoValid) && (generalInfo && addressInfo)){

        newUser = {
          ...generalInfo,
          addressInfo: addressInfo,
          paymentInfo: null,
          receiveInfo: null
        }

        this.$store.dispatch(ActionTypes.CREATE_USER, newUser);
        return;
      }

      this.$store.commit(MainMutationsType.SET_NOTIFICATION, {
        title: 'Atenção',
        message: 'Todos os campos devem ser preenchidos antes de enviar.',
        color: 'warning'
      })
      
      
    }
  }
  
})
</script>

