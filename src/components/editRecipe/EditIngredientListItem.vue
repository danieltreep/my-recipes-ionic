<template>
  <li class="inputGroup" :class="checked ? 'checked' : ''">
    <div class="ingredient">
      <ion-icon
        v-if="edit"
        @click.prevent="handleDelete(index)"
        @keydown.enter="handleDelete(index)"
        :icon="closeCircleOutline"
        size="small"
      ></ion-icon>

      <ion-checkbox
        v-if="!edit"
        class="material-symbols-outlined"
        @click.prevent="handleCheck()"
        @keydown.enter="handleCheck()"
      ></ion-checkbox>
      <p>
        {{ ingredient.name.charAt(0).toUpperCase()
        }}{{ ingredient.name?.slice(1) }}
      </p>
    </div>
    <div class="hoeveelheid">
      <p>{{ ingredient?.amount }}</p>
      <p>{{ ingredient?.unit }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { IonCheckbox, IonIcon, IonButton } from "@ionic/vue";
import type { Ingredient } from "@/types/Ingredient";
import { useSelectedRecipeStore } from "@/stores/currentRecipe";
import { closeCircleOutline, trashBin } from "ionicons/icons";
import { ref } from "vue";

const { deleteIngredient } = useSelectedRecipeStore();
const checked = ref(false);

defineProps<{
  ingredient: Ingredient;
  index: number;
  edit: boolean;
}>();

const handleDelete = (index: number) => {
  deleteIngredient(index);
};

const handleCheck = () => {
  checked.value = !checked.value;
};
</script>

<style lang="css" scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
}
.checked {
  color: var(--font-inactive);
}
.hoeveelheid {
  display: flex;
  font-size: 14px;
  gap: 0.2rem;
}
.ingredient {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.ingredient .material-symbols-outlined {
  font-size: 16px;
}
</style>
