<template>
  <div v-for="(sortition, index) in sortitions" :key="index" class="tw-max-w-sm tw-w-full tw-m-auto">
    <va-card>
      <va-card-content>
        <h1 class="tw-text-xl tw-mb-5 tw-font-bold tw-text-center">{{ sortition.name }}</h1>
        <h3 class="tw-text-md tw-mb-5 tw-font-bold tw-text-center">
          {{ moment(sortition.date).format('DD/MM/yyyy') }}
        </h3>
        <div class="tw-flex tw-mb-3 tw-justify-center">
          <div class="tw-w-1/2 tw-flex tw-flex-col tw-items-center">
            <div class="tw-font-bold">NFT id</div>
            <div
              v-if="adminVisibilityAccess"
              class="tw-cursor-pointer tw-underline"
              @click="goToNFT(sortition.idNFTSummary)"
            >
              {{ sortition.idNFTSummary.substring(0, 10) }}
            </div>
            <div v-else>{{ sortition.idNFTSummary.substring(0, 10) }}</div>
          </div>
          <div class="tw-w-1/2 tw-flex tw-flex-col tw-items-center">
            <div class="tw-font-bold">Premiação</div>
            <div>{{ sortition.reward }}</div>
          </div>
        </div>
        <div class="tw-flex tw-justify-center">
          <va-button v-if="sortition.status" @click="goToBuyPixel(sortition._id)">Aberto</va-button>
          <va-button v-else :disabled="true"> Fechado </va-button>
        </div>
        <div v-if="adminVisibilityAccess" class="tw-flex tw-justify-end">
          <va-button flat size="small" color="info" @click="openEditModal(sortition)"> Editar </va-button>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, Ref } from 'vue'
  import moment from 'moment'
  import Sortition from '@/types/Sortition'

  export default defineComponent({
    name: 'sortition-list',
    props: {
      sortitions: {
        required: true,
        type: Object as PropType<Sortition[]>,
        default: null,
      },
      adminVisibilityAccess: {
        required: false,
        type: Boolean,
        default: false,
      },
    },
    setup() {
      return {
        moment: moment,
      }
    },
    methods: {
      goToNFT(nftId: string) {
        this.$router.push({ name: 'NFT', query: { nftId } })
      },
      goToBuyPixel(sortitionId: string) {
        this.$router.push({ name: 'pixel', query: { sortitionId } })
      },
      openEditModal(sortition: Sortition) {
        this.$emit('openEditModal', sortition)
      },
    },
  })
</script>
