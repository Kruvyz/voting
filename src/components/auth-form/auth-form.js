import { checkLogin, registerUser, authorization } from '../../service/data';

export default class AuthForm {
    constructor(el) {
        this.$el = $(el);
        this.$registerButton = this.$el.find('.js-register-button');
        this.$signInButton = this.$el.find('.js-sign-in-button');
        this.$message = this.$el.find('.message');
    }

    init() {
        this.initListeners();
    }

    initListeners() {
        this.$registerButton.on('click', event => {
            event.preventDefault();

            const $loginInput = this.$el.find('.login__input');
            const loginInputValue = $loginInput.val();
            const passwordInputValue = this.$el.find('.password__input').val();

            if (!loginInputValue.length || !passwordInputValue.length) {
                this.setInvalidMessage('Заповніть всі поля');
                return;
            }

            checkLogin(loginInputValue)
                .then(res => {
                    if (!res) {
                        registerUser({
                            login: loginInputValue,
                            password: passwordInputValue
                        });
                        this.setValidMessage('Реєстрація успішна');
                    } else {
                        this.setInvalidMessage('Користувач з таким логіном існує');
                    }
                })
        });

        this.$signInButton.on('click', event => {
            event.preventDefault();

            const $loginInput = this.$el.find('.login__input');
            const loginInputValue = $loginInput.val();
            const passwordInputValue = this.$el.find('.password__input').val();

            if (!loginInputValue.length || !passwordInputValue.length) {
                this.setInvalidMessage('Заповніть всі поля');
                return;
            }

            authorization({
                login: loginInputValue,
                password: passwordInputValue
            })
                .then(id => {
                    localStorage.setItem('userId', id)
                    window.location.assign('/');
                })
                .catch(message => {
                    this.setInvalidMessage(message);
                });
        });
    }

    setInvalidMessage(message) {
        this.$message.text(message);
        this.$message.css('color', 'red')
    }

    setValidMessage(message) {
        this.$message.text(message);
        this.$message.css('color', 'green')
    }

    clearMessage() {        
        this.$message.text('');
    }
}