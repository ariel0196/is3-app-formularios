<template>
  <div>

    <div class="row">
      <nav>
        <div class="nav-wrapper">
          <div class="col s12">
            <router-link to="/" class="breadcrumb">Inicio</router-link>
            <a href="#" class="breadcrumb">Editar Cuestionario</a>
          </div>
        </div>
      </nav>
    </div>

    <div class="row">
      <div class="card darken-1">
        <div class="card-content">
          <span class="card-title">Nuevo Cuestionario</span><br>
          <div class="input-field">
            <input type="text" v-model="cuestionario.nombre" placeholder="Nombre">
          </div>
        </div>
      </div>
    </div>

    <div class="row">
        <h5>Preguntas</h5>
    </div>

    <div class="row">
      <!-- Pregunta de ejemplo -->
      <div class="card blue-white darken-1" v-for="pregunta, preguntaKey in cuestionario.preguntas">

        <div class="card-content white-text">

          <label>Tipo</label>
          <select class="browser-default" v-model="pregunta.tipo">
            <option v-for="tipo in tipos" :value="tipo">{{tipo}}</option>
          </select>

          <div class="input-field">
            <input type="text" v-model="pregunta.enunciado" placeholder="Enunciado"/>
          </div>

          <div v-if="(['select', 'radiobutton', 'checkbox'].indexOf(pregunta.tipo) >= 0)">

            <h6>Opciones</h6>

            <div class="card blue-grey darken-1">
              <div class="card-content">
                <ul class="collection">

                  <li class="collection-item mt-2" v-for="opcion, opcionKey in pregunta.opciones">
                    <div class="input-field">
                      <input type="text" v-model="pregunta.opciones[opcionKey]" :placeholder="`Opcion ${opcionKey + 1}`">
                    </div>
                    <a class="waves-effect waves-light btn-small" @click="eliminarOpcion(preguntaKey, opcionKey)">Borrar Opcion</a>
                  </li>

                </ul>
              </div>
              <div class="card-action">
                <a class="waves-effect waves-light btn-small" @click="agregarOpcion(preguntaKey)">Agregar Opcion</a>
              </div>
            </div>
          </div>

        </div>

        <div class="card-action">
          <a class="waves-effect waves-light btn-small" @click="eliminarPregunta(preguntaKey)">Eliminar Pregunta</a>
        </div>

      </div>
      <!--/ Pregunta de ejemplo -->
    </div>

    <div class="row">
      <a class="waves-effect waves-light btn-small" @click="agregarPregunta">Agregar Pregunta</a>
      <a class="waves-effect waves-light btn-small" @click="guardarCuestionario" :disabled="disabled">Guardar</a>
    </div>

  </div>
</template>
<script>
  export default {
    created () {
      this.fetchData()
    },
    data () {
      return {
        disabled: false,
        tipos: [ 'radiobutton', 'checkbox', 'text', 'select', 'textarea' ],
        cuestionario: {
          id: null,
          nombre: '',
          preguntas: []
        }
      }
    },
    watch : {
      '$route': 'fetchData'
    },
    methods: {
      eliminarOpcion (preguntaKey, opcionKey) {
        var preguntas = this.cuestionario.preguntas
        preguntas[preguntaKey].opciones.splice(opcionKey, 1)
      },
      agregarOpcion (preguntaKey) {
        var preguntas = this.cuestionario.preguntas
        preguntas[preguntaKey].opciones.push('')
      },
      eliminarPregunta (preguntaKey) {
        var preguntas = this.cuestionario.preguntas
        preguntas.splice(preguntaKey, 1)
      },
      agregarPregunta () {
        this.cuestionario.preguntas.push({
          enunciado: '',
          tipo: 'text',
          opciones: []
        })
      },
      guardarCuestionario () {
        var cuestionario = this.cuestionario
        this.$db.cuestionarios
          .put(cuestionario)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {
            alert('Errr')
          })
      },
      fetchData () {
        var id = this.$route.params.id
        this.$db.cuestionarios
          .where({
            id: parseInt(id)
          })
          .toArray()
          .then((cuestionarios) => {
            if (cuestionarios.length == 0) {
              this.disabled = true
              return
            }
            this.cuestionario = cuestionarios[0]
          })
          .catch(() => {
            this.disabled = true
          })
      }
    }
  }
</script>
