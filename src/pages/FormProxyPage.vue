<template>
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md" style="background-color: white;">

      <div class="col-lg-06 col-xs-12 q-pt-sm q-gutter-sm">
        <q-input
          ref="nameRef" 
          outlined 
          dense 
          v-model="form.name" 
          label="Nome"
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          ref="backendRef"
          outlined 
          dense 
          v-model="form.backend" 
          label="URI do backend"
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="col-lg-2 col-xs-12" >
        <q-checkbox v-model="form.active" label="Ativa" style="color: #0C9ACD" text-color="white" color="cyan" />
      </div>
      <div class="col-lg-4 col-xs-12">
        <q-checkbox v-model="form.enable_auth" label="Autenticação backend" style="color: #0C9ACD" text-color="white" color="cyan" />
      </div>
      <div class="col-lg-12 col-xs-12">
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            label="Request settings"
            caption="Saiba mais: https://axios-http.com/ptbr/docs/intro"
          >
            <q-card>
              <q-card-section>
                <q-input v-model="form.auth_object" outlined type="textarea">
                  <template v-slot:hint>
                    Field hint
                  </template>
                </q-input>
              </q-card-section>
            </q-card>
          </q-expansion-item>
    
        </q-list>
        <!-- <q-card class="my-card" flat bordered>
          <q-card-actions>
            <q-btn flat style="background: white; color: #0C9ACD" label="Payload" />
            <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                <q-input v-model="form.auth_object" outlined type="textarea">
                  <template v-slot:hint>
                    Field hint
                  </template>
                </q-input>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card> -->
      </div>
      <div class="col-lg-12 col-xs-12 q-pt-sm q-gutter-sm">
        <!-- <q-btn-group push class="float-right"> -->
          <q-btn size="md"  unelevated  label="Confirmar" color="secondary" class="float-right" type="submit" />
          <q-btn size="md"  unelevated  label="Fechar"  style="background: white; color: #0C9ACD" class="float-right" :to="{ name: 'proxy' }" />
          <q-btn size="md"  label="Deletar" outline  color="negative" class="float-right" v-if="form._id" @click="removeRow(form)" />
        <!-- </q-btn-group> -->
      </div>
    </form>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import proxiesService from '../services/ProxyRoutes'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'FormProxy',
  setup() {
    const form = ref({ _id: null, name: '', backend: '', active: true, enable_auth: false, auth_object: `{
            "method": "",
            "url": "",
            "headers": {},
            "data": {}
            }`
    })
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const { postProxy, getProxy, putProxy, delProxy } = proxiesService()
    const nameRef = ref(null)
    const backendRef = ref(null)

    onMounted(async() => {
      if (route.params.name) {
        const dataProxy = await getProxy(route.params.name)
        form.value = { ...dataProxy[0], auth_object: JSON.stringify(dataProxy[0].auth_object) }
      }
    })

    const saveProxy = async() => {
      try {
          if (form.value._id) {
            await putProxy(form.value._id, form.value)
          }else {
            await postProxy(form.value)
          }
          $q.notify({ message: `Proxy ${form.value._id ? 'alterado' : 'cadastrado'} com sucesso!`, icon: 'check', color: 'positive' })
          router.push({ name: 'proxy' })
        } catch (error) {
          $q.notify({ message: error.message, icon: 'times', color: 'negative' })
        }
    }

    const removeRow = async(row) => {
        try {
          $q.dialog({
            title: 'Remover',
            message: `Deseja excluir o registro ${row.name}?`,
            cancel: true,
            persistent: true
          }).onOk(async () => {
            await delProxy(row._id)
            $q.notify({ message: 'Registro excluido com sucesso!', icon: 'check', color: 'positive' })
            router.push({ name: 'proxy' })
          })
        } catch (error) {
          $q.notify({ message: error.message, icon: 'times', color: 'negative' })
        }
      }

    const onSubmit = () => {
      
      nameRef.value.validate()
      backendRef.value.validate()

      if (!nameRef.value.hasError && !backendRef.value.hasError) {
        saveProxy()
      }
    }

    return {
      form,
      expanded: ref(false),
      saveProxy,
      removeRow,
      onSubmit,
      nameRef,
      backendRef
      
    }
  }
})
</script>