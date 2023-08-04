<template>
  <ion-card
    :router-link="{ name: 'Category', params: { category: String(cat) } }"
  >
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

const imageUrl = ref<string>(
  new URL(`/src/assets/vectors/${props.cat}.svg`, import.meta.url).href
);
</script>

<style lang="css" scoped>
ion-card {
  aspect-ratio: 2/2.5;
  text-align: center;
  padding: 1rem;
  box-shadow: var(--element-box-shadow);
  border-radius: var(--border-radius-m);
  transition: 0.1s;
}
ion-card p {
  font-weight: 500;
  color: var(--font-color);
  word-wrap: break-word;
  margin-top: 1rem;
}
img {
  height: 90%;
}
img:last-of-type {
  height: 80%;
}
ion-card:active {
  transform: translateY(5px);
  box-shadow: none;
}
</style>
