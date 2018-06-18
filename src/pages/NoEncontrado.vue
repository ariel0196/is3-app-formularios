<template>
	<b-row>
		<b-col>
			<b-breadcrumb
				:items="[
					{ text: 'Inicio', to: '/' },
					{ text: 'No Encontrado', active: true }
				]"
				class="mt-4"/>

			<h1 class="mt-4">Articulo no encontrado. 404</h1>
		</b-col>
	</b-row>

</template>
