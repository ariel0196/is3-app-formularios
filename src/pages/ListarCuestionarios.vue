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
						<b-button @click="eliminar(data.item.id)" variant="danger">Eliminar</b-button>
					</template>

				</b-table>

				<b-button @click="agregarCuestionario" variant="success">+ Agregar Cuestionario</b-button>
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
			eliminar (id) {
				this.$db.cuestionarios
					.delete(id)
					.then(() => {
						alert('Cuestionario Eliminado Correctamente')
						this.cuestionarios = this.cuestionarios.filter((item) => {
							return item.id != id
						})
					})
					.catch(() => {
						alert('Error al eliminar el cuestionario')
					})

			},
			agregarCuestionario () {
				this.$router.push('/agregar')
				// this.$db.cuestionarios
				// 	.add({
				// 		nombre: '',
				// 		preguntas: []
				// 	})
				// 	.then((id) => {
				// 		this.$router.push(`/editar/${id}`)
				// 	})
				// 	.catch(() => {
				// 		alert('Error al agregar un cuestionario')
				// 	})
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
