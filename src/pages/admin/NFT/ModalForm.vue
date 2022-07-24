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
                <va-input 
                  v-model="formData.pixelsQuantity"
                  type="text"
                  label="Quantidade de pixels"
                  :rules="fieldsValidations.required"
                >
                </va-input>
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
  import { regex } from '@/utils/regex';
  import { defineComponent, ref, Ref, PropType } from 'vue';
  import { ActionType as Type } from '@/utils/enums';
  import Sortition  from '@/types/Sortition';
  import NFT, { FormData } from '@/types/NFT';

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
        type: Object as PropType<FormData>,
        default: null
      }
    },
    setup(){
       const formData = ref({
        name: '',
        pixelsQuantity: 0,
        themes: ''
      } )

      const fieldsValidations = {
        required: [(value: string) => (!!value && value.length > 0) || 'Campo é requirido'],
      }
      return {
        formData,
        fieldsValidations,
        validation: ref(null),
        showModalToggle: ref(false),
        Type: Type
      }
    },
    watch:{
      showModal(newValue, oldValue){
        this.showModalToggle = true;
      },
      nft(newValue, oldValue){
        if(newValue) {this.formData = newValue;}
      },
     
    },
    
    
  })

</script>

