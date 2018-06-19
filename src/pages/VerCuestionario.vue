<template>
    <div>
        <div class="row">
            <nav>
                <div class="nav-wrapper">
                    <div class="col s12">
                        <router-link to="/" class="breadcrumb">Inicio</router-link>
                        <a href="#" class="breadcrumb">Visualizar Cuestionario</a>
                    </div>
                </div>
            </nav>
        </div>

        <div class="row">
            <h4>{{ cuestionario.nombre }}</h4>
        </div>

        <form class="row">

            <div v-for="pregunta, preguntaKey in cuestionario.preguntas" style="margin-bottom: 10px">

                <label>{{ pregunta.enunciado }}</label>

                <template v-if="pregunta.tipo == 'text'">
                    <input type="text">
                </template>

                <template v-if="pregunta.tipo == 'textarea'">
                    <textarea rows="3" max-rows="6"/>
                </template>

                <template v-else-if="pregunta.tipo == 'select'">
                    <select class="browser-default">
                        <option value="" disabled selected>Elija su respuesta</option>
                        <option v-for="opcion in pregunta.opciones">{{ opcion }}</option>
                    </select>
                </template>

                <template v-else-if="pregunta.tipo == 'checkbox'">
                    <p v-for="opcion in pregunta.opciones">
                        <label>
                            <input type="checkbox"  class="filled-in">
                            <span>{{ opcion }}</span>
                        </label>
                    </p>
                </template>

                <template v-else>
                    <p v-for="opcion in pregunta.opciones">
                        <label>
                            <input type="radio">
                            <span>{{ opcion }}</span>
                        </label>
                    </p>
                </template>

            </div>
        </form>
    </div>
</template>
<script>
    export default {
        created () {
            this.fetchData()
        },
        data () {
            return {
                cuestionario: {
                    id: null,
                    nombre: '',
                    preguntas: []
                }
            }
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                var id = this.$route.params.id
                this.$db.cuestionarios
                .where({
                    id: parseInt(id)
                })
                .toArray()
                .then((cuestionarios) => {
                    if (cuestionarios.length == 0) return
                        this.cuestionario = cuestionarios[0]
                })
                    /*.catch(() => {
                        this.$router.replace('/404')
                    })*/
                }
            }
        }
    </script>
