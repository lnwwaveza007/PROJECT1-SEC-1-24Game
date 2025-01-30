<script setup>
//Kong Start
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
