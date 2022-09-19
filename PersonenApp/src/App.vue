<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    IonApp,
    IonRouterOutlet,
  },
})
export default class App extends Vue {}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #448cd3;
}
</style>
