<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="recipes" href="/recipes">
          <IonIcon :icon="bookOutline" />
          <IonLabel>Recipes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="favorites" href="/favorites">
          <IonIcon :icon="heartOutline" />
          <IonLabel>Favorites</IonLabel>
        </IonTabButton>

        <IonTabButton tab="account" href="/account">
          <IonIcon :icon="personCircleOutline" />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";

import {
  personCircleOutline,
  addCircleOutline,
  heartOutline,
  bookOutline,
} from "ionicons/icons";
</script>

<style lang="css" scoped>
ion-tab-bar {
  padding-inline: 2.5rem;
  --ion-tab-bar-color-selected: var(--secondary-color);
  box-shadow: 0 -2px 4px 0 #00000010;
  --border: none;
}
</style>
