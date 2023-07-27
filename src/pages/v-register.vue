<template>
  <q-page>
    <div class="text-center text-white text-h2 q-pt-xl">Регистрация нового пользователя</div>
    <div class="q-pa-md absolute-center " style="max-width: 400px">
      <q-form
          @submit="onSubmit"
          @reset="reset"
          class="q-gutter-md"
      >
        <q-input
            filled
            dark.
            type="email"
            v-model="email"
            label="Введите ваш email"
            hint="example@mail.ru"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
            filled
            type="password"
            dark
            v-model="password"
            label="Ваш пароль"
            lazy-rules
        />
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped>

</style>
<script setup>
/*
* -------------Import--------
*/
import {useRouter} from "vue-router";
import {ref} from "vue";
import {api2} from "boot/axios";
import {getCoin} from "stores/coin";


const router = useRouter()
const email = ref('')
const password = ref('')
const store = getCoin()


/*
* -------------register--------
*/
const onSubmit = async () => {

  api2.post('http://localhost:3000/user/create', {
    first_name: "Ivan",
    last_name: "Petrov",
    email: email.value,
    password: password.value
  })
      .then((res) => {
        reset()
        alert('Успешно зарегестрировались')
        console.log(res)
        router.push('/');
      }).catch((err) => {
    console.log(err)
  })


}


const reset = () => {
  email.value = ''
  password.value = ''
}

</script>
