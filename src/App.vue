<script setup>
//Kong Start
import { ref, onMounted, computed, watch } from "vue";

const numbers = ref([]);
const storeNumbers = ref([]);
const selectedNumbers = ref([]);
const message = ref("");
const isNumberSelectable = ref(true);
const operationsHistory = ref([]);

const generateNumbers = () => {
  numbers.value = [];
  for (let i = 0; i < 4; i++) {
    numbers.value.push(Math.floor(Math.random() * 9) + 1);
  }
  storeNumbers.value = [...numbers.value];
  selectedNumbers.value = [];
  message.value = "";
  operationsHistory.value = [];
};

const addOperator = (operator) => {
  if (selectedNumbers.value.length !== 2) {
    message.value = "Please select 2 numbers";
    return;
  }

  const sortedIndexes = [...selectedNumbers.value].sort((a, b) =>
    selectedNumbers.value.indexOf(a) - selectedNumbers.value.indexOf(b)
  );

  const index1 = sortedIndexes[0]; 
  const index2 = sortedIndexes[1]; 

  const num1 = numbers.value[index1];
  const num2 = numbers.value[index2];
  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }

  operationsHistory.value.push({
    numbers: [...numbers.value],
    selectedNumbers: [...selectedNumbers.value],
  });

  numbers.value[index1] = result;

  if (index1 !== index2) {
    numbers.value.splice(index2, 1);
  }

  if (numbers.value.length === 1 && numbers.value[0] === 24) {
    message.value = "Correct! The result is 24!";
  } else {
    message.value = "";
  }

  selectedNumbers.value = [];
};

const clear = () => {
  if (operationsHistory.value.length > 0) {
    const previousState = operationsHistory.value.pop();
    numbers.value = previousState.numbers;
    selectedNumbers.value = previousState.selectedNumbers;
  } else {
    numbers.value = [...storeNumbers.value];
    selectedNumbers.value = [];
  }
  message.value = "";
  isNumberSelectable.value = true;
};

watch(
  selectedNumbers,
  (newValue, oldValue) => {
    if (newValue.length >= 2) {
      isNumberSelectable.value = false;
    } else {
      isNumberSelectable.value = true;
    }
  },
  {
    deep: true,
  }
);

const selectNumber = (index) => {
  if (!isNumberSelectable.value && !selectedNumbers.value.includes(index)) {
    message.value = "You can only select 2 numbers";
    setTimeout(() => {
      message.value = "";
    }, 3000);
    return;
  }

  if (selectedNumbers.value.includes(index)) {
    selectedNumbers.value = selectedNumbers.value.filter((i) => i !== index);
  } else {
    selectedNumbers.value.push(index);
  }
};

const newGame = () => {
  generateNumbers();
};

onMounted(() => {
  newGame();
});
//Kong End
//Wave Start
const currentScene = ref(0);
const isTransitioning = ref(false);

const scenes = [
  { id: 0, name: "Main Game" },
  { id: 1, name: "Level Up" },
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
import { lineCreate } from "./utils/lineCreate";

watch(currentScene, (newValue) => {
  if (newValue !== 1) return;
  document.getElementById("svg").style.zIndex = 15;
  setTimeout(() => {
    const stars = document.getElementById("map").querySelectorAll("img");
    for (let i = 0; i < stars.length - 1; i++) {
      lineCreate(stars[i], stars[i + 1]);
    }
  }, 500);
});

function move(event) {
  console.log("move");
  var x = event.x - 100;
  var y = event.y - 20;
  var rocket = document.getElementById("rocket");
  rocket.style.left = x + "px";
  rocket.style.top = y + "px";
}
window.addEventListener("click", move);

const starStyles = ref([
  { width: "8%", left: "80px" },
  { width: "20%", left: "-300px" },
  { width: "20%", left: "100px" },
  { width: "20%", left: "-460px" },
  { width: "20%", left: "100px" },
  { width: "20%", left: "-450px" },
  { width: "20%", left: "-150px" },
  { width: "20%", left: "140px" },
]);
//Boom End
//Chica Start
//Chica End
//Tonpee Start
//Tonpee End
</script>

<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex items-center justify-between">
      <h1 class="text-white text-lg font-bold">Scene Selector</h1>
      <ul class="flex space-x-4">
        <li v-for="scene in scenes" :key="scene.id">
          <button
            class="px-4 py-2 rounded-md text-white transition-colors duration-200"
            :class="{
              'bg-red-500 hover:bg-red-600': activeSceneId === scene.id,
              'bg-gray-700 hover:bg-gray-600': activeSceneId !== scene.id,
            }"
            @click="changeScene(scene.id)"
          >
            {{ scene.name }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <!-- Kong Start -->
  <div
    v-bind:hidden="currentScene !== 0"
    class="flex flex-col justify-center items-center h-screen"
    style="
      background-image: url(/src/assets/Background-main-game.png);
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    "
  >
  <img
      src="/src/assets/Stamina.png"
      alt=""
      class="absolute top-20 left-4 w-52 h-16 object-contain z-10"
    />
    <div
      class="container mx-auto p-4"
      style="
        background-image: url(/src//assets//Placeholder.png);
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 770px;
        height: 410px;
        position: relative;
        bottom: 6em;
        left: 1.5em;
      "
    >
      <div class="relative top-16 right-10">
        <h1 class="text-3xl font-bold text-center mb-4">24GAME</h1>

        <div class="flex justify-center mb-4">
          <div
            v-for="(number, index) in numbers"
            :key="index"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg m-2 cursor-pointer select-none min-w-[60px] text-center transition-colors duration-200"
            :class="{
              'bg-yellow-500 hover:bg-yellow-600':
                selectedNumbers.includes(index),
              'opacity-50 cursor-not-allowed':
                !isNumberSelectable && !selectedNumbers.includes(index),
            }"
            @click="selectNumber(index)"
          >
            {{ number }}
          </div>
        </div>

        <div class="flex justify-center mb-4">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
            @click="addOperator('+')"
          >
            +
          </button>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
            @click="addOperator('-')"
          >
            -
          </button>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
            @click="addOperator('*')"
          >
            *
          </button>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
            @click="addOperator('/')"
          >
            /
          </button>
        </div>

        <div class="text-center mb-4">
          <p v-if="message" class="text-lg">{{ message }}</p>
        </div>

        <div class="flex justify-center">
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-1"
            @click="newGame"
          >
            New game
          </button>
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-1"
            @click="clear"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Kong End -->
  <!-- Wave Start -->
  <div
    v-if="isTransitioning"
    class="fadeUptoDown-transition fixed inset-0 z-50 bg-black pointer-events-none"
  ></div>
  <!-- Wave End -->
  <!-- Boom Start -->
  <div
    v-bind:hidden="currentScene !== 1"
    class="min-h-screen bg-gray-100 flex items-center justify-center font-sans text-gray-800"
    style="
      background-image: url(/src/assets/background.png);
      background-size: cover;
      background-position: center center;
    "
  >
    <svg style="z-index: -1" id="svg"></svg>
    <div id="map" class="flex flex-col items-center z-10">
      <img
        v-for="(style, index) in starStyles"
        :key="index"
        :style="{ width: style.width, marginLeft: style.left }"
        :src="index === 0 ? '/icons/dimond.png' : '/icons/star.png'"
      />
    </div>

    <div id="rocket" class="absolute w-[3%] ml-[100px] z-20">
      <img src="/icons/rocket.png" />
    </div>
  </div>
  <!-- Boom End -->
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
#svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
div{
  font-family: 'Press Start 2P', sans-serif;
}
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
