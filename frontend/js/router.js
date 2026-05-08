import { renderSolicitacoes } from './pages/solicitacoes.js';
import { renderCategorias } from './pages/categorias.js';
import { renderSolicitantes } from './pages/solicitantes.js';

const routes = {
  solicitacoes: renderSolicitacoes,
  categorias: renderCategorias,
  solicitantes: renderSolicitantes

};

export function initRouter() {

  bindMenuEvents();

  navigate('solicitacoes');
}

export function navigate(route) {

  const render = routes[route];

  if (!render) return;

  render();

  updatePageTitle(route);
}

function bindMenuEvents() {

  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {

    item.addEventListener('click', () => {

      const route = item.dataset.route;

      navigate(route);

    });

  });

}

function updatePageTitle(route) {

  const titles = {
    solicitacoes:   'Solicitações',
    categorias:     'Categorias',
    solicitantes:   'Solicitantes'
  };

  document.getElementById('page-title').innerText =
    titles[route] || 'SGS';

}