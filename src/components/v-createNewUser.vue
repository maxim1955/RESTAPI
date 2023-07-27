<template>
    <div class="q-pa-md">
        <q-btn label="Создать Пользователя" color="primary" @click="dialog = true"/>
        <q-dialog v-model="dialog" persistent>
            <q-card>
                <div class="q-pa-md text-white" style="max-width: 400px">
                    <q-form
                            @submit="onSubmit"
                            @reset="reset"
                            class="q-gutter-md"
                            dark
                    >

                        <q-input
                                filled
                                v-model="first_name"
                                label="Имя нового пользователя"
                                hint="Имя"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                                filled
                                v-model="last_name"
                                label="Фамилия нового пользователя"
                                hint="Фамилия"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                                filled
                                v-model="roles_id"
                                label="Роль пользователя"
                                hint="Оставить пустым"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                                filled
                                v-model="email"
                                label="email пользователя"
                                hint="email"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />

                        <q-input
                                v-model="password"
                                filled
                                :type="isPwd ? 'password' : 'text'"
                                hint="Password">
                            <template v-slot:append>
                                <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>
                        <div>
                            <q-btn label="Submit" type="submit" color="primary"/>
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
                        </div>
                    </q-form>
                </div>
                <q-card-actions align="right">
                    <q-btn flat label="Закрыть" color="primary" v-close-popup/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>


<script setup>
import {ref} from "vue";
import {api2} from "boot/axios";
import {ClosePopup} from "quasar";

const dialog = ref(false)
const isPwd = ref(true)
const first_name = ref('')
const last_name = ref("")
const roles_id = ref()
const email = ref('')
const password = ref('')


const onSubmit = async () => {

    api2.post('http://localhost:3000/user/create', {
        first_name: first_name.value,
        last_name: last_name.value,
        roles_id: roles_id.value,
        email: email.value,
        password: password.value
    })
        .then((res) => {
            reset()
            alert('Успешно зарегистрировались')
        }).catch((err) => {
        console.log(err)
    })


}
const reset = () => {
    first_name.value = ''
    last_name.value = ''
    roles_id.value = ''
    email.value = ''
    password.value = ''
}
</script>
<style scoped>

</style>
