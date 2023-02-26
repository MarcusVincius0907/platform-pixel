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
            <va-button color="danger">
              Excluir
            </va-button>
          </div>
        </div>
      </template>
      <slot>
        <div class=" tw-w-full tw-max-w-2xl tw-mt-4">
         

          <va-form
            ref="formAddress"
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
              <div class="tw-w-1/2 tw-mx-1">
                
                <va-select
                  v-model="formData.pixelsQuantity"
                  class="mb-6"
                  label="Quantidade de pixels"
                  :options="options"
                  track-by="id"

                />
              </div>
            </div>
            <div class="line tw-flex tw-w-full tw-mb-2">
              
              
            </div>
            <div class="line tw-flex tw-w-full tw-mb-2">
              <div class=" tw-w-1/2 tw-mx-1">
                <va-input 
                  v-model="formData.themes"
                  type="text"
                  label="Tema"
                  :rules="fieldsValidations.required"
                >
                </va-input>
              </div>
              
            </div>
            
          </va-form>
          
          
        </div>
      </slot>
      <template #footer>
        <va-button @click="clearPixelSelection(currentPixelSelected)">
          Salvar
        </va-button>
      </template>
    </va-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, PropType } from 'vue';
import { ActionType as Type } from '@/utils/enums';
import { FormDataNFT } from '@/types/NFT';
import { fieldValidations } from '@/utils/fieldValidations';


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
    nft:{
      required: false,
      type: Object as PropType<FormDataNFT>,
      default: null
    }
  },
  setup(){
    const formData: Ref<FormDataNFT> = ref({
      name: '',
      pixelsQuantity: 10,
      themes: ''
    })

     const options = [
      {
        text: "800",
        value: "10",
        id: "1",
      },
      {
        text: "1152",
        value: "12",
        id: "2",
      },
      {
        text: "1568",
        value: "14",
        id: "3",
      },
    ];

    
    return {
      formData,
      fieldsValidations: fieldValidations,
      validation: ref(null),
      showModalToggle: ref(false),
      Type: Type,
      options,
      value: ref(options[0]),
    }
  },
  watch:{
    showModal(){
      this.showModalToggle = true;
    },
    nft(newValue){
      if(newValue) {this.formData = newValue;}
    },
    
  },
  
  
})

</script>

