<script setup>
//Kong Start
import { ref, onMounted } from 'vue';

const numbers = ref([])
const eqation = ref('')
const message = ref('')
const selectedNumbers = ref([])

const generateNumbers = () => {
  numbers.value = []
  for(let i = 0; i < 4; i++){
    numbers.value.push(Math.floor(Math.random() * 9)+1)
  }
  numbers.value = ''
  selectedNumbers.value = []
  message.value = ''
}

const addOperator = (operator) => {
  eqation.value += operator
}

const addParenthesis = (parenthesis) => {
  eqation.value += parenthesis
}

const clear = () => {
  eqation.value = ''
  selectedNumbers.value = []
  message.value = ''
}
//Kong End
//Wave Start
//Kong End
//Wave Start
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
  <div class="min-h-screen bg-gray-100 flex items-center justify-center font-sans text-gray-800">
    <div class="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
      <h1 class="text-3xl font-bold text-center mb-6">Game 24</h1>
    </div>
  </div>
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
