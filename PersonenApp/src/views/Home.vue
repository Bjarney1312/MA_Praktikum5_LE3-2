<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Personen</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>

    <ion-refresher slot="fixed" @ionRefresh="addPerson($event)">
      <ion-refresher-content
        pulling-text="Pull to refresh"
        refreshing-spinner="circles"
        refreshing-text="Refreshing...">
      </ion-refresher-content>
    </ion-refresher>

      <ion-list>
        <ion-item-sliding v-for="p in personen" :key="p">
          <ion-item>
            <ion-button size="large" disabled shape="round">{{p.initialen}}</ion-button>
            <ion-label><ion-card-title>{{p.vorname}} {{p.nachname}}</ion-card-title><ion-card-subtitle>{{p.formattedGB}}</ion-card-subtitle></ion-label>
            <ion-note>{{p.id}}</ion-note>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="loeschePerson(p)">Löschen</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {container} from "tsyringe";
import PersonService from '@/services/Person.Service';
import Person from '../Person';

import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, 
IonInput, IonList, IonCardTitle, IonCardSubtitle, IonNote, IonItemSliding, IonItemOptions, IonItemOption,IonRefresher, IonRefresherContent  } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {
    IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput, IonList, IonCardTitle, IonCardSubtitle, IonNote,
    IonItemSliding, IonItemOptions, IonItemOption,IonRefresher, IonRefresherContent 
  },
})
export default class Home extends Vue {
  
  public personen: Person[] = new Array<Person>();
  private personService: PersonService = container.resolve(PersonService);

   public async mounted(): Promise<void> {
    this.personen = await this.personService.getPersonen();
  }

  private loeschePerson(p: Person): void {
    if (p != null) {
      const index = this.personen.indexOf(p);
      if (index >= 0) {
        this.personen.splice(index, 1);
      }
      this.personService.loeschePerson(p);
    }
  }

  private addPerson(event: any): void {
    setTimeout(async () => {
      if (event != null && event.target != null) {
        this.personen = await this.personService.erzeugePerson();
        event.target.complete();
      }
    }, 500);
  }
  
}
</script>

<style lang="scss"></style>
