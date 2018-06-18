<template>
	<div>
		<h4>Editar Cuestionario</h4>

		<hr>

		<fieldset id="cuestionario">
			<legend>Cuestionario</legend>

			<div>
				<label>Nombre del Formulario</label>
				<input type="text" v-model="cuestionario.nombre">
				<button @click="guardarCuestionario" :disabled="disabled">Guardar</button>
			</div>

			<fieldset id="preguntas">
				<legend>Lista de preguntas</legend>


				<button @click="agregarPregunta">Nueva Pregunta</button>


				<fieldset v-for="pregunta, preguntaKey in cuestionario.preguntas" :class="`pregunta-${preguntaKey}`">
					<legend>Pregunta {{ preguntaKey + 1 }}</legend>

					<div>
						<label>Tipo</label>
						<select v-model="pregunta.tipo">
							<option v-for="tipo in tipos" :value="tipo">{{tipo}}</option>
						</select>
					</div>

					<div>
						<label>Enunciado</label>
						<input type="text" v-model="pregunta.enunciado"/>
					</div>

					<fieldset v-if="(['select', 'radiobutton', 'checkbox'].indexOf(pregunta.tipo) >= 0)">
						<legend>Opciones</legend>

						<div v-for="opcion, opcionKey in pregunta.opciones">
							<label>Opcion {{ opcionKey + 1 }}</label>
							<input type="text" v-model="pregunta.opciones[opcionKey]">
							<button @click="eliminarOpcion(preguntaKey, opcionKey)">Eliminar</button>
						</div>

						<div>
							<button @click="agregarOpcion(preguntaKey)">Agregar Opcion</button>
						</div>

					</fieldset>

					<button @click="eliminarPregunta(preguntaKey)">Eliminar Pregunta</button>

				</fieldset>
			</fieldset>
		</fieldset>

		<hr>

		<h4>Menu:</h4>

		<ul>
			<li><router-link to="/">Atras</router-link></li>
		</ul>

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
<style>
	fieldset {
		padding: 15px;
		margin: 15px;
	}

	fieldset legend {
		font-weight: bold;
	}

	#cuestionario {
		background-color: LightBlue ;
		border: 5px solid LightBlue;
	}

	#preguntas {
		background-color: LightCoral ;
		border: 5px solid LightCoral ;
	}

	[class^="pregunta-"] {
		background-color: lightgray ;
		border: 5px solid lightgray ;
	}
</style>
