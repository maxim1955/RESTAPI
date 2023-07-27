<template>
  <q-page>
    <div class="text-white text-center text-h3 ">Добро пожаловать</div>
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

          <div class="text-white">
              Нет аккаунта? Зарегестрироваться
              <q-tabs>
              <q-route-tab
                      icon="mail"
                      to="/register"
                      exact
                      dark
              />
          </q-tabs>
          </div>
      </q-form>
    </div>
  </q-page>
</template>


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

  api2.post('http://localhost:3000/login', {
    email: email.value,
    password: password.value
  })
      .then((res) => {
        if (res.data !== 'Username or password incorrect') {
          localStorage.setItem("token", res.data.accessToken)
          alert(localStorage.getItem('token'))
          router.push('/catalog')
        } else {
          alert('пароль или email неверный')
        }
      }).catch((err) => {
    console.log(err)
    throw err
    alert(err)
  })


}


const reset = () => {
  email.value = ''
  password.value = ''
}

</script>



