<template>
  <div class="form-elements">
    <div class="row">
      
      <div class="flex xs12">
        <GeneralInfo />
      </div>

      <div class="flex xs12">
        <AddressInfo />
      </div>

      <div class="flex xs12">
        
        <ReceiveInfo />
      </div>

      <div class="flex xs12">
        
        <PaymentInfo />
      </div>
     
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import GeneralInfo from  './general-info/GeneralInfo.vue'
  import AddressInfo from  './address-info/AddressInfo.vue'
  import ReceiveInfo from  './receive-info/ReceiveInfo.vue'
  import PaymentInfo from  './payment-info/PaymentInfo.vue'

  export default defineComponent({

    components:{
      GeneralInfo,
      AddressInfo,
      ReceiveInfo,
      PaymentInfo,
    },

    setup() {
      console.log('hello');
      
    },
    /* data () {
     
    },
    methods: {
      
    }, */
  })
</script>

