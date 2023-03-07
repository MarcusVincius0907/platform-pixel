<template>
  <div>
    <va-modal
      v-model="showModalToggle"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <template #header>
        <div class=" tw-flex tw-justify-between">
          <h2 class=" tw-font-bold tw-text-xl">
            <span v-if="Type.EDIT === actionType">Editar sorteio</span>
            <span v-else>Criar sorteio</span>
          </h2>
          <div class="" v-if="Type.EDIT === actionType">
            <va-button color="danger" @click="deleteSortition()">
              Excluir
            </va-button>
          </div>
        </div>
      </template>
      <slot>
        <div class=" tw-w-full tw-max-w-2xl tw-mt-4">
         

          <va-form
            ref="form"
            @validation="validation = $event"
          >
            <div class="line tw-flex tw-w-full tw-mb-2">
              <div class=" tw-w-1/2 tw-mx-1">
                <div>
                  <va-input 
                    v-model="formData.name"
                    type="text"
                    label="Nome"
                    :rules="[fieldsValidations.required]"
                  >
                  </va-input>
                </div>
              
              </div>
              <div class=" tw-w-1/2 tw-mx-1 tw-mb-2">
                
                <va-select
                  v-model="formData.idNFTSummary"
                  class="mb-6"
                  label="id NFT"
                  :options="options"
                  track-by="id"

                />
              </div>
            </div>
            <div class="line tw-flex tw-w-full tw-mb-2">
              <div class=" tw-w-1/2 tw-mx-1">
                
                <va-date-input
                  v-model="formData.date"
                  label="Data do sorteio"
                  :rules="fieldsValidations.required"
                />
              </div>
              <div class=" tw-w-1/2 tw-mx-1">
                <va-input 
                  v-model="formData.reward" 
                  :rules="fieldsValidations.required" 
                  type="text"
                  label="Premiação"
                >
                </va-input>
              </div>
            </div>
       
            <div class="line ">
              <div class=" tw-w-1/2 tw-mx-1">
                <va-switch v-model="formData.status" true-inner-label="Aberto" false-inner-label="Fechado" class="mr-4" />
                
              </div>
            </div>
          </va-form>
          
          
        </div>
      </slot>
      <template #footer>
        <va-button @click="saveFormData($refs.form.validate())">
          Salvar
        </va-button>
        <va-button class=" tw-ml-2 " @click="showModalToggle = false" outline>
          Cancelar
        </va-button>
      </template>
    </va-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, PropType } from 'vue';
import { ActionType as Type } from '@/utils/enums';
import Sortition from '@/types/Sortition';
import { MutationsType } from '@/store/modules/Sortition/mutations';
import { ActionTypes } from '@/store/modules/Sortition/actions';
import moment from 'moment';
import { MutationsType as MainMutationsType} from '@/store/mutations';


export default defineComponent({
  name: 'modal-create',
  props: {
    showModal: {
      required: true,
      type: Boolean,
      default: false,
    },
    actionType:{
      required: true,
      type: String,
      default: Type.CREATE
    },
    sortition:{
      required: false,
      type: Object as PropType<Sortition>,
      default: null
    }
  },
  setup(){
      const formData: Ref<Sortition> = ref({
      name: '',
      date: '',
      idNFTSummary: '',
      reward: '',
      status: false,
    } as Sortition)

    const fieldsValidations = {
      required: [(value: string) => (!!value && value.length > 0) || 'Campo é requirido'],
    }
    return {
      formData,
      fieldsValidations,
      validation: ref(null),
      showModalToggle: ref(false),
      Type: Type,
    }
  },

  methods:{
    saveFormData(validation: boolean) {
      if (validation) {

        const formattedData: Sortition = {
          ...(this.actionType === this.Type.EDIT && {_id: this.formData._id }),
          name: this.formData.name,
          status: this.formData.status,
          reward: this.formData.reward,
          date: moment(this.formData.date).format('yyyy-MM-DD'),
          idNFTSummary: (this.formData.idNFTSummary as any)?.value ?? this.formData.idNFTSummary ?? ''
        }

        this.$store.commit(MutationsType.SET_FORM_DATA_SORTITION, formattedData);

        if(this.actionType === this.Type.CREATE){
          this.$store.dispatch(ActionTypes.CREATE_SORTITION);
        }
        else {
          this.$store.dispatch(ActionTypes.UPDATE_SORTITION);
        }

        this.showModalToggle = false;

      }else{
        this.$store.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Dados inválidos",
          color: "danger",
        });
      }
    },

    deleteSortition(){
      this.$store.commit(MutationsType.SET_FORM_DATA_SORTITION, this.formData);
      this.$store.dispatch(ActionTypes.DELETE_SORTITION);
      this.showModalToggle = false;
    },
  },
  
  watch:{
    showModal(newValue, oldValue){
      this.showModalToggle = true;
    },
    sortition(newValue){

      if(newValue) {
        this.formData = newValue;
      }

      if(newValue?.idNFTSummary){
        const nftEl = this.options.find(el => (this.formData.idNFTSummary === el.value))
        this.formData.idNFTSummary = nftEl
      }

    },
    
  },

  computed:{
    options(){
      if(this.actionType === this.Type.EDIT)
        {return this.$store.state.NFT.nftSummaryIdList.map(nftItem => ({ text: `${nftItem.name} - ${nftItem.id.substring(0,3)}...`, value: nftItem.id, id: nftItem.id, name: nftItem.name  } as any))}
      else  
        {return this.$store.state.NFT.nftSummaryIdList.map(nftItem => ({ text: `${nftItem.name} - ${nftItem.id.substring(0,3)}...`, vinculated: nftItem.vinculated, value: nftItem.id, id: nftItem.id, name: nftItem.name  } as any)).filter(nft => !nft.vinculated)}
    }
  }
  
  
})

</script>

