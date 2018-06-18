<template>
	<div>
		<b-row>
			<b-col>

				<b-breadcrumb
					:items="[
						{ text: 'Inicio', to: '/', active: true }
					]"
					class="mt-4"/>

				<h3 class="mt-4">Listado de Cuestionarios</h3>

				<b-table
					:fields="fields"
					:items="cuestionarios"
					striped
					outlined
					class="mt-4">

					<template slot="acciones" slot-scope="data">
						<b-button @click="editar(data.item.id)" variant="success">Editar</b-button>
						<b-button @click="ver(data.item.id)" variant="primary">Ver</b-button>
					</template>

				</b-table>

				<b-button @click="agregarCuestionario" variant="success">+ Agregar Cuestionario</b-button>
				{{ cuestionarios }}
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				fields: [
					{ key: 'id', label: '#' },
					{ key: 'nombre', label: 'Nombre' },
					{ key: 'acciones', label: 'Acciones' }
				],
				cuestionarios: []
			}
		},
		methods: {
			editar (id) {
				this.$router.push(`/editar/${id}`)
			},
			ver (id) {
				this.$router.push(`/ver/${id}`)
			},
			agregarCuestionario () {

			},
			fetchData () {

				this.$db.cuestionarios
					.toArray()
					.then((cuestionarios) => {
						this.cuestionarios = cuestionarios
					})
			}
		},
		created () {
			this.fetchData()
		}

	}
</script>
