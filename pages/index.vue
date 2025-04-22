<template>
  <div class="row bg-yellow" style="height: calc(100vh - 70px)">
    <!-- este es el div de la izquierda -->
    <div class="row bg-white col-4 justify-center" style="height: 100%">
      <img
        src="/images/jugos.jpg"
        style="
          width: auto;
          height: 100%;
          object-fit: cover;
          object-position: center;
        "
      />
    </div>

    <!-- este es el div de la derecha -->
    <div class="column bg-blue col-8">
      <div class="bg-yellow" style="height: 250px; width: 100%">
        <q-img src="/images/paisaje.jpg" fit="fill" style="height: 250px" />
      </div>

      <!-- este es el div pedro -->
      <div
        class="row bg-orange justify-center"
        style="height: calc(100vh - 320px)"
      >
        <q-scroll-area style="height: calc(100vh - 320px); width: 70%">
          <div class="bg-primary col-8"></div>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
