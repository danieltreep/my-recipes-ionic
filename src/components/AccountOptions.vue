<template>
  <div class="options" @click.stop="$emit('delete')">
    <span class="material-symbols-outlined">delete</span>
    <ion-icon :icon="ellipsisVerticalCircle"></ion-icon>
    <p>Verwijder account</p>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { ellipsisVerticalCircle } from "ionicons/icons";
</script>

<style lang="css" scoped>
.options {
  position: absolute;
  background-color: var(--card-color);
  padding: 0.5rem;
  display: flex;
  right: 0;
  top: 2rem;
  border-radius: var(--border-radius-m);
  box-shadow: var(--box-shadow);
  align-items: center;
  gap: 0.5rem;
}
.options .material-symbols-outlined {
  font-size: 20px;
}
</style>
