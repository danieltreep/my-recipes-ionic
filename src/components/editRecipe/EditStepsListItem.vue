<template>
  <li class="step box">
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
import { pencil, save } from "ionicons/icons";
import { ref } from "vue";
import { useSelectedRecipeStore } from "@/stores/currentRecipe";

const props = defineProps<{
  step: string;
  index: number;
  showEdit: boolean;
}>();

// Start with content of step in textarea
const editStep = ref(props.step.valueOf());

// Show save icon and textarea if true
const edit = ref(false);

const { updateStep } = useSelectedRecipeStore();

const handleEdit = () => {
  edit.value = false;
  updateStep(editStep.value, props.index);
};
</script>

<style lang="css" scoped>
li {
  display: grid;
  grid-template-columns: 1fr 7fr;
  align-items: start;
  padding: 1rem;
  color: var(--font-color);
  box-shadow: var(--element-box-shadow);
}

.step:not(:first-of-type) {
  margin-top: 5px;
}
.number {
  font-size: 32px;
  font-weight: bold;
  font-family: serif;
  color: var(--secondary-color);
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
