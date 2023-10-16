<template>
  <ion-searchbar
    v-model="searchTerm"
    show-cancel-button="focus"
    @ionCancel="$emit('cancel')"
    class="ion-no-padding"
    placeholder="Search recipes"
  ></ion-searchbar>
</template>

<script setup lang="ts">
import { IonSearchbar, IonInput, IonButton, IonIcon } from "@ionic/vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted } from "vue";
import { backspaceOutline, search } from "ionicons/icons";

const { searchTerm } = storeToRefs(useSearchStore());
const emits = defineEmits(["activate"]);

const active = ref(false);

const handleClick = () => {
  active.value = !active.value;
  searchTerm.value = "";
  emits("activate");
};
</script>

<style lang="css" scoped>
ion-searchbar {
  --border-radius: 10px;
  --box-shadow: 0px 0px 4px #00000020;
  height: 40px;

  transition: 0.5s;
  font-size: 14px !important;
  display: flex;
  align-items: center;
}

ion-icon {
  font-size: 20px;
}
</style>
