<template>
  <div class="q-pa-md" v-if="roles">
    <q-table
        flat bordered
        title="Список Пользователей"
        :rows="userRows"
        :columns="userColumns"
        row-key="id"
        binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props" @click="updateUser(props.row)">
            {{ props.row.id }}
          </q-td>

          <q-td key="first_name" :props="props" @click="updateUser(props.row)">
            {{ props.row.first_name }}
            <q-popup-edit v-model="props.row.first_name" title="Обновить имя" buttons v-slot="scope">
              <q-input type="text" v-model="scope.value" dense autofocus/>
            </q-popup-edit>
          </q-td>
          <q-td key="last_name" :props="props" @click="updateUser(props.row)">
            <div class="text-pre-wrap">{{ props.row.last_name }}</div>
            <q-popup-edit v-model="props.row.last_name" v-slot="scope" buttons>
              <q-input type="text" v-model="scope.value" dense autofocus/>
            </q-popup-edit>
          </q-td>
          <q-td key="roles_id" :props="props" @click="updateUser(props.row)">
            {{ props.row.roles_id }}
            <q-popup-edit v-model="props.row.roles_id" title="Добавить права администратора" buttons
                          persistent
                          v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close"/>
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props" @click="updateUser(props.row)">{{ props.row.email }}
            <q-popup-edit v-model="props.row.email" title="Update carbs" buttons persistent
                          v-slot="scope">
              <q-input type="text" v-model="scope.value" dense autofocus hint="Use buttons to close"/>
            </q-popup-edit>
          </q-td>
          <q-td key="password" :props="props" @click="updateUser(props.row)">{{ props.row.password }}</q-td>
          <q-td key="email" :props="props">
            <q-btn @click="deleteUser(props.row)">
              удалить пользователя
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>


  <div class="q-pa-md" v-if="roles">
    <q-table
        title="Спиоск всех карточек товаров"
        :rows="catalogRows"
        :columns="catalogColumns"
        row-key="name"
    />
    <v-create-new-user/>
  </div>
</template>


<script setup>

import {api2} from "boot/axios";
import {ref} from "vue";
import VCreateNewUser from "components/v-createNewUser.vue";
import IdTokenVerifier from "idtoken-verifier";
import {useQuasar} from 'quasar'

const verifier = new IdTokenVerifier({
  issuer: 'https://my.auth0.com/',
  audience: 'gYSNlU4YC4V1YPdqq8zPQcup6rJw1Mbt'
});
const $q = useQuasar()
const updateUser = (user) => {
  api2.put('http://localhost:3000/user/update', {
    'id': user.id,
    'first_name': user.first_name,
    'last_name': user.last_name,
    'roles_id': Number(user.roles_id),
    'email': user.email,
  })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

}
const token = localStorage.getItem('token')
const payload = verifier.decode(token).payload
const roles = payload.roles
const userColumns = [
  {name: 'id', align: 'center', label: 'Уникальный идентификатор', sortable: true, field: "id"},
  {name: 'first_name', label: 'Имя', field: 'first_name', sortable: true},
  {name: 'last_name', label: 'Фамилия', field: 'last_name'},
  {name: 'roles_id', label: 'Роль', field: 'roles_id'},
  {name: 'email', label: 'e-mail', field: 'email'},
  {name: 'password', label: 'пароль', field: 'password'},
  {name: 'Действия', label: "Действия", field: "action"}
]

const userRows = []
const getUser = async () => {
  const accessToken = localStorage.getItem('token')
  await api2.get('http://localhost:3000/admin-panel/admin', {
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
      .then((response) => {
        response.data.map((elem) => {
          userRows.push(elem)
          return elem
        })
      }).catch((err) => {
        console.log(err)
      })
}
getUser()

const catalogColumns = [
  {name: 'id', label: 'Уникальный идентификатор', field: 'id', align: 'left', sortable: true},
  {name: 'name', align: 'center', label: 'Название', sortable: true, field: "name"},
  {name: 'price', label: 'Цена', field: 'price', sortable: true},
  {name: 'marketcup', label: 'текущая цена', field: 'marketcup'},
  {name: 'action', label: 'текущая цена', field: 'marketcup'},
]
let catalogRows = ref([])
const accessToken = localStorage.getItem('token')
const getCatalog = async () => {
  await api2.get('http://localhost:3000/admin-panel/admins', {
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
      .then((response) => {
        catalogRows.value = response.data
      })
}
getCatalog()
const deleteUser = (user) => {

  $q.dialog({
    title: 'Подтвердить удаление??',
    message: `Вы точно хотите удлить пользовател сс именем ${user.first_name}`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    api2.delete('http://localhost:3000/user/delete', {
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        roles_id: Number(user.roles_id),
        email: user.email,
      }
    }).then((res) => {
      console.log(res.data)
      $q.dialog({
        dark: true,
        title: 'Успешно',
        message: `пользователь ${user.first_name} успешно удален `
      })
    }).catch((err) => {
      console.log(err)
    })
  })
}


</script>
