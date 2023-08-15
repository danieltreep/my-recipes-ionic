<template>
  <ion-chip
    :outline="false"
    @click="active = !active"
    :class="{ active: active }"
  >
    <ion-icon :src="iconUrlActive" v-if="active"></ion-icon>
    <ion-icon :src="iconUrl" v-else></ion-icon>

    {{ name }}
    <!-- <ion-icon :icon="close" v-if="active" color="white"></ion-icon> -->
  </ion-chip>
</template>

<script setup lang="ts">
// Ionic
import { IonChip, IonIcon } from "@ionic/vue";
import { close } from "ionicons/icons";

// Vue
import { ref, computed } from "vue";

// Props
const props = defineProps({
  name: String,
});

// Refs
const active = ref(false);

const iconUrl = ref(
  new URL(`/src/assets/tags/${props.name}-grey.svg`, import.meta.url).href
);
const iconUrlActive = ref(
  new URL(`/src/assets/tags/${props.name}-white.svg`, import.meta.url).href
);
</script>

<style lang="css" scoped>
ion-chip {
  --background: var(--background-color);

  --color: var(--font-color);
  display: flex;
  gap: 0.3rem;
  width: fit-content;
  transition: 0.2s;
  box-sizing: border-box;
  border: 1px solid transparent;
}
ion-chip.active {
  --background: var(--secondary-color);
  --color: white;
  border: 1.5px solid var(--secondary-color);
}
</style>
