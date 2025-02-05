<script setup>
//Kong Start
import { ref, onMounted, computed, watch } from "vue";

const numbers = ref([]);
const equation = ref("");

const selectedNumbers = ref([]);

//ตรวจสอบว่าตัวเลขถูกเลือกหรือยัง
const isSelectedNumbers = computed(() => {
  return (index) => selectedNumbers.value.includes(index);
});

//ตรวจสอบสมการว่าถูกต้องไหม
const isEquationValid = computed(() => {
  try {
    eval(equation.value);
    return selectedNumbers.value.length > 0; // เลือกตัวเลขอย่างน้อย 1 ตัว
  } catch {
    return false;
  }
});

//สร้าง message
const message = computed(() => {
  if (selectedNumbers.value.length === 0 && equation.value.length === 0) {
    return ""; //start
  }
  try {
    const result = eval(equation.value);
    if (result === 24) {
      return "Correct! The result is 24!";
    } else {
      return `Incorrect your result is ${result} , please try again`;
    }
  } catch {
    return "Invalid equation! Please check your input";
  }
});

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

const addParenthesis = (parenthesis) => {
  equation.value += parenthesis;
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
  document.getElementById("svg").style.zIndex = 15; //ปรับ z-index ให้เป็น 15 ให้เส้นแสดง

  setTimeout(() => {
    // Create star lines
    const stars = document.getElementById("map").querySelectorAll("img");
    for (let i = 0; i < stars.length - 1; i++) {
      lineCreate(stars[i], stars[i + 1]);
    }
    // Move player(rocket) to start
    var player = document.getElementById("rocket");
    var startingPoint = document.getElementById(
      `Star${starStyles.value.length - 1}`
    );
    player.style.left = startingPoint.getBoundingClientRect().left - 45 + "px"; //ดึงตำแหน่งที่แสดงบนหน้าจอ
    player.style.top = startingPoint.getBoundingClientRect().top + "px";
  }, 500);
});

//move rocket
function move(event) {
  console.log("move");
  var x = event.x - 100;
  var y = event.y - 20;
  var rocket = document.getElementById("rocket");
  rocket.style.left = x + "px";
  rocket.style.top = y + "px";
}

// window.addEventListener("click", move);

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
  <div class="px-2 flex gap-3">
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
  <div v-bind:hidden="currentScene !== 0">
    <div
      class="bg-white shadow-lg rounded-xl p-8 w-[800px] min-h-[50vh] flex flex-col justify-between"
    >
      <h1 class="text-[3em] font-bold text-center">Game 24</h1>

      <!-- Display Random Numbers -->
      <div class="flex justify-center gap-4 my-4">
        <button
          v-for="(num, index) in numbers"
          :key="index"
          class="px-6 py-3 text-[3em] font-semibold bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
          :class="{ 'bg-green-500': selectedNumbers.includes(index) }"
          @click="selectNumber(index)"
        >
          {{ num }}
        </button>
      </div>

      <!-- Display Equation -->
      <div class="text-center text-[2em] font-mono mb-4">
        <p>
          Equation: <span class="text-gray-500">{{ equation }}</span>
        </p>
      </div>

      <!-- Operator Buttons -->
      <div class="grid grid-cols-6 gap-2 mb-4 text-[2em]">
        <button
          @click="addOperator('+')"
          class="btn bg-amber-100 rounded-lg w-16"
        >
          +
        </button>
        <button
          @click="addOperator('-')"
          class="btn bg-amber-100 rounded-lg w-16"
        >
          -
        </button>
        <button
          @click="addOperator('*')"
          class="btn bg-amber-100 rounded-lg w-16"
        >
          ×
        </button>
        <button
          @click="addOperator('/')"
          class="btn bg-amber-100 rounded-lg w-16"
        >
          ÷
        </button>
        <button
          @click="addParenthesis('(')"
          class="btn bg-amber-100 rounded-lg w-16"
        >
          (
        </button>
        <button
          @click="addParenthesis(')')"
          class="btn bg-amber-100 rounded-lg w-16"
        >
          )
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-4">
        <button
          @click="clear"
          class="px-4 py-2 bg-red-500 text-white text-[2em] rounded-md hover:bg-red-600"
        >
          Clear
        </button>
        <button
          @click="checkResult"
          class="px-4 py-2 bg-green-500 text-white text-[2em] rounded-md hover:bg-green-600"
        >
          Check
        </button>
        <button
          @click="newGame"
          class="px-4 py-2 bg-blue-500 text-white text-[2em] rounded-md hover:bg-blue-600"
        >
          New Game
        </button>
      </div>

      <!-- Feedback Message -->
      <div class="text-center mt-4 text-lg font-semibold">
        <p
          :class="
            message.includes('Correct') ? 'text-green-600' : 'text-red-600'
          "
        >
          {{ message }}
        </p>
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

    <div id="map" class="flex flex-col items-center z-50"> //ปรับ z-index ให้เป็น 50 มากกว่า svg
      <img
        v-for="(style, index) in starStyles"
        :key="index"
        :style="{ width: style.width, marginLeft: style.left, zIndex: 50 }"
        :src="index === 0 ? '/icons/dimond.png' : '/icons/star.png'"
        :id="`Star${index}`"
        @click="move"
      />
    </div>

    <div id="rocket" class="absolute w-[3%] ml-[100px] z-20">
      <!-- <p>Player</p> -->
      <img src="/icons/rocket.png" />
    </div>
  </div>
  <!-- Boom End -->
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
#svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#rocket {
  transition: left 0.5s ease-out, top 0.5s ease-out;
}
/* Boom End */
/* Chica Start */
/* Chica End */
/* Tonpee Start */
/* Tonpee End */
</style>
