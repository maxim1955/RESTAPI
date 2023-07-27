<template>
  <q-layout view="hhh lpR fff">
    <q-header class="bg-black text-white flex " height-hint="98" style="height: 100px">
      <q-toolbar class="row flex justify-between">
        <q-toolbar-title shrink>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" v-if="screenSize"/>
          <router-link to="/main" class="text-center text-white text-italic text-h1">LegendMarket</router-link>
        </q-toolbar-title>
        <div class="q-pa-sm" v-if="!screenSize">
          <div>
            <q-tabs>
              <q-route-tab to="/main" label="Главная" class="text-white " icon="mail"/>
              <q-route-tab to="/basket" label="Корзина" class="text-white " icon="mail"/>
              <q-route-tab to="/catalog" label="Каталог" class="text-white" icon="mail"/>
              <q-route-tab to="/admin-panel" label="Админ-панель" class="text-white" icon="mail"/>
              <q-route-tab to="/about" label="О нас" class="text-white" icon="book"/>
              <q-route-tab to="/admin-chat" label="Чат с админом" class="text-white" icon="book"/>
              <q-btn @click="signOut()">Выйти</q-btn>
              <q-item>
                {{ userInfo.name}}
                {{ userInfo.last_name}}
              </q-item>
            </q-tabs>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawerLeft"
        :width="200"
        :breakpoint="600"
        class="bg-black"
        show-if-above
        v-if="screenSize"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple to="/main" class="text-white">
            <q-item-section avatar>
              <q-icon name="inbox" color="white"/>
            </q-item-section>

            <q-item-section class="text-white">
              Главная
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/basket" class="text-white">
            <q-item-section avatar>
              <q-icon name="delete"/>
            </q-item-section>

            <q-item-section>
              Корзина
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/about" class="text-white">
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>

            <q-item-section>
              О нас
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/catalog" class="text-white">
            <q-item-section avatar>
              <q-icon name="drafts"/>
            </q-item-section>

            <q-item-section>
              каталог
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold text-white">{{ userInfo.name}}</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container class="bg-black">
      <router-view/>
    </q-page-container>
    <q-footer elevated class="bg-black text-white main">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
import IdTokenVerifier from 'idtoken-verifier';

const verifier = new IdTokenVerifier({
  issuer: 'https://my.auth0.com/',
  audience: 'gYSNlU4YC4V1YPdqq8zPQcup6rJw1Mbt'
});
const userInfo = ref({})
const getInfoUser = () => {
  const token = localStorage.getItem('token')
  const payload = verifier.decode(token).payload
  userInfo.value = payload
}
getInfoUser()


const router = useRouter()

const signOut = () => {
  localStorage.removeItem('token')
  router.push('/')
}
const drawerLeft = ref(false)

/*
-------------SCREEN SIZE---------------
*/
let screenSize = false


const resizeScreen = () => {
  console.log(screenSize)
  screenSize = window.innerWidth <= 800
}
window.addEventListener('resize', resizeScreen)
resizeScreen()
</script>
<style>
.header_title {
  font-family: Roboto;
  font-weight: bold;
  padding-bottom: 15px;
}

.main {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
