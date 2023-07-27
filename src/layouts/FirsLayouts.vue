<template>
  <q-layout view="hhh lpR fff">
    <div class="">
      <q-img
        src='~assets/image_registe.png'
        alt="logo"
        class="absolute-center"
        width="100%"
        height="100%"
        fit="fill"
        spinner-color="red"
      />
      <q-page-container class="bg-black">
        <router-view/>
      </q-page-container>
    </div>


  </q-layout>
</template>

<script setup>

</script>

