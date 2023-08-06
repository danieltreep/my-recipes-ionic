<template>
  <ion-item-group>
    <ion-item>
      <ion-input
        v-model="currentIngredient.name"
        label="Ingredient:"
        placeholder="Ingredient"
      ></ion-input>
    </ion-item>
    <ion-item>
      <ion-input
        v-model="currentIngredient.amount"
        type="number"
        label="Hoeveelheid:"
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
      <ion-button @click.prevent="handleAddIngredient">
        <ion-icon :icon="add" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-item>
    <div class="error" v-if="error">
      <p>Voer een ingredient in</p>
    </div>
  </ion-item-group>
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
import { useNewRecipeStore } from "@/stores/newRecipe";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { add } from "ionicons/icons";

const { currentIngredient } = storeToRefs(useNewRecipeStore());
const { addIngredient } = useNewRecipeStore();

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
.addIngredient {
  display: grid;
  grid-template-columns: 5fr 4fr 1fr;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.box {
  background-color: var(--card-color);
  padding: 0.7rem;
  border-radius: var(--border-radius-m);
  box-shadow: var(--box-shadow);
  border: none;
  display: flex;
}
input {
  width: fit-content;
  border: none;
  border-bottom: 1px solid var(--background-color);
  width: 100%;
  outline: transparent;
}
.eenheid {
  display: grid;
  grid-template-columns: 30px 1fr;
}
select {
  border: none;
  padding-right: 0.5rem;
  /* text-align: end; */
  outline: transparent;
  width: 100%;
}
.add {
  border: 1px solid var(--secondary-color);
  display: flex;
  justify-content: center;
  font-weight: bold;
}
ion-select {
  margin-left: auto;
}
</style>
