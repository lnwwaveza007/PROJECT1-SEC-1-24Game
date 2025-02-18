<script setup>
//Kong Start
import { ref, onMounted, computed, watch, watchEffect } from "vue";

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

  const sortedIndexes = [...selectedNumbers.value].sort(
    (a, b) =>
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
    gameResult = calResult(health.value, timer.value, levelSelect.value);
    //Update Level
    levelUnlocked++;
    localStorage.setItem("LevelUnlock", levelUnlocked);
    //Update Passed Data
    if (levelPassedData[`${levelSelect.value}`] != null) {
      if (
        gameResult.star > levelPassedData[`${levelSelect.value}`].star ||
        timer.value.max_time - timer.value.left_time <
          levelPassedData[`${levelSelect.value}`].time
      ) {
        levelPassedData[`${levelSelect.value}`] = {
          star: gameResult.star,
          time: timer.value.max_time - timer.value.left_time,
        };
      }
    }
    levelPassedData[`${levelSelect.value}`] = {
      star: gameResult.star,
      time: timer.value.max_time - timer.value.left_time,
    };
    localStorage.setItem("levelPassedData", JSON.stringify(levelPassedData));
    //Result Show
    changeScene(4);
  } else if (
    numbers.value.length === 1 &&
    numbers.value[0] !== 24 &&
    health.value.current == 0
  ) {
    gameResult = { star: -1 };
    changeScene(4);
  } else {
    message.value = "";
  }

  selectedNumbers.value = [];
};

const clear = () => {
  if (health.value.current > 0) {
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
    //Health decrease
    health.value.current--;
  } else {
    message.value = "You can't revert anymore";
  }
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
import level from "./assets/data/level.json";

const currentScene = ref(3);
const isTransitioning = ref(false);
let levelPassedData = localStorage.getItem("levelPassedData");

if (levelPassedData == null) {
  levelPassedData = {};
} else {
  levelPassedData = JSON.parse(levelPassedData);
}

const scenes = [
  { id: 0, name: "Main Game" },
  { id: 1, name: "Level Up" },
  { id: 2, name: "Story" },
  { id: 3, name: "Main Menu" },
  { id: 4, name: "Result" },
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

const timer = ref({
  max_time: 10,
  left_time: 10,
});

const startCount = setInterval(() => {
  if (currentScene.value === 0) {
    timer.value.left_time--;
    if (timer.value.left_time <= 0) {
      gameResult = { star: -1 };
      changeScene(4);
    }
  }
}, 1000);

const startGame = () => {
  //Prepare Game
  health.value.current = 3;
  timer.value.max_time = level[levelSelect.value].time_max;
  timer.value.left_time = timer.value.max_time;
  generateNumbers();
  //Change Scene
  changeScene(0);
};
//Wave End
//Boom Start
import { lineCreate } from "./utils/lineCreate";

const resize = ref(false);

const showPlay = ref(true);

const levelSelect = ref(1);

let levelUnlocked = localStorage.getItem("LevelUnlock");

if (levelUnlocked == null) {
  localStorage.setItem("LevelUnlock", 1);
} else {
  levelUnlocked = Number(levelUnlocked);
}

watch(currentScene, (newValue) => {
  if (newValue !== 1) return;

  createLine(true);
});

function createLine(changeScene = false) {
  if (changeScene == false) {
    document.getElementById("svg").innerHTML = "";
    document.getElementById("svg").style.zIndex = 50; //ปรับ z-index ให้เป็น 15 ให้เส้นแสดง

    // Create star lines
    const stars = document.getElementById("map").querySelectorAll("img");
    for (let i = 0; i < stars.length - 1; i++) {
      lineCreate(stars[i], stars[i + 1]);
    }
    // Move player(rocket) to start
    var player = document.getElementById("rocket");
    var startingPoint = document.getElementById(
      `Star${starStyles.value.length - levelSelect.value}`
    );
    player.style.left = startingPoint.getBoundingClientRect().left - 80 + "px"; //ดึงตำแหน่งที่แสดงบนหน้าจอ
    player.style.top = startingPoint.getBoundingClientRect().top + "px";
  } else {
    setTimeout(() => {
      document.getElementById("svg").innerHTML = "";
      document.getElementById("svg").style.zIndex = 50; //ปรับ z-index ให้เป็น 15 ให้เส้นแสดง

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
      player.style.left =
        startingPoint.getBoundingClientRect().left - 80 + "px"; //ดึงตำแหน่งที่แสดงบนหน้าจอ
      player.style.top = startingPoint.getBoundingClientRect().top + "px";
    }, 500);
  }
}

// For resize
window.addEventListener("resize", () => {
  createLine(false);
});

//move rocket
function move(event) {
  // Level Skip Block
  const targetLevel =
    starStyles.value.length - Number(event.target.id.replace("Star", ""));
  if (
    targetLevel != levelSelect.value + 1 &&
    targetLevel != levelSelect.value - 1
  ) {
    alert("Can't Move To That Star");
    return;
  }
  // Check Unlocked Level
  if (targetLevel > levelUnlocked) {
    alert("You need to complete the level in order");
    return;
  }
  // Set Selected Level
  levelSelect.value = targetLevel;
  // Move Rocket
  showPlay.value = false;
  var x = event.target.x - 100;
  var y = event.target.y - 10;
  var rocket = document.getElementById("rocket");
  rocket.style.left = x + "px";
  rocket.style.top = y + "px";
  setTimeout(() => {
    showPlay.value = true;
  }, 550);
}

// window.addEventListener("click", move);

const starStyles = ref([
  { width: "50%", left: "50%" },
  { width: "40%", left: "-60%" },
  { width: "40%", left: "30%" },
  { width: "40%", left: "-50%" },
  { width: "40%", left: "10%" },
  { width: "40%", left: "-30%" },
  { width: "40%", left: "-15%" },
  { width: "40%", left: "20%" },
]);

//Boom End
//Chicha Start
import { calResult } from "./utils/resultCal";

let MainMenuhover = ref("");

const hoverBtn = (event, isHover) => {
  if (isHover) {
    MainMenuhover.value = event.target.id;
  } else {
    MainMenuhover.value = "";
  }
};

const health = ref({
  max: 3,
  current: 1,
});

let gameResult;
//Chicha End
//Tonpee Start
import { soundManager } from "@/utils/soundManager.js";

const stories = ref([
  {
    id: 1,
    image: "/storys/story1.webp",
    text: "Start your adventure.",
    unlocked: true,
  },
  {
    id: 2,
    image: "/storys/story2.jpeg",
    text: "Meet a stranger.",
    unlocked: false,
  },
  {
    id: 3,
    image: "/storys/story3.webp",
    text: "A challenge ahead.",
    unlocked: false,
  },
]);

const currentStoryIndex = ref(0);
const hiddenNext = ref(false);

const soundPlayer = ref("");
const soundSource = ref("");
const volume = ref(1);

const changeStoryScene = (action) => {
  if (action === "next") {
    if (currentStoryIndex.value < stories.value.length - 1) {
      currentStoryIndex.value++;
      if (currentStoryIndex.value === stories.value.length - 1) {
        hiddenNext.value = true;
      }
    }
  } else if (action === "back") {
    if (currentStoryIndex.value > 0) {
      currentStoryIndex.value--;
      hiddenNext.value = false;
    }
  }
};

const storyText = computed(() => {
  const currentStory = stories.value[currentStoryIndex.value];
  return levelUnlocked >= currentStory.id
    ? currentStory.text
    : "You have to clear game stage for unlock";
});

const backToMainMenu = () => {
  if (currentScene.value === 2) {
    currentStoryIndex.value = 0;
    hiddenNext.value = false;
  }
  changeScene(3);
};

soundManager.init(soundPlayer, soundSource);

const clickButton = () => {
  soundManager.play("click");
};

const adjustVolume = () => {
  soundManager.setVolume(volume.value);
};

//Tonpee End
</script>

<template>
  <!-- Kong Start -->
  <div
    v-bind:hidden="currentScene !== 0"
    class="flex flex-col justify-center items-center h-screen"
    style="
      background-image: url('/src/assets/main-game/24game/main-game-bg.jpg');
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    "
  >
    <!-- Heart UI -->
    <div
      class="heartbg flex justify-center items-center mb-15 gap-5 px-13 py-6"
    >
      <img
        v-for="number in health.max"
        :src="
          number <= health.current
            ? '/src/assets/main-game/heart/heart_full.png'
            : '/src/assets/main-game/heart/heart_empty.png'
        "
        class="w-12 h-12"
      />
    </div>
    <div class="mb-20 mx-auto w-[90%] h-[50vh] md:w-[60%] lg:w-[700px] dialog">
      <div class="flex flex-col justify-center items-center h-full">
        <h1 class="text-3xl font-bold text-center mb-4">24GAME</h1>

        <div class="flex justify-center mb-4">
          <div
            v-for="(number, index) in numbers"
            :key="index"
            class="game-btn text-black font-bold py-4 px-6 rounded-lg m-2 cursor-pointer select-none min-w-[60px] text-center transition-colors duration-200"
            :class="{
              '-translate-y-2': selectedNumbers.includes(index),
              'game-btn-gold': selectedNumbers.includes(index),
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
            class="game-btn-gray cursor-not-allowed text-white font-bold py-3 px-4 rounded m-1"
            @click="addOperator('+')"
            :class="selectedNumbers.length === 2 ? 'game-btn-green' : ''"
          >
            +
          </button>
          <button
            class="game-btn-gray cursor-not-allowed text-white font-bold py-2 px-4 rounded m-1"
            @click="addOperator('-')"
            :class="selectedNumbers.length === 2 ? 'game-btn-green' : ''"
          >
            -
          </button>
          <button
            class="game-btn-gray cursor-not-allowed text-white font-bold py-2 px-4 rounded m-1"
            @click="addOperator('*')"
            :class="selectedNumbers.length === 2 ? 'game-btn-green' : ''"
          >
            *
          </button>
          <button
            class="game-btn-gray cursor-not-allowed text-white font-bold py-2 px-4 rounded m-1"
            @click="addOperator('/')"
            :class="selectedNumbers.length === 2 ? 'game-btn-green' : ''"
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
            @click="clear"
          >
            Revert
          </button>
        </div>
      </div>
      <div class="dialog justify-self-center p-4 mt-13">
        <p>Timer : {{ timer.left_time }}</p>
      </div>
    </div>
  </div>
  <!-- Kong End -->
  <!-- Wave Start -->
  <div
    v-if="isTransitioning"
    class="fadeUptoDown-transition fixed inset-0 bg-black pointer-events-none"
    style="z-index: 1000"
  ></div>
  <!-- Wave End -->
  <!-- Boom Start -->
  <div
    v-bind:hidden="currentScene !== 1"
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans text-gray-800"
    style="
      background-image: url(/src/assets/Background2.png);
      background-size: cover;
      background-position: center center;
    "
  >
    <svg style="z-index: -1" id="svg"></svg>

    <div
      id="map"
      class="py-20 px-22 min-[321px]:px-27 min-[376px]:px-32 md:px-50 flex flex-col items-center"
    >
      <!-- ปรับ z-index ให้เป็น 50 มากกว่า svg -->
      <img
        v-for="(style, index) in starStyles"
        :key="index"
        :style="{ width: style.width, marginLeft: style.left, zIndex: 50 }"
        :src="
          index === 0
            ? '/src/assets/level/diamond.png'
            : '/src/assets/level/fight.png'
        "
        :id="`Star${index}`"
        @click="move"
        class="transition-transform duration-300 hover:scale-180 z-60"
      />
    </div>

    <div
      id="rocket"
      class="absolute ml-[100px] flex flex-row gap-3 items-center"
      style="z-index: 100"
    >
      <img class="w-[40px]" src="/src/assets/level/rocket.png" />
    </div>

    <div
      class="blue-dialog bounce-animation w-[90%] md:w-110 h-50 mt-5 flex flex-col gap-3 justify-center items-center"
      style="z-index: 100"
      v-show="showPlay"
    >
      <button
        class="bg-green-600 text-white px-2 rounded-md font-semibold"
        @click="
          startGame();
          clickButton();
        "
      >
        Play
      </button>
      <p class="text-md">Level : {{ levelSelect }}</p>
      <div class="flex flex-row gap-3 justify-center">
        <img
          v-if="levelPassedData[levelSelect]?.star == null"
          v-for="(star, index) in 3"
          src="/src/assets/result/star_empty.png"
          class="w-10 h-10"
          alt="star"
        />
        <img
          v-else
          v-for="(star, index) in 3"
          :src="
            index < levelPassedData[levelSelect].star
              ? '/src/assets/result/star.png'
              : '/src/assets/result/star_empty.png'
          "
          class="w-10 h-10"
          alt="star"
        />
      </div>
      <p class="text-[10px]">
        Best Time :
        {{
          levelPassedData[levelSelect] !== undefined
            ? levelPassedData[levelSelect].time + "s"
            : "---"
        }}
      </p>
    </div>
    <div
      class="blue-dialog bounce-animation mt-5 w-[90%] md:w-110 h-50 flex flex-col gap-3 justify-center items-center"
      v-show="!showPlay"
    >
      <p class="text-md">Moving...</p>
    </div>
  </div>
  <!-- Boom End -->
  <!-- Tonpee Start-->

  <audio controls ref="soundPlayer" id="soundManager" hidden>
    <source :src="soundSource" type="audio/mp3" />
  </audio>

  <div v-if="currentScene === 2" class="story-container">
    <div v-if="stories[currentStoryIndex]" class="story-wrapper">
      <div
        v-if="levelUnlocked >= stories[currentStoryIndex].id"
        class="story-image-wrapper"
      >
        <img :src="stories[currentStoryIndex].image" class="story-image" />
      </div>
      <div v-else class="story-wrapper story-lock-wrapper">
        <img src="/public/icons/lock.png" class="lock-icon" />
      </div>
      <p class="story-text">{{ storyText }}</p>
      <div class="button-story-stage">
        <button
          @click="
            changeStoryScene('back');
            clickButton();
          "
          class="back-story-button"
        >
          BACK
        </button>
        <button
          v-show="!hiddenNext"
          @click="
            changeStoryScene('next');
            clickButton();
          "
          class="story-button"
        >
          NEXT
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="currentScene === 2 || currentScene === 1"
    class="menu-button-wrapper"
  >
    <button
      class="menu-button"
      @click="
        backToMainMenu();
        clickButton();
      "
    >
      MENU
    </button>
  </div>
  <div v-if="currentScene === 3" class="volume-control">
    <label>Volume:</label>
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model="volume"
      @input="adjustVolume"
    />
    <span>{{ Math.round(volume * 100) }}%</span>
  </div>

  <!-- Tonpee End -->
  <!-- Chicha Start -->
  <!-- Main Menu -->
  <div
    v-if="currentScene == 3"
    style="
      background-image: url('/main-menu/menu_bg.png');
      background-size: cover;
      background-position: center center;
    "
    class="h-screen w-screen just flex flex-col items-center pt-50 gap-7"
  >
    <h1
      class="text-3xl min-[321px]:text-5xl md:text-6xl text-[#ffd100] pixelFont"
      style="-webkit-text-stroke: 0.07em #2e1b5b"
    >
      24 GAME
    </h1>
    <div
      class="cursor-pointer font-serif flex flex-row text-4xl justify-center items-center gap-7 z-10 mt-10"
      @mouseover="hoverBtn($event, true)"
      @mouseleave="hoverBtn($event, false)"
      @click="changeScene(1)"
    >
      <span
        v-show="MainMenuhover === 'playBtn'"
        class="text-[#ffd100]"
        style="-webkit-text-stroke: 0.07em #2e1b5b"
        >▶</span
      >
      <h2
        id="playBtn"
        class="text-[#ffd100]"
        style="-webkit-text-stroke: 0.07em #2e1b5b"
        @click="clickButton"

      >
        Play
      </h2>
      <span
        v-show="MainMenuhover === 'playBtn'"
        class="text-[#ffd100]"
        style="-webkit-text-stroke: 0.07em #2e1b5b"
        >◀</span
      >
    </div>
    <div
      class="cursor-pointer font-serif flex flex-row text-4xl justify-center items-center gap-7 z-10"
      @mouseover="hoverBtn($event, true)"
      @mouseleave="hoverBtn($event, false)"
      @click="changeScene(2)"
    >
      <span
        v-show="MainMenuhover === 'storyBtn'"
        class="text-[#ffd100]"
        style="-webkit-text-stroke: 0.07em #2e1b5b"
        >▶</span
      >
      <h2
        id="storyBtn"
        class="text-4xl text-[#ffd100]"
        style="-webkit-text-stroke: 0.07em #2e1b5b"
        @click="clickButton"
      >
        Story
      </h2>
      <span
        v-show="MainMenuhover === 'storyBtn'"
        class="text-[#ffd100]"
        style="-webkit-text-stroke: 0.07em #2e1b5b"
        >◀</span
      >
    </div>
  </div>
  <!-- Result -->
  <div
    v-if="currentScene == 4"
    style="
      background-image: url('/src/assets/result/result_bg.png');
      background-size: cover;
      background-position: center center;
    "
    class="h-screen w-screen flex justify-center items-center"
  >
    <div
      v-if="gameResult.star !== -1"
      class="result-box w-[95%] md:w-[70%] lg:w-[70%] xl:w-[50%] h-[70vh] bg-white flex flex-col items-center pt-[30%] md:pt-[8%] lg:pt-[5%] gap-10"
    >
      <div class="flex flex-row justify-center gap-7">
        <img
          v-for="(star, index) in 3"
          :src="
            index < gameResult.star
              ? '/src/assets/result/star.png'
              : '/src/assets/result/star_empty.png'
          "
          class="w-12 h-12 min-[321px]:w-15 min-[321px]:h-15 md:w-28 md:h-28 lg:w-30 lg:h-30"
          :class="index < gameResult.star ? 'pulse-animation' : ''"
          alt="star"
        />
      </div>
      <div class="flex flex-col items-center gap-4">
        <h1
          class="text-[#ffe14d] text-[23px] min-[321px]:text-[25px] md:text-[38px]"
          style="-webkit-text-stroke: 0.09em #b33818"
        >
          LEVEL
        </h1>
        <h1
          class="text-[#ffe14d] text-[23px] min-[321px]:text-[25px] md:text-[38px]"
          style="-webkit-text-stroke: 0.09em #b33818"
        >
          COMPLETED
        </h1>
      </div>
      <button
        @click="changeScene(1)"
        class="game-btn-gold pulse-animation p-3 cursor-pointer hover:-translate-y-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 32 32"
          fill="#fff"
        >
          <path
            d="M 13 4 L 13 6 L 9 6 L 9 8 L 5 8 L 5 10 L 2 10 L 2 11 L 2 12 L 2 13 L 4 13 L 4 28 L 28 28 L 28 13 L 30 13 L 30 12 L 30 11 L 30 10 L 27 10 L 27 9 L 27 8 L 27 4 L 25 4 L 25 8 L 23 8 L 23 6 L 19 6 L 19 4 L 13 4 z M 14 7 L 18 7 L 18 8 L 18 9 L 22 9 L 22 10 L 22 11 L 26 11 L 26 12 L 26 13 L 26 26 L 22 26 L 22 14 L 10 14 L 10 26 L 6 26 L 6 13 L 6 12 L 6 11 L 10 11 L 10 10 L 10 9 L 14 9 L 14 8 L 14 7 z M 12 16 L 20 16 L 20 20 L 18 20 L 18 22 L 20 22 L 20 26 L 12 26 L 12 16 z"
          ></path>
        </svg>
      </button>
    </div>
    <div
      v-else
      class="result-box w-[95%] md:w-[70%] lg:w-[70%] xl:w-[50%] h-[70vh] bg-white flex flex-col items-center pt-[30%] md:pt-[8%] lg:pt-[5%] gap-10"
    >
      <div class="flex flex-row justify-center gap-7">
        <img
          v-for="(star, index) in 3"
          src="/src/assets/result/star_empty.png"
          class="w-12 h-12 min-[321px]:w-15 min-[321px]:h-15 md:w-28 md:h-28 lg:w-30 lg:h-30"
          alt="star"
        />
      </div>
      <div class="flex flex-col items-center gap-4">
        <h1
          class="text-[#ff4d4d] text-[23px] min-[321px]:text-[25px] md:text-[38px]"
          style="-webkit-text-stroke: 0.09em #b33818"
        >
          FAILED
        </h1>
        <h1
          class="text-[#ff4d4d] text-[23px] min-[321px]:text-[25px] md:text-[38px]"
          style="-webkit-text-stroke: 0.09em #b33818"
        >
          TRY AGAIN
        </h1>
      </div>
      <button
        @click="changeScene(1)"
        class="game-btn-gold pulse-animation p-3 cursor-pointer hover:-translate-y-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 32 32"
          fill="#fff"
        >
          <path
            d="M 13 4 L 13 6 L 9 6 L 9 8 L 5 8 L 5 10 L 2 10 L 2 11 L 2 12 L 2 13 L 4 13 L 4 28 L 28 28 L 28 13 L 30 13 L 30 12 L 30 11 L 30 10 L 27 10 L 27 9 L 27 8 L 27 4 L 25 4 L 25 8 L 23 8 L 23 6 L 19 6 L 19 4 L 13 4 z M 14 7 L 18 7 L 18 8 L 18 9 L 22 9 L 22 10 L 22 11 L 26 11 L 26 12 L 26 13 L 26 26 L 22 26 L 22 14 L 10 14 L 10 26 L 6 26 L 6 13 L 6 12 L 6 11 L 10 11 L 10 10 L 10 9 L 14 9 L 14 8 L 14 7 z M 12 16 L 20 16 L 20 20 L 18 20 L 18 22 L 20 22 L 20 26 L 12 26 L 12 16 z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  <!-- Chicha End -->
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

.game-btn {
  border-image: url("./assets/main-game/24game/game-btn.png");
  border-image-slice: 15 fill;
  border-image-width: 20px;
  border-image-repeat: repeat;
  background-size: 105% 105%;
  transition: translate 0.2s ease-out;
}

.game-btn-gold {
  border-image: url("./assets/main-game/24game/game-btn-gold.png");
  border-image-slice: 15 fill;
  border-image-width: 20px;
  border-image-repeat: repeat;
  background-size: 105% 105%;
  transition: translate 0.2s ease-out;
}

.game-btn-gray {
  border-image: url("./assets/main-game/24game/game-btn-gray.png");
  border-image-slice: 15 fill;
  border-image-width: 20px;
  border-image-repeat: repeat;
  background-size: 105% 105%;
  transition: translate 0.2s ease-out;
}

.game-btn-green {
  border-image: url("./assets/main-game/24game/game-btn-green.png");
  border-image-slice: 15 fill;
  border-image-width: 20px;
  border-image-repeat: repeat;
  background-size: 105% 105%;
  transition: translate 0.2s ease-out;
  cursor: pointer;
}

.blue-dialog {
  border-image: url("./assets/level/blue-dialog.png");
  border-image-slice: 13 fill;
  border-image-width: 30px;
  border-image-repeat: repeat;
}

.dialog {
  border-image: url("./assets/main-game/24game/dialog-bg.png");
  border-image-slice: 13 fill;
  border-image-width: 30px;
  border-image-repeat: repeat;
}

.dialog::backdrop {
  background: rgba(52, 70, 69, 0.567);
}

#svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.pixelFont {
  font-family: "Press Start 2P", sans-serif;
}
div {
  font-family: "Press Start 2P", sans-serif;
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
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce-animation {
  animation: bounce 1s infinite;
}

#map {
  border-image: url("./assets/level/book-bg.png");
  border-image-slice: 75 fill;
  border-image-width: 40px;
  border-image-repeat: repeat;
}
/* Boom End */
/* Chica Start */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

.heartbg {
  border-image: url("./assets/main-game/heart/heart_bg.png");
  border-image-slice: 8 fill;
  border-image-width: 15px;
  border-image-outset: 0px 0px 0px 0px;
}
.result-box {
  border-image: url("./assets/result/result_box.png");
  border-image-slice: 60;
  border-image-width: 40px;
  border-image-repeat: repeat;
  background-size: 105% 105%;
  background-color: #8dcced;
}
/* Chica End */
/* Tonpee Start */

.story-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  min-height: 500px;
  animation: fadeIn 0.5s ease-in-out;
}

.story-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 250px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.story-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.story-image {
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.story-image:hover {
  transform: scale(1.05);
}

.story-lock-wrapper {
  position: relative;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 12px;
}

.lock-icon {
  width: 60px;
  height: 60px;
  opacity: 0.8;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.story-text {
  font-size: 1.2rem;
  margin-top: 20px;
  color: #222;
  font-weight: bold;
}

.button-story-stage {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.story-button,
.back-story-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

.story-button:hover,
.back-story-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.menu-button-wrapper {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 60;
}

.menu-button {
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.menu-button:hover {
  background-color: #b52b3a;
  transform: scale(1.05);
}

.volume-control {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
}

@media (max-width: 480px) {
  .story-container {
    min-height: 400px;
  }
  .story-text {
    font-size: 1rem;
  }
  .story-button,
  .back-story-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
  .menu-button {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tonpee End */
</style>
