<template>
  <q-list style="background-color: white;">
    <q-item-label header>
      <q-btn unelevated color="secondary" size="md" label="Adicionar"
        :to="{ name: 'formProxy' }" />
    </q-item-label>

    <q-item v-for="row in rows" :key="row._id" clickable @click.native="editProxy(row)">
      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn size="12px" flat dense round icon="account_tree" />
        </div>
      </q-item-section>
      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium" style="color: #0C9ACD">{{ row.name }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          {{ row.backend }}
        </q-item-label>
        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary">
          <q-item-section avatar top>
            <q-badge :color="getColorStatus(row)">
              {{ row.active ? "enabled" : "desabled" }}
            </q-badge>
          </q-item-section>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import proxiesService from '../services/ProxyRoutes'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ProxyPage',
  setup() {
    const loading = ref(false)
    const rows = ref([])
    const router = useRouter()
    const { getProxy } = proxiesService()

    onMounted(() => {
      getItems()
    })

    const getItems = async () => {
      try {
        rows.value = await getProxy('')
      } catch (error) {
        console.log(error.message)
      }
    }

    return {
      rows,
      loading,
      getItems,
      getColorStatus(row) {
        if (row.active) {
          return 'green'
        } else {
          return 'red'
        }
      },
      editProxy(row) {
        router.push({ name: 'formProxy', params: { name: row.name } })
      }
    }
  }
})
</script>
