<template>
  <ul>
    <ion-item>
      <ion-input
        v-model="currentIngredient.name"
        label="Ingredient:"
        placeholder="Ingredient"
      ></ion-input>
    </ion-item>
    <ion-item lines="none">
      <ion-input
        v-model="(currentIngredient.amount as number)"
        type="number"
        label="Amount:"
        placeholder="0"
      ></ion-input>

      <ion-select placeholder="mg" v-model="currentIngredient.unit">
        <ion-select-option value="mg">mg</ion-select-option>
        <ion-select-option value="g">g</ion-select-option>
        <ion-select-option value="kg">kg</ion-select-option>
        <ion-select-option value="ml">ml</ion-select-option>
        <ion-select-option value="l">l</ion-select-option>
        <ion-select-option value="stuk(s)">stuk(s)</ion-select-option>
        <ion-select-option value="el">el</ion-select-option>
        <ion-select-option value="tl">tl</ion-select-option>
      </ion-select>
      <ion-button @click.prevent="handleAddIngredient" fill="outline">
        <ion-icon :icon="add" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-item>
  </ul>
  <ErrorMessage message="Add an ingredient" v-if="error" />
</template>

<script setup lang="ts">
import {
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonItemGroup,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { useSelectedRecipeStore } from "@/stores/currentRecipe";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ErrorMessage from "@/components/error/ErrorMessage.vue";

const { currentIngredient } = storeToRefs(useSelectedRecipeStore());
const { addIngredient } = useSelectedRecipeStore();

const error = ref(false);

const handleAddIngredient = () => {
  if (!currentIngredient.value.name.length) {
    error.value = true;
    return;
  } else {
    addIngredient();
    error.value = false;
  }
};
</script>

<style lang="css" scoped>
input {
  width: fit-content;
  border: none;
  border-bottom: 1px solid var(--background-color);
  width: 100%;
  outline: transparent;
}
select {
  border: none;
  padding-right: 0.5rem;
  /* text-align: end; */
  outline: transparent;
  width: 100%;
}
ion-select {
  margin-left: auto;
}
ul {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--element-box-shadow);
}
</style>
