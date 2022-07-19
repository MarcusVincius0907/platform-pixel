<template>
  <div class=" tw-flex tw-justify-start tw-items-center w-full">
    <div class="tw-w-full">
        
      <div class="section">
        <div class=" tw-w-full tw-flex tw-justify-start tw-items-center tw-mb-3">
          <va-button class=" tw-w-52 " size="large" @click="openModalCreate()">Criar novo NFT</va-button>
        </div>
        <div class=" tw-flex tw-justify-start tw-flex-wrap">

          <div v-for="(nft, index) in nfts" :key="index" class="tw-max-w-sm tw-m-auto tw-w-[300px]">
            <va-card @click="openEditModal(nft)">
              <va-card-content>
                <div class="">
                  <div class=" tw-text-xl tw-font-bold tw-text-center">{{nft.name}}</div>
                  <div>NFT</div>
                  <div class=" tw-flex tw-justify-between tw-w-full">

                    <div v-for="(theme, index) in nft.themes" :key="index" >
                      <div :style="`background-color: #${theme};`" class="tw-h-8 tw-w-8 tw-m-1 tw-mt-2"></div>
                    </div>
                  </div>
                  
                </div>
              </va-card-content>
            </va-card>
          </div>
        </div>
      </div>
    </div>
    <ModalForm :showModal="showModalForm" :actionType="actionType" :sortition="formData"/>
  </div>
</template>

<script lang='ts'>
import { ActionType } from '@/utils/enums';
import { defineComponent, ref } from 'vue';
import ModalForm from './ModalForm.vue'
import Sortition from '@/types/Sortition';
import NFT from  '@/types/NFT'
import  NFTMock from '@/data/NFT/NFT'


export default defineComponent({
  name: 'NFT',
  components:{
    ModalForm
  },
   setup(){
    return{
      formData: ref(),
      actionType: ref(ActionType.CREATE),
      showModalForm: ref(false),
      nfts:[
        NFTMock, 
        {...NFTMock, name: 'Inverno'},
        {...NFTMock, name: 'Outono'},
        {...NFTMock, name: 'Primavera'},
      ] 
    }
  },
  methods:{
    openModalCreate(){
      this.changeActionType(ActionType.CREATE);
      this.showModalForm = !this.showModalForm;
    },
    openEditModal(sortition: Sortition){
      this.formData = sortition;
      this.changeActionType(ActionType.EDIT);
      this.showModalForm = !this.showModalForm;
    },
    changeActionType(type: ActionType){
      this.actionType = type;
    }
  }
})
</script>

