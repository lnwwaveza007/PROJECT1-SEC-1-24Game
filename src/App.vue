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

const selectNumber = (index) => {
  if (selectedNumbers.value.includes(index)) {
    message.value = 'You already selected this number.';
    return;
  }
  selectedNumbers.value.push(index);
  equation.value += numbers.value[index];
};
 

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

      <!-- Display Random Numbers -->
      <div class="flex justify-center gap-4 mb-4">
        <button
          v-for="(num, index) in numbers"
          :key="index"
          class="px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
          :class="{ 'bg-green-500': selectedNumbers.includes(index) }"
          @click="selectNumber(index)"
        >
          {{ num }}
        </button>
      </div>

      <!-- Display Equation -->
      <div class="text-center text-xl font-mono mb-4">
        <p>
          Equation: <span class="text-gray-500">{{ equation }}</span>
        </p>
      </div>

      <!-- Operator Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-4">
        <button @click="addOperator('+')" class="btn">+</button>
        <button @click="addOperator('-')" class="btn">-</button>
        <button @click="addOperator('*')" class="btn">×</button>
        <button @click="addOperator('/')" class="btn">÷</button>
        <button @click="addParenthesis('(')" class="btn">(</button>
        <button @click="addParenthesis(')')" class="btn">)</button>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-4">
        <button
          @click="clear"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Clear
        </button>
        <button
          @click="checkResult"
          class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Check
        </button>
        <button
          @click="newGame"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          New Game
        </button>
      </div>

      <!-- Feedback Message -->
      <div class="text-center mt-4 text-lg font-semibold">
        <p :class="message.includes('Correct') ? 'text-green-600' : 'text-red-600'">
          {{ message }}
        </p>
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


    <!-- star -->
    <div class="flex flex-col items-center">
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
/* Boom End */
/* Chica Start */
/* Chica End */
/* Tonpee Start */
/* Tonpee End */
</style>
