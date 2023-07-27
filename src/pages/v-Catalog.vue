<template>
  <q-page class="q-pa-xl">
    <div class="text-center text-white text-h2">Купить валюту</div>
    <div class="sortedBox row flex col reverse q-mt-md">
      <div class="q-gutter-y-md column bg-black flex items-center q-pl-md rounded-borders">
        <q-select
            filled
            color="purple-12"
            v-model="model"
            :options="option"
            dark
            :select="sortBycoin(model)"
            class="flex-center flex justify-end"
        />
      </div>
      <div class="sortdedByDesk">
        <q-select
            filled
            color="purple-12"
            dark
            v-model="sortedCoin"
            :options="sortParams"
            :select="selectSort(sortedCoin)"
            label="Сортирвать по цене"
            class="q-pl-md"
        />
      </div>
      <div class="input" style="max-width: 25%">
        <q-input
            clearable
            dark
            filled
            outlined
            label="Поиск"
            v-model="inputSearch"
            type="search"
        />
      </div>
    </div>

    <div class="catalog_wrapper row q-pt-xl flex justify-center wrap">
      <q-card
          class="my-card row col-xl-3 col-sm-12 col-md-6 col-xs-12 q-pa-sm q-ma-lg flex wrap"
          v-for="res of searchHandler"
          :key="res.name">

        <q-card-section class="col-12 q-pa-none bg-dark row flex justify-center ">
          <q-img
              :src="res.image"
              width="40%"
              class="q-pl-xl bg-dark card_img"
          />
          <q-card-actions class="justify-around">
            <q-card-section>
              <div class="text-h6 text-white flex wrap">{{ res.name }}</div>
              <div class="text-h5 text-white">${{ res.price }}</div>
            </q-card-section>
          </q-card-actions>

          <q-card-section
              class="self-center col flex justify-end column">
            <q-btn
                class="bg-green-2 q-pl-xl-xl "
                @click="addToBasket(res,index)">Купить
            </q-btn>
            <q-btn
                class="bg-green-2 q-pl-xl-xl q-mt-md row"
                @click="dialogDesc(res)">Подробнее
            </q-btn>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img
            :src='dialogData.image'/>

        <q-card-section>
          <div class="row wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ dialogData.name }}
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey">
            {{ dialogData.description }}
          </div>
        </q-card-section>
        <q-separator/>


        <q-card-actions align="right">
          <q-btn v-close-popup flat color="red" label="Закрыть"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import {getCoin} from "stores/coin";
import {computed, ref} from "vue";
import IdTokenVerifier from 'idtoken-verifier';

/*
* POP-UP
*/
const card = ref(false)
const dialogData = ref('')
const dialogDesc = (res) => {
  dialogData.value = res
  card.value = !card.value
}


/*
-------------------GET_COIN_FROM_DB
*/
const store = getCoin()
let token = store.Token
store.GET_COIN_FROM_DB(token)
const coin = store.SET_COIN_FROM_DB

/*
--------------------Add to basket
*/
const addToBasket = (res, index) => {
  const bsk = {...res}
  store.GET_BASKET(bsk, res)
}

/*
--------------------filterCOIN
*/

const option = [
  {
    label: "Криптовалюта",
    value: "Криптовалюта"
  },

  {
    label: "Валюта",
    value: "Валюта"
  },
  {
    label: "Все Валюты",
    value: "Все Валюты"
  },
];

//sort by genre
const model = ref("Все валюты");
const sortcoin = ref([]);
const sortBycoin = (model) => {
  sortcoin.value.length = 0
  coin.value.map((elem) => {
    if (elem.stock === model.value) {
      sortcoin.value.push(elem)
    } else {
      return
    }
  })
}

const filteredCoin = computed(() => {
  if (sortcoin.value.length) {
    return sortcoin.value
  } else {
    return coin.value
  }
})

/*
search COIN
*/
const inputSearch = ref('')
const searchHandler = computed(() => {
  return filteredCoin.value.filter((elem) => {
    return elem.name.toLowerCase().includes(inputSearch.value.toLowerCase())
  })
})

/*
filteredCoin
*/
const sortedCoin = ref('По цене')
const sortByAsc = (d1, d2) => {
  return (d1.price > d2.price) ? 1 : -1;
}
const sortByDesk = (d1, d2) => {
  return (d1.price < d2.price) ? 1 : -1;
}
const selectSort = (option) => {
  switch (option.value) {
    case 'По возрастанию' :
      return searchHandler.value.sort(sortByAsc);
    case 'По убыванию' :
      return searchHandler.value.sort(sortByDesk);
  }
}

const sortParams = [
  {
    label: "По возрастанию",
    value: "По возрастанию"
  },
  {
    label: "По убыванию",
    value: "По убыванию"
  }
]

</script>
<style>
.card_img {
  border-radius: 100%;
}
</style>


