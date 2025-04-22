<template>
  <div
    class="row justify-center items-center col-12"
    style="height: calc(100vh - 102px)"
  >
    <div class="col-12 col-sm-8 col-md-5 col-lg-4">
      <q-card v-if="typeForm === 'register'">
        <q-card-section> aqui ira el formulario register </q-card-section>
      </q-card>
      <q-card v-if="typeForm === 'login'">
        <q-card-section> aqui ira el formulario login </q-card-section>
      </q-card>
      <q-card v-if="typeForm === 'forgot'">
        <q-card-section> aqui ira el formulario forgot </q-card-section>
      </q-card>
      <q-btn @click="$router.push('/logueo?form=login')"> login </q-btn>
      <q-btn @click="$router.push('/logueo?form=register')"> register </q-btn>
      <q-btn @click="$router.push('/logueo?form=forgot')"> forgot </q-btn>
      <q-input v-model="detector" />
    </div>
    {{ typeForm }}
  </div>
</template>

<script setup>
const route = useRoute();
const typeForm = ref(route.query.form || 'login');
const detector = ref('');

watch(
  () => route.query.form,
  (newValue) => {
    typeForm.value = newValue || 'login';
  },
);

watch(detector, (newValue) => {
  Notify.create({
    message: 'hola detecte cambio',
    color: 'primary',
  });
});
</script>

<style lang="scss" scoped></style>
