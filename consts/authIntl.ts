import { authProviders } from '@/consts/authProviders';

import { upperCaseArrayElems } from '@/utils/upperCaseArrayElems';

export const authIntl = {
	sign_in: {
		email_label: 'Введите Вашу почту',
		password_label: 'Введите Ваш пароль',
		email_input_placeholder: 'Почта',
		password_input_placeholder: 'Пароль',
		button_label: 'Войти',
		loading_button_label: 'Вход выполняется...',
		social_provider_text: `Войти через ${upperCaseArrayElems(authProviders)}`,
		link_text: 'Уже есть аккаунт?',
	},
	sign_up: {
		email_label: 'Введите Вашу почту',
		password_label: 'Введите Ваш пароль',
		email_input_placeholder: 'Почта',
		password_input_placeholder: 'Пароль',
		button_label: 'Зарегистрироваться',
		loading_button_label: 'Регистрация выполняется...',
		social_provider_text: `Войти через ${upperCaseArrayElems(authProviders)}`,
		link_text: 'Нет аккаунта?',
		confirmation_text: 'Проверьте почту на наличие подтверждающей ссылки',
	},
	magic_link: {
		email_input_label: 'Введите Вашу почту',
		email_input_placeholder: 'Почта',
		button_label: 'Войти',
		loading_button_label: 'Вход выполняется...',
		link_text: 'Войти с "волшебной ссылкой"',
		confirmation_text: 'Проверьте почту на наличие "волшебной ссылки"',
	},
	forgotten_password: {
		email_label: 'Введите Вашу почту',
		password_label: 'Введите Ваш пароль',
		email_input_placeholder: 'Почта',
		button_label: 'Отправить инструкции по восстановлению пароля',
		loading_button_label: 'Отправка инструкций...',
		link_text: 'Забыли пароль?',
		confirmation_text: 'Проверьте почту на наличие ссылки для восстановления пароля',
	},
	update_password: {
		password_label: 'Введите Ваш новый пароль',
		password_input_placeholder: 'Новый пароль',
		button_label: 'Обновить пароль',
		loading_button_label: 'Обновление пароля...',
		confirmation_text: 'Ваш пароль был обновлен',
	},
	verify_otp: {
		email_input_label: 'Введите Вашу почту',
		email_input_placeholder: 'Почта',
		phone_input_label: 'Введите Ваш номер телефона',
		phone_input_placeholder: 'Номер телефона',
		token_input_label: 'Введите Ваш OTP токен',
		token_input_placeholder: 'Токен',
		button_label: 'Проверить токен',
		loading_button_label: 'Вход выполняется...',
	}
};
