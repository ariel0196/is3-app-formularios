<template>
	<b-row>
		<b-col>

			<b-breadcrumb
				:items="[
					{ text: 'Inicio', to: '/' },
					{ text: 'Editar Cuestionario', active: true },
					{ text: cuestionario.nombre, active: true },
				]"
				class="mt-4"/>

			<h4 class="mt-4">Datos del Cuestionario</h4>

			<b-card bg-variant="light" class="mt-4" >
				<b-form-group label="Nombre" horizontal>
					<b-form-input v-model="cuestionario.nombre" type="text"/>
				</b-form-group>
			</b-card>

			<h4 class="mt-4">Preguntas</h4>

			<b-card
				v-for="pregunta, preguntaKey in cuestionario.preguntas"
				bg-variant="light"
				class="mt-4">

				<b-form-group label="Tipo" horizontal>
					<b-form-select :options="tipos" v-model="pregunta.tipo"/>
				</b-form-group>

				<b-form-group label="Enunciado" horizontal>
					<b-form-input type="text" v-model="pregunta.enunciado"/>
				</b-form-group>

				<b-form-group
					v-if="(['select', 'radiobutton', 'checkbox'].indexOf(pregunta.tipo) >= 0)"
					label="Opciones"
					horizontal>

					<b-card>

						<b-input-group
							v-for="opcion, opcionKey in pregunta.opciones"
							:prepend="`Opcion ${opcionKey + 1}`"
							class="mt-2">

							<b-form-input v-model="pregunta.opciones[opcionKey]" type="text"/>
							<b-button
								@click="eliminarOpcion(preguntaKey, opcionKey)"
								slot="append"
								variant="danger">Eliminar</b-button>
						</b-input-group>

						<b-button
							@click="agregarOpcion(preguntaKey)"
							slot="footer"
							variant="primary">
							Agregar Opcion
						</b-button>
					</b-card>
				</b-form-group>

				<b-button
					@click="eliminarPregunta(preguntaKey)"
					slot="footer"
					variant="danger">
					Eliminar Pregunta
				</b-button>

			</b-card>

			<b-button
				@click="agregarPregunta"
				variant="primary"
				class="mt-4">
				Agregar Pregunta
			</b-button>

			<b-button
				@click="guardarCuestionario"
				variant="success"
				class="mt-4">
				Guardar
			</b-button>

		</b-col>
	</b-row>
</template>
<script>
	export default {
		created () {
			this.fetchData()
		},
		data () {
			return {
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
						alert('Cuestionario guardado Correctamente')
					})
					.catch(() => {
						alert('Error al guardar el cuestionario')
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
						if (cuestionarios.length == 0) this.$router.replace('/404')
						this.cuestionario = cuestionarios[0]
					})
					.catch(() => {
						this.$router.replace('/404')
					})
			}
		}
	}
</script>
