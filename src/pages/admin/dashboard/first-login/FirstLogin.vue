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

      <GeneralInfo @save="createUser" class=" tw-mb-5"/>
      <AddressInfo class=" tw-mb-5"/>

    </div>
  </div>
</template>

<script>

import GeneralInfo from  '../../personal-info/general-info/GeneralInfo.vue'
import AddressInfo from  '../../personal-info/address-info/AddressInfo.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'first-login',
  components: {
    GeneralInfo,
    AddressInfo,
  },
  methods:{
    createUser(value){
      console.log('createUser', value);
    }
  }
  
})
</script>

