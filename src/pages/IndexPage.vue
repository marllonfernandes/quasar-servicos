<template>
  <q-page >
    
    <div class="q-pa-md q-gutter-sm">
      <div class="text-h5" style="color: #0C9ACD">Serviços gerenciados pelo PM2</div>
    </div>

    <div class="q-pa-md row items-start q-gutter-sm">
      <q-card class="my-card" v-for="row in rows" :key="row._id">
        <q-card-section>
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>name</q-item-label>
                <q-item-label>{{ row.name }}</q-item-label>
              </q-item-section>
            </q-item>
      
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>pid</q-item-label>
                <q-item-label>{{ row.pid }}</q-item-label>
              </q-item-section>
            </q-item>
      
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>uptime</q-item-label>
                <q-item-label>{{ humanizeDuration(row.pm2_env.pm_uptime,{ units: ["d", "h"], round: true }) }}</q-item-label>
              </q-item-section>
            </q-item>
            
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>memory</q-item-label>
                <q-item-label>{{ row.monit.memory }}</q-item-label>
              </q-item-section>
            </q-item>
            
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>cpu</q-item-label>
                <q-item-label>{{ row.monit.cpu }}</q-item-label>
              </q-item-section>
            </q-item>
            
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>status</q-item-label>
                <q-item-label>
                  <q-badge :color="getColorStatus(row)">
                    {{ row.pm2_env.status }}
                  </q-badge>
                </q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
          
        </q-card-section>
  
        <q-separator />
  
        <q-card-actions align="right">
          <q-btn-group outline>
            <q-btn size="sm" icon-right="restart_alt" rounded  color="secondary" @click="actionItem('restart', row.name)" >
              Restart
            </q-btn>
            <q-btn size="sm" icon-right="stop" rounded  color="red" @click="actionItem('stop', row.name)" >
              Stop
            </q-btn>
          </q-btn-group>
        </q-card-actions>
      </q-card>
      
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import pm2Service from '../services/Pm2'
import humanizeDuration from "humanize-duration";
export default defineComponent({
  name: 'IndexPage',
  setup() {
    const rows = ref([])
    const { getPm2, actionPm2 } = pm2Service()

    onMounted(() => {
      getItems()
    })

    const getItems = async () => {
      try {
        rows.value = await getPm2()
      } catch (error) {
        console.log(error.message)
      }
    }
    
    const actionItem = async (action, name) => {
      try {
        await actionPm2(action, name)
        await getItems()
      } catch (error) {
        console.log(error.message)
      }
    }

    return{
      rows,
      humanizeDuration,
      actionItem,
      getColorStatus(row) {
        if (row.pm2_env.status === 'online') {
          return 'green'
        } else {
          return 'red'
        }
      },
    }
  }
})
</script>
