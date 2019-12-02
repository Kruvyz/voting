import './components/voting/voting.sass';
import './components/form-candidates/form-candidates.sass';
import './styles/global.sass';
import './components/diagram/diagram.sass';
import './components/matrix/matrix.sass';
import './components/marks/marks.sass';
import './styles/button.sass';
import './components/logo/logo.sass';
import './components/accordion/accordion.sass';
import './components/form-name/form-name.sass';
import './components/results-list/results-list.sass';

import FormCandidates from './components/form-candidates/form-candidates';
import Voting from './components/voting/voting';
import Diagram from './components/diagram/diagram';
import Matrix from './components/matrix/matrix';
import Marks from './components/marks/marks';
import Accordion from './components/accordion/accordion';
import FormName from './components/form-name/form-name';


const formCandidates = new FormCandidates('.js-form-candidates');
formCandidates.init();

const voting = new Voting('.js-voting');
voting.init();

const diagram = new Diagram('.js-diagrams');
diagram.init();

const matrix = new Matrix('.js-matrix');
matrix.init();

const marks = new Marks('.js-marks');
marks.init();

const accordion = new Accordion('.accordion');
accordion.init();

const formName = new FormName('.js-form-name');
formName.init();