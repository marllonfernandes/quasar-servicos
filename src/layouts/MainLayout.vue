<template>
  <!--
  Forked from:
  https://quasar.dev/layout/drawer#example--mini-to-overlay
-->
<div id="q-app" class="bg-grey-1">
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" >
      <q-header style="background: #0C9ACD; color: white">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
          <q-toolbar-title>Portal de Serviços</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay

        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding>
            <EssentialLink
              v-for="link in essentialLinks"
              :key="link.title"
              v-bind="link"
            />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container >
        <q-page >
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    route: { name: 'home' }
  },
  {
    title: 'Proxy',
    caption: '',
    icon: 'swap_horiz',
    route: { name: 'proxy' }
  }
]

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup () {
    return {
      essentialLinks: linksList,
      drawer: ref(false),
      miniState: ref(true)
    }
  }
})
</script>
