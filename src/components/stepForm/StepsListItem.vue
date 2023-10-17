<template>
  <li class="step">
    <div class="info">
      <p class="number">{{ index + 1 }}.</p>
      <ion-icon
        :icon="pencil"
        v-if="showEdit && !edit"
        class="material-symbols-outlined"
        @click="edit = true"
      ></ion-icon>
      <ion-icon
        :icon="save"
        v-if="edit"
        class="material-symbols-outlined"
        @click="handleEdit"
      ></ion-icon>
    </div>
    <div>
      <p v-if="!edit">{{ step.charAt(0).toUpperCase() }}{{ step.slice(1) }}</p>
      <ion-textarea
        class="edit-textarea"
        v-model="editStep"
        v-if="edit"
      ></ion-textarea>
      <!-- <textarea v-model="editStep" v-if="edit"></textarea> -->
    </div>
  </li>
</template>

<script setup lang="ts">
import { IonIcon, IonTextarea } from "@ionic/vue";
import { ref } from "vue";
import { useNewRecipeStore } from "@/stores/newRecipe";
import { pencil, save } from "ionicons/icons";

const props = defineProps<{
  step: string;
  index: number;
  showEdit: boolean;
}>();

// Start with content of step in textarea
const editStep = ref(props.step.valueOf());

// Show save icon and textarea if true
const edit = ref(false);

const { updateStep } = useNewRecipeStore();

const handleEdit = () => {
  edit.value = false;
  updateStep(editStep.value, props.index);
};
</script>

<style lang="css" scoped>
li {
  display: grid;
  grid-template-columns: calc(18px + 1rem) 7fr 32px;
  /* align-items: start; */
  padding-block: 0.5rem;
  color: var(--font-color);
  font-size: 14px;
}
li:not(:last-child) {
  border-bottom: 1px solid var(--lines-color);
}
.step .material-symbols-outlined {
  font-size: 16px;
  color: var(--font-inactive);
}
.step:not(:first-of-type) {
  margin-top: 5px;
}
.number {
  font-size: 20px;
  font-weight: bold;
  font-family: serif;
  color: var(--primary-color);
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

ion-textarea.edit-textarea {
  --padding-top: 0;
}
</style>
