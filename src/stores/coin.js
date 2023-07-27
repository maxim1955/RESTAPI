import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import {api2} from "boot/axios";


export const getCoin = defineStore("coin", {

    state: () => ({
        coin: ref([]),
        basket: ref([]),
        totalValue: 0,
        Token: ''
    }),
    getters: {
        SET_COIN_FROM_DB(state) {
            return computed(() => state.coin)
        },

        SET_BASKET(state) {
            return computed(() => state.basket)
        }
    },
    actions: {
        GET_COIN_FROM_DB() {
            let token = localStorage.getItem('token')
            api2.get("http://localhost:3000/catalog", {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
                .then((result) => {
                    this.coin = result.data
                })
        },
        /*
        get basket
        */
        GET_BASKET(bsk) {
            if (this.basket.length) {
                this.basket.map((i) => {
                    if (i.name === bsk.name) {
                        i.quantity++;
                        this.totalValue += i.price
                    }
                });
            } else {
                this.totalValue += bsk.price
                bsk.quantity = 1
                this.basket.push(bsk);
            }
        },
        DELETE_FROM_BASKET(bsk) {
            const coinIndex = this.basket.findIndex((item) => item === bsk);
            if (bsk.quantity) {
                this.totalValue -= bsk.price
                bsk.quantity--
            } else {
                this.totalValue -= bsk.price
                this.basket.splice(coinIndex, 1)
            }
        }
    }
})
