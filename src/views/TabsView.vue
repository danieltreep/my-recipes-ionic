<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="recipes" href="/recipes">
          <IonIcon :icon="bookOutline" size="large" />
          <IonLabel>Recipes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="new recipe" href="/new">
          <IonIcon :icon="addCircleOutline" size="large" />
          <IonLabel>New</IonLabel>
        </IonTabButton>

        <IonTabButton tab="favorites" href="/favorites">
          <IonIcon :icon="heartOutline" size="large" />
          <IonLabel>Favorites</IonLabel>
        </IonTabButton>

        <IonTabButton tab="account" href="/account">
          <IonIcon :icon="personCircleOutline" size="large" />
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
  IonIcon
} from '@ionic/vue'

import { personCircleOutline, addCircleOutline, heartOutline, bookOutline } from 'ionicons/icons'
</script>

<style lang="css" scoped>
ion-tab-bar {
  padding-block: 0.5rem;
  --ion-tab-bar-color-selected: var(--primary-color);
}
</style>
