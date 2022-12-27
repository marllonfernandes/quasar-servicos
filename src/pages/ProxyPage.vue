
<template>
  <!-- <div class="q-pa-md"> -->
  <div>
    <q-list bordered class="rounded-borders" >
      <q-item-label header>
        <q-btn style="background: #0C9ACD; color: white" icon="add" round :to="{ name: 'addProxy' }" />
      </q-item-label>
      
      <q-item v-for="row in rows" :key="row._id" clickable @click.native="removeRow(row)">
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn size="12px" flat dense round icon="account_tree" />
          </div>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium" style="color: #0C9ACD">{{row.name}}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            {{row.backend}}
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary">
            <q-item-section avatar top>
              <q-badge :color="getColor(row)">
                {{ row.active ? "enabled" : "desabled" }}
              </q-badge>
            </q-item-section>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import proxiesService from '../services/ProxyRoutes'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $q = useQuasar()
    const loading = ref(false)
    const rows = ref([])
    const { getProxy, delProxy } = proxiesService()

    onMounted(() => {
      getItems()
    })

    const getItems = async () => {
      try {
        rows.value = await getProxy()
      } catch (error) {
        console.log(error.message)
      }
    }

    return {
      rows,
      loading,
      getItems,

      async removeRow (row) {
        loading.value = true
        try {
          $q.dialog({
            title: 'Remover',
            message: `Deseja excluir o registro ${row.name}?`,
            cancel: true,
            persistent: true
          }).onOk(async () => {
            await delProxy(row._id)
            getItems()
            $q.notify({ message: 'Registro excluido com sucesso!', icon: 'check', color: 'positive' })
          })
        } catch (error) {
          $q.notify({ message: error.message, icon: 'times', color: 'negative' })
        }
        loading.value = false
      },
      getColor (row) {
        if (row.active) {
          return 'green'
        } else {
          return 'red'
        }
      }
    }
  }
})
</script>
