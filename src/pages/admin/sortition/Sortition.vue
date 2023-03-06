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

          <div v-for="(sorteio, index) in sortitions" :key="index" class="tw-max-w-sm tw-w-full tw-m-auto tw-cursor-pointer">
            <va-card @click="openEditModal(sorteio)">
              <va-card-content>
                <div class="">
                  <div class="   ">
                    <h1 class=" tw-text-xl tw-mb-5 tw-font-bold tw-text-center"> {{moment(sorteio.date).format('DD/MM/yyyy')}} </h1>
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
import { defineComponent, ref, Ref } from 'vue';
import ModalForm from './ModalForm.vue';
import Sortition from '@/types/Sortition';
import moment from 'moment';
import { ActionTypes as NFTActionTypes } from '@/store/modules/NFT/actions';

/* {
          id:0,
          name: 'Sorteio de verão',
          date: new Date('2022-06-20'),
          idNFT: (Math.random()).toString(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: true
        }, */

export default defineComponent({
  name: 'sortition',
  components:{
    ModalForm
  },
   setup(){
    return{
      moment: moment,
      formData: ref(),
      actionType: ref(ActionType.CREATE),
      showModalForm: ref(false),
      sortitions: ref([]),
    }
  },
  mounted(){
    this.$store.dispatch(NFTActionTypes.GET_NFT_SUMMARY_ID_LIST)
  },
  methods:{
    openModalCreate(){
      this.changeActionType(ActionType.CREATE);
      this.showModalForm = !this.showModalForm;
      this.formData = {};
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

