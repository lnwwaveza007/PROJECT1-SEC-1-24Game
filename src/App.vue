<script setup>
//Kong Start
//Kong End

//Wave Start
//Wave End

//Boom Start
import { ref } from "vue";
import { lineCreate } from "./utils/lineCreate";

setTimeout(() => {
  const stars = document.getElementById("map").querySelectorAll("img");
  for (let i = 0; i < stars.length - 1; i++) {
    lineCreate(stars[i], stars[i + 1]);
  }
}, 1000);

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
  <!-- Kong Start -->
  <!-- Kong End -->
  <!-- Boom Start -->
  <div
    class="flex flex-col justify-end items-center w-screen h-screen p-5"
    style="
      background-image: url(/src/assets/backgroung.png);
      background-size: cover;
      background-position: center center;
    "
  >
    <svg id="svg"></svg>
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
</style>
