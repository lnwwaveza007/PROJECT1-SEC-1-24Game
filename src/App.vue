<script setup>
//Kong Start
import { ref, onMounted, computed, watch } from "vue";

const numbers = ref([]);
const selectedNumbers = ref([]);

// watcher ตรวจสอบ selectedNumbers
watch(
  selectedNumbers,
  (newValue, OldValue) => {
    if (newValue.length > 4) {
      alert("Error: You can select up to 4 number");
      selectedNumbers.value = OldValue;
      equation.value = "";
    }
  },
  {
    deep: true,
  }
);
const generateNumbers = () => {
  numbers.value = [];
  for (let i = 0; i < 4; i++) {
    numbers.value.push(Math.floor(Math.random() * 9) + 1);
  }
  selectedNumbers.value = [];
  message.value = "";
};

const addOperator = (operator) => {
  equation.value += operator;
};

const clear = () => {
  equation.value = "";
  selectedNumbers.value = [];
  message.value = "";
};

const selectNumber = (index) => {
  if (selectedNumbers.value.includes(index)) {
    message.value = "You already selected this number.";
    return;
  }
  selectedNumbers.value.push(index);
  equation.value += numbers.value[index];
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
  <div class="px-2 flex gap-3 mt-3">
    <h1>Scene selector</h1>
    <button
      class="px-2 bg-red-200"
      v-for="scene in scenes"
      :key="scene.id"
      @click="changeScene(scene.id)"
    >
      {{ scene.name }}
    </button>
  </div>
  <!-- Kong Start -->
  <div v-bind:hidden="currentScene !== 0" class="flex justify-center items-center h-screen">
    
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
#svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
