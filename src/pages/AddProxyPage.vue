<template>
    <q-page padding>
        <q-form 
            @submit="onSubmit"
            @reset="onReset"
            class="row q-col-gutter-lg-md"
        >
        <q-input 
            outlined
            dense
            v-model="form.name"
            label="Nome"
            lazy-rules
            class="col-lg-6 col-xs-12"
            :rules="[ val => val && val.lenght > 0 || 'Campo obrigatório' ]"
        />
        <q-input 
            outlined
            dense
            v-model="form.backend"
            label="URI do backend"
            lazy-rules
            class="col-lg-6 col-xs-12"
            :rules="[ val => val && val.lenght > 0 || 'Campo obrigatório' ]"
        />
        <div class="col-lg-2 col-xs-12">
            <q-checkbox v-model="active" label="Ativa" />
        </div>
        <div class="col-lg-4 col-xs-12">
            <q-checkbox v-model="back_auth" label="Autenticação backend" />
        </div >
        <div class="col-lg-12 col-xs-12">
            <q-card class="my-card" flat bordered>
              <q-card-actions>
                <q-btn flat color="primary" label="Payload" />
                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expanded = !expanded"
                />
              </q-card-actions>
        
              <q-slide-transition>
                <div v-show="expanded">
                  <q-separator />
                  <q-card-section class="text-subitle2">
                    <q-input
                        v-model="text"
                        outlined
                        type="textarea"
                        
                    >
                    <template v-slot:hint>
                        Field hint
                    </template>
                    </q-input>
                  </q-card-section>
                </div>
              </q-slide-transition>
            </q-card>
          </div>
            
        </q-form>
    </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'AddProxy',
    setup () {
        const form = ref({})
        return {
            form,
            text: ref(`{
            "method": "",
            "url": "",
            "headers": {},
            "data": {}
            }`),
            active: ref(true),
            back_auth: ref(false),
            expanded: ref(false)
        }
    }
})
</script>