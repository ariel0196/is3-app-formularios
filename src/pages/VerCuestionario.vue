<template>
	<b-row>
		<b-col>

			<b-breadcrumb
				:items="[
					{ text: 'Inicio', to: '/' },
					{ text: 'Ver Cuestionario', active: true },
					{ text: cuestionario.nombre, active: true },
				]"
				class="mt-4"/>

			<h4 class="mt-4">{{ cuestionario.nombre }}</h4>

			<b-form-group
				v-for="pregunta, preguntaKey in cuestionario.preguntas"
				:label="pregunta.enunciado"
				class="mt-4">

				<template v-if="pregunta.tipo == 'text'">
					<b-form-input type="text"/>
				</template>

				<template v-if="pregunta.tipo == 'textarea'">
					<b-form-textarea rows="3" max-rows="6"/>
				</template>

				<template v-else-if="pregunta.tipo == 'select'">
					<b-form-select :options="pregunta.opciones"></b-form-select>
				</template>

				<template v-else-if="pregunta.tipo == 'checkbox'">
					<b-form-checkbox-group
						:name="`pregunta-${preguntaKey}`"
						:options="pregunta.opciones"
						stacked />
				</template>

				<template v-else>
					<b-form-radio-group
						:name="`pregunta-${preguntaKey}`"
						:options="pregunta.opciones"
						stacked/>
				</template>

			</b-form-group>

		</b-col>
	</b-row>
</template>
<script>
	export default {
		data () {
			return {
				cuestionario: {
					id: null,
					nombre: '',
					preguntas: []
				}
			}
		}
	}
</script>
