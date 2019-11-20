import './components/voting/voting.sass';
import './components/form-candidates/form-candidates.sass';
import './styles/global.sass';
import './components/diagram/diagram.sass';
import './components/matrix/matrix.sass';
import './components/marks/marks.sass';
import './styles/button.sass';

import FormCandidates from './components/form-candidates/form-candidates';
import FormExperts from './components/form-experts/form-experts';
import Voting from './components/voting/voting';
import Diagram from './components/diagram/diagram';
import Matrix from './components/matrix/matrix';
import Winner from './components/winner/winner';
import Marks from './components/marks/marks';

const formCandidates = new FormCandidates('.js-form-candidates');
formCandidates.init();

const formExperts = new FormExperts('.js-form-experts');
formExperts.init();

const voting = new Voting('.js-voting');
voting.init();

const diagram = new Diagram('.js-diagrams');
diagram.init();

const matrix = new Matrix('.js-matrix');
matrix.init();

const winner = new Winner('.js-winner');
winner.init();

const marks = new Marks('.js-marks');
marks.init();