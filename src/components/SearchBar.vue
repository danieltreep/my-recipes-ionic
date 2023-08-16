<template>
  <!-- <ion-searchbar
    v-model="searchTerm"
    show-cancel-button="always"
    @ionCancel="$emit('cancel')"
    class="ion-no-padding"
  ></ion-searchbar> -->
  <div class="searchbar" :class="{ active, inactive: !active }">
    <ion-button
      fill="clear"
      color="dark"
      class="ion-no-padding search-button"
      :class="{ active }"
      @click="handleClick"
      size="small"
    >
      <ion-icon :icon="search" slot="icon-only"></ion-icon>
    </ion-button>
    <input
      type="text"
      autofocus
      v-model="searchTerm"
      v-if="active"
      :class="{ active }"
    />

    <!-- <ion-icon
      v-if="active"
      :icon="backspaceOutline"
      slot="icon-only"
    ></ion-icon> -->
  </div>
  <!-- <ion-input> </ion-input> -->
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
.searchbar {
  /* padding-inline-start: 2rem; */
  border-radius: 8px;
  height: 36px;
  /* left: 1.5rem; */
  width: 20px;
  /* translate: -3rem 0; */
  transition: 0.5s;
  /* position: relative; */
  display: flex;
  align-items: center;
}
.searchbar.active {
  margin-inline-end: 1.5rem;
  /* background-color: var(--background-color); */
  width: calc(100% - (20px + 1.5rem));
  border: 1px solid rgb(212, 212, 212);
}
.searchbar.inactive {
  border: none;
}
.search-button {
  transition: 0.5s;
}
.search-button.active {
  translate: 0.5rem 0;
}

ion-icon {
  font-size: 20px;
}
.searchbar input {
  /* height: 34px; */
  padding-inline: 1rem;
  background-color: transparent;
  outline: none;
  border: none;
  /* translate: -1rem; */
  transition: 0.5s;
  opacity: 0;
}

.searchbar input.active {
  translate: 0 0;
  opacity: 1;
}
</style>
