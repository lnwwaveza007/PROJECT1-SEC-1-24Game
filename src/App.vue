<script setup>
//Kong Start
//Kong End
//Wave Start
import { ref } from "vue";

const currentScene = ref(0);
const isTransitioning = ref(false);

const scenes = [
  { id: 0, name: "Scene 1" },
  { id: 1, name: "Scene 2" },
];

const changeScene = (id) => {
  if (currentScene.value === id) return;
  
  isTransitioning.value = true;
  
  setTimeout(() => {
    currentScene.value = id;
    
    setTimeout(() => {
      isTransitioning.value = false;
    }, 1000);
  }, 1000);
};
//Wave End
//Boom Start
//Boom End
//Chica Start
//Chica End
//Tonpee Start
//Tonpee End
</script>

<template>
  <!-- Kong Start -->
  <!-- Kong End -->
  <!-- Wave Start -->
  <button
    v-for="scene in scenes"
    :key="scene.id"
    @click="changeScene(scene.id)"
  >
    {{ scene.name }}
  </button>
  <div
    v-bind:hidden="currentScene !== 0"
    class="w-[100%] h-[100vh] bg-red-300 flex justify-center items-center"
  >
    <h1 class="text-3xl">Scene 1</h1>
  </div>
  <div
    v-bind:hidden="currentScene !== 1"
    class="w-[100%] h-[100vh] bg-green-300 flex justify-center items-center"
  >
    <h1 class="text-3xl">Scene 2</h1>
  </div>

  <div 
      v-if="isTransitioning"
      class="fadeUptoDown-transition fixed inset-0 z-50 bg-black pointer-events-none"
  ></div>
  <!-- Wave End -->
  <!-- Boom Start -->
  <!-- Boom End -->
  <!-- Chica Start -->
  <!-- Chica End -->
  <!-- Tonpee Start -->
  <!-- Tonpee End -->
</template>

<style scoped>
/* Kong Start */
/* Kong End */
/* Wave Start */
@keyframes fadeUptoDown {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

.fadeUptoDown-transition {
  animation: fadeUptoDown 1s ease-out forwards;
}
/* Wave End */
/* Boom Start */
/* Boom End */
/* Chica Start */
/* Chica End */
/* Tonpee Start */
/* Tonpee End */
</style>
