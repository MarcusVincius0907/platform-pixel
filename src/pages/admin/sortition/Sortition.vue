<template>
  <div class=" tw-flex tw-justify-center tw-items-center w-full">
    <div class="tw-max-w-2xl tw-w-full">

      <div class="section mb-5  ">
        <va-card>
          <va-card-content>
            <div class=" tw-flex tw-justify-center tw-items-center tw-min-h-[100px]">

              <div class="  tw-text-center">
                <h1 class=" tw-text-xl tw-mb-3 tw-font-bold"> Sorteios </h1>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
        
      <div class="section">
        <div class=" tw-w-full tw-flex tw-justify-center tw-items-center tw-mb-3">
          <va-button class=" tw-w-full " size="large" @click="openModalCreate()">Criar novo sorteio</va-button>
        </div>
        <div class=" tw-grid tw-justify-center tw-grid-cols-1 tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-gap-2">

          <div v-for="(sorteio, index) in sorteios" :key="index" class="tw-max-w-sm tw-w-full tw-m-auto">
            <va-card @click="openEditModal(sorteio)">
              <va-card-content>
                <div class="">
                  <div class="   ">
                    <h1 class=" tw-text-xl tw-mb-5 tw-font-bold tw-text-center"> {{sorteio.date}} </h1>
                    <div class="tw-flex tw-mb-3 tw-justify-center">
                      <div class=" tw-w-1/2 tw-flex tw-flex-col tw-items-center">
                        <div class=" tw-font-bold">Pixels</div>
                        <div>{{sorteio.pixelsAvailable}}</div>
                      </div>
                      <div class="tw-w-1/2 tw-flex tw-flex-col tw-items-center">
                        <div class=" tw-font-bold">Premiação</div>
                        <div>{{sorteio.reward}}</div>
                      </div>
                    </div>
                    <div class=" tw-flex tw-justify-center">
                      <va-button v-if="sorteio.status">Aberto</va-button>
                      <va-button v-else :disabled="true"> Fechado </va-button>
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
import ModalForm from './ModalForm.vue';
import Sortition from '@/types/Sortition';


export default defineComponent({
  name: 'sortition',
  components:{
    ModalForm
  },
   setup(){
    return{
      formData: ref(),
      actionType: ref(ActionType.CREATE),
      showModalForm: ref(false),
      sorteios: [
        {
          id:0,
          name: 'Sorteio de verão',
          date: new Date('24/06/2022'),
          idNFT: (Math.random()).toString(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: true
        },
        
        {
          id:1,
          name: 'Sorteio de verão',
          date: new Date('24/07/2022'),
          idNFT:  (Math.random()).toString(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: false
        },
        {
          id:2,
          name: 'Sorteio de verão',
          date: new Date('24/08/2022'),
          idNFT:  (Math.random()).toString(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: false
        },
        {
          id:3,
          name: 'Sorteio de verão',
          date: new Date('24/08/2022'),
          idNFT:  (Math.random()).toString(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: false
        },
        
        
      ] as Sortition[]
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

