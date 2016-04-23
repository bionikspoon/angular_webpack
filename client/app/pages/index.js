import pageHome from '../pages/home';
import pageAbout from '../pages/about';

export default angular
  .module('app.pages', [ pageHome.name, pageAbout.name ]);
