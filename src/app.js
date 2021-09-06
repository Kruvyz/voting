import './components/voting/voting.sass';
import './components/form-candidates/form-candidates.sass';
import './styles/global.sass';
import './components/diagrams/diagrams.sass';
import './components/matrix/matrix.sass';
import './components/marks/marks.sass';
import './styles/button.sass';
import './components/logo/logo.sass';
import './components/accordion/accordion.sass';
import './components/form-name/form-name.sass';
import './components/auth-form/auth-form.sass';
import './components/diagrams/diagram/diagram.sass';

import FormCandidates from './components/form-candidates/form-candidates';
import Voting from './components/voting/voting';
import Diagrams from './components/diagrams/diagrams';
import Matrix from './components/matrix/matrix';
import Winner from './components/winner/winner';
import Marks from './components/marks/marks';
import Accordion from './components/accordion/accordion';
import FormName from './components/form-name/form-name';
import AuthForm from './components/auth-form/auth-form';

 if (!localStorage.getItem('userId') && window.location.pathname !== '/auth') window.location.assign('/auth');

const formCandidates = new FormCandidates('.js-form-candidates');
formCandidates.init();

const voting = new Voting('.js-voting');
voting.init();

const diagram = new Diagrams('.js-diagrams');
diagram.init();

const matrix = new Matrix('.js-matrix');
matrix.init();

const winner = new Winner('.js-winner');
winner.init();

const marks = new Marks('.js-marks');
marks.init();

const accordion = new Accordion('.accordion');
accordion.init();

const formName = new FormName('.js-form-name');
formName.init();

const authForm = new AuthForm('.js-auth-form');
authForm.init();

$('.js-log-out').on('click', event => {
    localStorage.setItem('userId', '');
    window.location.assign('/auth');
});