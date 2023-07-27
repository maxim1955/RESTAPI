<template>
    <q-page>
        <h2 class="text-h2 text-white text-center" v-if="cart.length">Корзина товаров</h2>
        <h2 class="text-h2 text-white text-center" v-if="!cart.length">Корзина пуста</h2>
        <q-card
                class="my-card row col-xl-3 col-sm-12 col-md-6 col-xs-12 q-pa-sm q-ma-lg flex wrap"
                v-for="res of cart"
                :key="res.price">
            <q-card-section class="col-12 q-pa-none bg-dark row flex justify-center ">
                <q-img
                        :src="res.image"
                        width="40%"
                        class="q-pl-xl bg-dark card_img"
                />
                <q-card-actions class="justify-around">
                    <q-card-section>
                        <div class="text-h6 text-white">{{ res.name }}</div>
                        <div class="text-h5 text-white">Цена: {{ res.price }}</div>
                        <div class="text-h5 text-white">Количество: {{ res.quantity }}</div>
                    </q-card-section>
                </q-card-actions>

                <q-card-section
                        class="self-center col flex justify-end">
                </q-card-section>
                <q-card-section
                        class="self-center col flex justify-end">
                    <q-btn
                            class="bg-green-2 q-pl-xl-xl"
                            @click="deleteCoin(res)">Удалить
                    </q-btn>
                </q-card-section>
            </q-card-section>
        </q-card>
        <q-card class="bg-black text-center" v-if="store.basket.length">
            <div class="text-white text-h2">
                Общая сумма:$ {{ store.totalValue }}
            </div>
        </q-card>

        <div class="form_telegram flex justify-center " style="max-width: 300px; margin: 0 auto"
             v-if="store.basket.length">
            <div class="text-center text-white text-h2">Отправить заказ</div>
            <q-form
                    @submit.stop="submit"
                    class="q-gutter-md"
                    method="post"
            >
                <q-input
                        required
                        filled
                        dark
                        v-model="formName"
                        label="Your name *"
                        hint="Name and surname"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                        required
                        dark
                        filled
                        type="text"
                        v-model="formEmail"
                        label="Email"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-toggle v-model="accept" label="Политика конфиденциальности" color="white"/>
                <div>
                    <q-btn label="Submit" type="submit" color="primary" @click="submit"/>
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script setup>
import {getCoin} from "stores/coin";
import {ref} from "vue";
import {api} from "boot/axios";

const store = getCoin()
const cart = store.basket

const deleteCoin = (res) => {
    store.DELETE_FROM_BASKET(res)
}

/*
dataForm
*/
const formName = ref("")
const formEmail = ref("")
const accept = ref(false)
const token = "6155411202:AAE3jfX9yUKeoOywW1CJFNPlEjy2jAcHgow"
const chatId = -979007796
/*send form to TG*/
const submit = () => {
    const fullMessage =
        `Имя Пользователя: ${formName.value}
         Email: ${formEmail.value}
         Сумма заказа: ${store.totalValue}
    `

    api.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${fullMessage}`)
        .then(() => {
            formName.value = ''
            formEmail.value = ''
            alert('Ваше сообщение отправлено в телеграмм')
        })
        .catch((error) => {
            console.log(error)
        })
    formName.value = ""
    formEmail.value = ""
    console.log(fullMessage)
};
</script>

