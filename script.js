const strengthMeter = document.getElementById('strength-meter');
const passwordInput = document.getElementById('password-input');
const reasonsBox = document.getElementById('reasons');

let strength = 0;


const updatePasswordStrength = function () {
	const weaknesses = calculateStrength(passwordInput.value);
	reasonsBox.innerHTML = '';
	// DISPLAY REASONS IN DIV
	let strength = 100;
	const weakValue = 100 / weaknesses.length;
	weaknesses.forEach((weak) => {
        if (weak === undefined) return;
		const reason = document.createElement('div');
		reason.innerHTML = `<p>${weak}</p>`;
		reasonsBox.appendChild(reason);
		strength -= weakValue;
	});
    document.documentElement.style.setProperty('--strength-width', `${strength}%`);
};

const calculateStrength = function (password) {
	const weaknesses = [];

	// to check:
	// LENGTH
	// SMALL LETTERS
	// LARGE LETTERS
	// NUMBER
	// SPECIAL CHAR

	weaknesses.push(lengthWeakness(password));
	weaknesses.push(lowercaseWeakness(password));
	weaknesses.push(uppercaseWeakness(password));
	weaknesses.push(numberWeakness(password));
	weaknesses.push(specialcharWeakness(password));
	return weaknesses;
};

const lengthWeakness = function (password) {
	if (password.trim().length < 5) return 'Password is too short';
};

const lowercaseWeakness = function (password) {
	return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters');
};

const uppercaseWeakness = function (password) {
	return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters');
};

const numberWeakness = function (password) {
	return characterTypeWeakness(password, /[0-9]/g, 'numbers');
};

const specialcharWeakness = function (password) {
	return characterTypeWeakness(
		password,
		/[^0-9a-zA-Z\s]/g,
		'special characters'
	);
};

const characterTypeWeakness = function (password, regEx, type) {
	const matches = password.match(regEx) || [];
	if (matches.length === 0) return `Password has no ${type}`;
};

passwordInput.addEventListener('input', updatePasswordStrength);
updatePasswordStrength();
