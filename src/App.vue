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
/* Wave End */
/* Boom Start */
/* Boom End */
/* Chica Start */
/* Chica End */
/* Tonpee Start */
/* Tonpee End */
</style>
