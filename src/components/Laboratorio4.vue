<template>
  <v-form>
    <v-container align="center">
      <v-row text-align="center" justify="center">
       

        <v-col
          cols="12"
          sm="6"
          md="4"
          text-align="center"
        >

              <vuetify-number
                label="Ingrese su sueldo"
                outlined
                dense
                v-model=sueldo
                v-bind:options="options"
              ></vuetify-number>

              <vuetify-number
                label="Ingrese su ahorro"
                outlined
                dense
                v-model=ahorro
                v-bind:options="options"
              ></vuetify-number>

              <v-btn
                @click="get10porCiento"
              >
                Generar
              </v-btn>
        </v-col>
      </v-row>
    </v-container>
     <section v-if="errored">
        <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
      </section>

      <section v-else>
          <div v-if="loading">Cargando...</div>
       
           
      </section>
        <section v-if="loadedData">
          <h3>{{ titulo_info}}</h3>
        <table>
            <tr>
              <th><strong v-html="dieztitulo"></strong></th>
              <th><strong v-html="saldotitulo"></strong></th>
              <th><strong v-html="impuestotitulo"></strong></th>
            </tr>

            <tr>
              <td>{{diezporciento}}</td>
              <td>{{saldo}}</td>
              <td>{{impuesto}}</td>
            </tr>
        </table>
      </section>
  </v-form>
</template>

<script>
import axios from "axios";
import VueAxios from 'vue-axios'
export default {
  name: 'Laboratorio4',
  data: () => ({
    dieztitulo: null,
    saldotitulo: null,
    impuestotitulo: null,
    diezporciento: "",
    saldo: "",
    impuesto: "",
    error: null,
    titulo_info: null,
    sueldo: '',
    ahorro: '',
    readonly: false,
    disabled: false,
    outlined: true,
    clearable: true,
    valueWhenIsEmpty: "",
    options: {
      locale: "es-CL",
      prefix: "CLP$",
      suffix: "",
      length: 12,
      precision: 0
    },
    loading: false,
    loadedData:false,
    errored: false
  }),
  methods: {
      get10porCiento:function() {
        this.titulo_info = 'Información'
        this.loading = true
        axios.get('http://localhost:8082/rest/msdxc/dxc', {
          params: {
              sueldo: this.sueldo,
              ahorro: this.ahorro
          }
        }).then(
              response => (
                  this.diezporciento = response.data,
                  this.dieztitulo = '10%: ')
        )

        axios.get('http://localhost:8082/rest/msdxc/saldo', {
          params: {
              sueldo: this.sueldo,
              ahorro: this.ahorro
          }
        }).then(
              response => (
                  this.saldo = response.data,
                  this.saldotitulo = 'Saldo: ')
        )

        axios.get('http://localhost:8082/rest/msdxc/impuesto', {
          params: {
              sueldo: this.sueldo,
              ahorro: this.ahorro
          }
        }).then(
              response => (
                  this.impuesto = response.data,
                  this.impuestotitulo = 'Impuesto: ')
        ).finally(() => {
          this.loadedData=true;
          this.loading = false;})
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
