<template>
  <q-page class="flex flex-center bg-white">
    <div class="q-pa-md row justify-center column">
      <div class="text-h3 text-black text-center">Чат</div>
      <div class="row">
        <fieldset v-if="checkroles">
          <legend>Выбрать комнату</legend>
          <div v-for="items of rooms" class="room-list-items">
            <p :style="items.id === rooms_id ? 'text-decoration: underline' : ''"
               class="cursor-pointer" @click="$event = joinRoom(items)">
              {{ items.name }}
            </p>
          </div>
        </fieldset>
        <div style="width: 100%; max-width: 400px;" v-for="items of msg">
          <q-chat-message
              :name="items.name"
              :sent="name === items.name"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              bg-color="amber-7"
              :text="[items.body]"
          />
        </div>
      </div>

      <div class="flex flex-center">
        <div class="">
          <input type="text" v-model="message" placeholder="Сообщение">
        </div>
        <button class="btn" @keypress.enter="send(message)" @click="send(message)">send</button>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import {io} from "socket.io-client";
import {onMounted, ref} from "vue";
import IdTokenVerifier from 'idtoken-verifier';

const verifier = new IdTokenVerifier({
  issuer: 'https://my.auth0.com/',
  audience: 'gYSNlU4YC4V1YPdqq8zPQcup6rJw1Mbt'
});

let checkroles = ref()
const userInfo = ref({})
const checkRoles = () => {
  if (userInfo.value.roles) {
    checkroles.value = true
    console.log(userInfo.value.roles)
  } else
    checkroles.value = false
  console.log(userInfo.value)
}

const getInfoUser = () => {
  const token = localStorage.getItem('token')
  const payload = verifier.decode(token).payload
  userInfo.value = payload
}
getInfoUser()
checkRoles()
const socket = io('http://localhost:3001');

const msg = ref([])
const message = ref('');
const name = userInfo.value.name;
const createRoom = ref('')

const rooms = ref([]);
let user_id
socket.on('getRoom_id', (id) => {
  console.log(id)
  user_id = id
})
const send = () => {
  socket.emit('msg', {
    user_id: userInfo.value.user_id,
    name: userInfo.value.name,
    body: message.value,
    room_id: user_id
  })
  message.value = ''
}
let rooms_id = null
const joinRoom = (item) => {
  socket.emit('leave_room', {
    item
  })
  socket.emit('join_room', {
    item
  })
}

socket.on('get-rooms', (data) => {
  rooms.value = data
})

onMounted(() => {
  socket.emit('getInfoUser', userInfo.value)
  socket.on('history', data => {
    msg.value = data
    console.log(msg)
  });
  socket.on('get-rooms', data => {
    console.log(data)
    rooms.value = data
  });
  socket.on('rooms-list-changed', (data) => {
    rooms.value.push(data)
  })
  socket.on('message', data => {
    msg.value.unshift(data)
  })
})


</script>
