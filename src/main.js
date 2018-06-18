import Vue from 'vue'
import VueRouter from 'vue-router'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import Dexie from 'dexie';

import Layout from './pages/Layout.vue'
import ListarCuestionarios from './pages/ListarCuestionarios.vue'
import EditarCuestionario from './pages/EditarCuestionario.vue'
import VerCuestionario from './pages/VerCuestionario.vue'
import NoEncontrado from './pages/NoEncontrado.vue'

Dexie.delete('midatabase')

const db = new Dexie('midatabase');

db.version(1).stores({
    cuestionarios: '++id,nombre,*preguntas'
})

db.cuestionarios.bulkAdd([
	{
		nombre: 'Test psicologico',
		preguntas: [
			{
				enunciado: '¿Sos normal?',
				tipo: 'text',
				opciones: []
			},
			{
				enunciado: '¿Sos normal 2?',
				tipo: 'select',
				opciones: [ 'si', 'no']
			}
		]
	},
	{
		nombre: 'Test de informatica',
		preguntas: [
			{
				enunciado: '¿Sos normal?',
				tipo: 'text',
				opciones: []
			},
			{
				enunciado: '¿Sos normal 2?',
				tipo: 'select',
				opciones: [ 'si', 'no']
			}
		]
	}
])

Vue.prototype.$db = db

Vue.use(VueRouter)

// Vue.use(BootstrapVue)

const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '',
				component: ListarCuestionarios
			},
			{
				path: 'editar/:id',
				component: EditarCuestionario
			},
			{
				path: 'ver/:id',
				component: VerCuestionario
			},
			{
				path: '404',
				component: NoEncontrado
			},
		]
	},

	{
		path: '*',
		redirect: '/404'
	}
]

const router = new VueRouter({ routes })

new Vue({
	el: '#app',
	router,
	template: '<router-view/>'
})
