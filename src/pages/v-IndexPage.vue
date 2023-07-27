<template>
  <q-page class="flex flex-center">

    <q-img src="~assets/main_logo.svg" />
    <div class="text-white text-h2 absolute main-title" >
      <q-tabs
        inline-label>
        <q-route-tab to="/catalog" label="Перейти в каталог" class="text-red-1" icon="book"/>
      </q-tabs>

    </div>
  </q-page>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
<style>
.main-title{
  bottom: 10px;

}
</style>
