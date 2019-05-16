//Importanto dependencias
import 'bootstrap';

//Importando Favicon
import './icons/favicon.ico';

//Importando Imagens
import './images/marvel-logo.png';

//Importando SASS
import './scss/app.scss';

//Importando HTML
import './index.html';

//Importando JS
import {carregaApi,chamaApi} from './functions';

//Resposta de carregamento do JS
chamaApi(carregaApi('50','21dcabcc59fe581c8924813fbe35f477'));