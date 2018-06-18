<template>
	<div>
		<h4>Nombre: {{ cuestionario.nombre }}</h4>

		<fieldset>
			<legend>Preguntas</legend>

			<div v-for="pregunta, preguntaKey in cuestionario.preguntas" style="margin-bottom: 10px">

				<label>{{ pregunta.enunciado }}</label>

				<br>

				<template v-if="pregunta.tipo == 'text'">
					<input type="text"/>
				</template>

				<template v-if="pregunta.tipo == 'textarea'">
					<textarea rows="3" max-rows="6"/>
				</template>

				<template v-else-if="pregunta.tipo == 'select'">
					<select>
						<option v-for="opcion in pregunta.opciones">{{ opcion }}</option>
					</select>
				</template>

				<template v-else-if="pregunta.tipo == 'checkbox'">
					<div v-for="opcion in pregunta.opciones">
						<input type="checkbox"> {{ opcion }}
					</div>
				</template>

				<template v-else>
					<div v-for="opcion in pregunta.opciones">
						<input type="radio"> {{ opcion }}
					</div>
				</template>
			</div>

		</fieldset>


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
