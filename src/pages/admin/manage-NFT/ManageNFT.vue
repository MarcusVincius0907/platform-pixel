<template>
  <div class="tw-flex tw-justify-start tw-items-center w-full">
    <div class="tw-w-full">
      <div class="section">
        <div
          class="tw-w-full tw-flex tw-justify-start tw-items-center tw-mb-3 tw-ml-5"
        >
          <va-button class="tw-w-52" size="large" @click="openModalCreate()"
          >Criar novo NFT</va-button
          >
        </div>
        <div class="tw-flex tw-justify-start tw-flex-wrap tw-m-auto">
          <div
            v-for="(nft, index) in nfts"
            :key="index"
            class="tw-max-w-sm tw-w-full tw-flex tw-justify-center tw-items-center tw-m-5 tw-cursor-pointer"
          >
            <va-card @click="openEditModal(nft)" class="tw-w-full">
              <va-card-content>
                <div class="tw-w-full">
                  <div class="tw-text-xl tw-font-bold tw-text-center">
                    {{ nft.name }}
                  </div>
                  <div>NFT</div>
                  <div
                    class="tw-flex tw-justify-between tw-w-full tw-flex-wrap tw-m-auto tw-max-w-[200px]"
                  >
                    <div
                      v-for="(theme, index) in stringToArray(nft.themes)"
                      :key="index"
                    >
                      <div
                        :style="`background-color: #${theme};`"
                        class="tw-h-8 tw-w-8 tw-m-1 tw-mt-2"
                      ></div>
                    </div>
                  </div>
                </div>
              </va-card-content>
            </va-card>
          </div>
        </div>
      </div>
    </div>
    <ModalForm
      :showModal="showModalForm"
      :actionType="actionType"
      :nft="formData"
    />
  </div>
</template>

<script lang="ts">
import { ActionType } from "@/utils/enums";
import { defineComponent, ref } from "vue";
import ModalForm from "./ModalForm.vue";
import { NFTSummary } from "@/types/NFT";
import { stringToArray } from "@/utils/themesUtil";
import { ActionTypes } from "@/store/modules/NFT/actions";

export default defineComponent({
  name: "ManageNFT",
  components: {
    ModalForm,
  },
  setup() {
    return {
      formData: ref(),
      actionType: ref(ActionType.CREATE),
      showModalForm: ref(false),
    };
  },

  mounted() {
    this.$store.dispatch(ActionTypes.GET_NFT_LIST);

    if (this.$route.query?.nftId) {
      const nftId = this.$route.query.nftId;
      const nft = this.nfts.find((nft) => nft._id === nftId);
      nft ? this.openEditModal(nft) : null;
    }
  },

  computed: {
    nfts() {
      return this.$store.state.NFTModule.nftSummaryList;
    },
  },

  watch: {
    nfts(nValue) {
      if (nValue && nValue?.length > 0) {
        if (this.$route.query?.nftId) {
          const nftId = this.$route.query.nftId;
          const nft = this.nfts.find((nft) => nft._id === nftId);
          nft ? this.openEditModal(nft) : null;
          this.$router.replace({ query: {} });
        }
      }
    },
  },

  methods: {
    openModalCreate() {
      this.changeActionType(ActionType.CREATE);
      this.showModalForm = !this.showModalForm;
      this.formData = {};
    },
    openEditModal(nft: NFTSummary) {
      this.formData = {
        _id: nft._id,
        name: nft.name,
        themes: nft.themes,
        pixelQuantity: nft.pixelQuantity,
      };
      this.changeActionType(ActionType.EDIT);
      this.showModalForm = !this.showModalForm;
    },
    changeActionType(type: ActionType) {
      this.actionType = type;
    },
    stringToArray,
  },
});
</script>
