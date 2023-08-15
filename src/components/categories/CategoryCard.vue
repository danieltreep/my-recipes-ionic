<template>
  <ion-card @click="active = !active" :class="{ active: active }">
    <img :src="imageUrl" />
    <p>{{ cat.charAt(0).toUpperCase() }}{{ cat.slice(1) }}</p>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonCard } from "@ionic/vue";

const props = defineProps<{
  cat: String;
}>();
const active = ref(false);
const imageUrl = ref<string>(
  new URL(`/src/assets/vectors/${props.cat}.svg`, import.meta.url).href
);
</script>

<style lang="css" scoped>
ion-card {
  text-align: center;
  padding: 0.5rem;
  box-shadow: none;
  border-radius: var(--border-radius-m);
  transition: 0.1s;
  --background: var(--background-color);
  border: 1px solid transparent;
  height: 80px;
}
ion-card p {
  font-weight: 500;
  color: var(--font-color);
  font-size: 12px;
  margin-top: 4px;
}
img {
  height: 40px;
  width: 40px;
  aspect-ratio: 1;
}

ion-card.active {
  border: 1px solid var(--secondary-color);
  --background: white;
}
</style>
