<script setup>
//Kong Start
import { ref, onMounted } from 'vue';

const numbers = ref([])
const equation = ref('')
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
  equation.value += operator
}

const addParenthesis = (parenthesis) => {
  equation.value += parenthesis
}

const clear = () => {
  equation.value = ''
  selectedNumbers.value = []
  message.value = ''
}

const checkResult = () => {
  try{
    const result = eval(equation.value)
    if(result === 24){
      message.value("Correct! The result is 24")
    }else{
      message.value(`Incorrect The result is ${result}, Please try again`)
    }
  }catch{
    message.value("Invalid equation! Please check your input")
  }
}

const selectNumbers = (index)=> {
  if(selectedNumbers.value.includes(index)){
    message.value("You already selected this number")
    return
  }
  selectedNumbers.value.push(index)
  equation.value += numbers.value[i]
} 

const newGame = () => {
  generateNumbers()
}

onMounted(() => {
  newGame()
})
//Kong End
//Wave Start
//Wave End
//Boom Start
import { lineCreate } from './utils/lineCreate';

setTimeout(() => {
  const stars = document.getElementById("map").querySelectorAll("img")
  for (let i = 0; i < stars.length - 1; i++) {
    lineCreate(stars[i], stars[i + 1]);
  }
}, 1000);

//Boom End
//Chica Start
//Chica End
//Tonpee Start
//Tonpee End
</script>

<template>
  <!-- Kong Start -->
  <div v-bind:hidden="true" class="min-h-screen bg-gray-100 flex items-center justify-center font-sans text-gray-800">
    <div class="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
      <h1 class="text-3xl font-bold text-center mb-6">Game 24</h1>

      <!-- show generate numbers -->
       <div>
            
       </div>

       <!-- show button -->
        <div class="flex justify-center items-centers gap-4 mb-4">
          <button>+</button>
          <button>-</button>
          <button>*</button>
          <button>/</button>
          <button></button>
          <button></button>
        </div>
        <div class="flex justify-center items-center gap-4 mb-4">
            <button class="text-lg bg-red-500 p-3 font-mono rounded-lg">Clear</button>
            <button class="text-lg bg-green-500 p-3 font-mono rounded-lg">Check</button>
            <button class="text-lg bg-blue-500 p-3 font-mono rounded-lg">New Game</button>
        </div>
    </div>
  </div>
  <!-- Kong End -->
  <!-- Wave Start -->
  <!-- Wave End -->
  <!-- Boom Start -->
  <div
    class="flex flex-col justify-end items-center w-screen h-screen p-5"
    style="
      background-image: url(/src/assets/backgroung.png);
      background-size: cover;
      background-position: center center;
    "
  >
    <!-- SVG -->
    <svg id="svg">
    </svg>

    <!-- star -->
    <div id="map" class="flex flex-col items-center z-10">
      <img class="w-[8%] ml-[120px]" src="/icons/dimond.png" />
      <img class="w-[20%] ml-[-300px]" src="/icons/star.png" />
      <img class="w-[20%] ml-[100px]" src="/icons/star.png" />
      <img class="w-[20%] ml-[-500px]" src="/icons/star.png" />
      <img class="w-[20%] ml-[-250px]" src="/icons/star.png" />
      <img class="w-[20%] ml-[160px]" src="/icons/star.png" />
      <img class="w-[20%] ml-[-150px]" src="/icons/star.png" />
      <img class="w-[20%] ml-[140px]" src="/icons/star.png" />
    </div>

  </div>

  <!-- Background and FirstStar -->
  <!-- <div>
    <div
      class="flex flex-col justify-end items-center w-screen h-screen p-5"
      style="
        background-image: url(/src/assets/backgroung.png);
        background-size: cover;
        background-position: center center;
      "
    >
      <!-- starTwo -->
  <!-- <div class="w-[15%] ml-[-350px]">
        <img class="" src="/icons/star.png" />
      </div>
      <!-- starStart -->
  <!-- <img class="w-[15%]" src="/icons/star.png" />
    </div>
  </div>  -->
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
/* Wave End */
/* Boom Start */
#svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Boom End */
/* Chica Start */
/* Chica End */
/* Tonpee Start */
/* Tonpee End */
</style>
