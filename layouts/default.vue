<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-orange text-white" height-hint="98">
      <q-toolbar class="row" style="height: 70px">
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          class="lt-md"
        />
        <q-toolbar-title class="row items-center">
          <NuxtLink to="/">
            <img src="/public/images/lg-na-siipi.svg" style="height: 40px" />
          </NuxtLink>
          <!--  gt-sm -->
          <q-tabs align="left" class="q-ml-lg gt-sm">
            <q-route-tab
              v-for="item in menuList"
              :key="item.label"
              :to="item.to"
              :label="item.label"
            />
          </q-tabs>
        </q-toolbar-title>
        <q-btn
          outline
          label="Unirme"
          class="text-white q-px-md bg-orange-5"
          style="border: 1px solid white"
          rounded
          no-caps
          to="/home/register"
        />
        <q-btn
          outline
          label="Ingresar"
          class="text-white q-ml-md q-px-md bg-orange-5"
          style="border: 1px solid white"
          rounded
          no-caps
          to="/home/login"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-2">
      <q-list padding>
        <q-item v-for="item in menuList" :key="item.label" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-scroll-area style="height: calc(100vh - 70px)">
        <div class="q-pa-md">
          <slot />
        </div>
      </q-scroll-area>
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white" style="height: 300px">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import menuData from '../public/allData.json';
const leftDrawerOpen = ref(false);

const menuList = ref(menuData.menuList);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
