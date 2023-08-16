<template>
  <ion-button
    id="open-filter-options"
    fill="clear"
    color="dark"
    class="ion-no-padding"
    size="small"
  >
    <ion-icon :icon="filter" slot="icon-only"></ion-icon>
  </ion-button>
  <ion-modal
    trigger="open-filter-options"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
  >
    <div class="ion-padding">
      <h4>Filter options</h4>
      <div class="filter-section">
        <p>Ingredients</p>
        <TagList :tags="ingredients" />
      </div>
      <div class="filter-section">
        <p>Type of dish</p>
        <TagList :tags="dish" />
      </div>
      <div class="filter-section">
        <p>Other</p>
        <TagList :tags="other" />
      </div>
      <ion-button expand="block">Save</ion-button>
    </div>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonIcon,
  IonButton,
  IonModal,
  IonContent,
} from "@ionic/vue";
import { filter } from "ionicons/icons";
import TagList from "../tags/TagList.vue";

const other = ["Vegetarian", "Oven", "BBQ"];

const dish: Array<string> = [
  "Pizza",
  "Baking",
  "Soup",
  "Salad",
  "Sushi",
  "Smoothie",
];

const ingredients: Array<string> = [
  "Seafood",
  "Chicken",
  "Beef",
  "Fish",
  "Fruit",
  "Egg",
  "Nuts",
  "Chocolate",
  "Wheat",
  "Dairy",
  "Spicy",
];
</script>

<style lang="css" scoped>
ion-modal {
  --ion-padding: 1.5rem;
  --height: auto;
}
ion-button {
  --color: white;
  --border-radius: 8px;
}
.filter-section {
  margin-block: 1.5rem;
}
p {
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
}
ion-icon {
  font-size: 20px;
  color: var(--font-color);
}
</style>
