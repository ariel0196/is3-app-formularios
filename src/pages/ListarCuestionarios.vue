<template>
	<div>

		<div class="row">
			<nav>
				<div class="nav-wrapper">
					<div class="col s12">
						<router-link to="/" class="breadcrumb">Inicio</router-link>
					</div>
				</div>
			</nav>
		</div>

		<div class="row">

			<table class="striped" >
				<thead>
					<tr>
						<th>
							Nombre Formulario
						</th>
						<th>
							Operaciones
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="cuestionario in cuestionarios">
						<td>{{ cuestionario. nombre }}</td>
						<td>
							<a class="waves-effect waves-light btn-small"
								@click="editar(cuestionario.id)">
								Editar
							</a>
							<a class="waves-effect waves-light btn-small"
								@click="ver(cuestionario.id)">
								Ver
							</a>
						</td>
					</tr>
				</tbody>
			</table>

		</div>

		<div class="row">
			<a class="btn-floating btn-large waves-effect waves-light red" @click="agregarCuestionario">
				<i class="material-icons">add</i>
			</a>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				fields: [
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
				this.$db.cuestionarios
				.add({
					nombre: '',
					preguntas: []
				})
				.then((id) => {
					this.$router.push(`/editar/${id}`)
				})
				.catch(() => {
					alert('Error al agregar un cuestionario')
				})
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
