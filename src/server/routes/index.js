import { getMarkup, renderMarkup } from './markup';

const routes = ({ router }) => {
  router.get('/*', getMarkup, renderMarkup);
};

export default routes;
