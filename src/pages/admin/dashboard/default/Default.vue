<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row w-full">
    <div class="left-side tw-p-3 tw-w-full md:tw-w-1/2">
      <div class="section mb-5 ">
        <va-card>
          <va-card-content>
            <div class=" tw-flex tw-justify-center tw-items-center tw-min-h-[100px]">

              <div class="tw-text-th-dark-green tw-text-center">
                <h1 class=" tw-text-3xl tw-mb-3"> Olá {{$store?.state?.user?.name}}! </h1>
                <p class=" tw-mb-3">Veja as novidades que temos para você!</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
      <div class="section mb-5">
        <div class="tw-flex tw-justify-center tw-items-center">
          <img class=" tw-max-w-xl tw-w-full" src="../../../../../public/img/fakePixel.png" alt="">
        </div>
      </div>
      <div class="section">
        <va-card>
          <va-card-content>
            <div class=" tw-flex tw-justify-center">

              <div class="tw-text-th-dark-green tw-text-center">
                <h1 class=" tw-text-xl tw-mb-3 tw-font-bold">Compre agora seus pixels e concorra aos prêmios! </h1>
                <va-button @click="$router.push({name: 'pixel-compra'})">Comprar</va-button>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <div class="right-side tw-p-3 tw-w-full md:tw-w-1/2">
      <div class="section mb-5 ">
        <va-card>
          <va-card-content>
            <div class=" tw-flex tw-justify-center tw-items-center tw-min-h-[100px]">

              <div class="tw-text-th-dark-green tw-text-center">
                <h1 class=" tw-text-xl tw-mb-3 tw-font-bold"> Relação dos próximos sorteios </h1>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
      <div class="section">
        <div class=" tw-grid tw-grid-cols-2 tw-grid-rows-2 tw-gap-2">

          <div v-for="(sorteio, index) in sorteios" :key="index" class="tw-max-w-sm">
            <va-card>
              <va-card-content>
                <div class="">
                  <div class="tw-text-th-dark-green  ">
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
                      <va-button v-if="sorteio.status === 'aberto'">Aberto</va-button>
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
  </div>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'default',
  setup(){
    return{
      sorteios: [
        {
          id:0,
          date: '24/06/2022',
          idPixel: Math.random(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: 'aberto'
        },
        {
          id:1,
          date: '24/07/2022',
          idPixel: Math.random(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: 'fechado'
        },
        {
          id:2,
          date: '24/08/2022',
          idPixel: Math.random(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: 'fechado'
        },
        {
          id:3,
          date: '24/08/2022',
          idPixel: Math.random(),
          pixelsAvailable: 1000,
          reward: 'R$ 1000.00 + NFT',
          status: 'fechado'
        },
        
        
      ]
    }
  }
})
</script>

