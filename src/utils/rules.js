export const required = value => value.trim() ? true : 'El campo debe estar relleno';
export const email = value => /\S+@\S+\.\S+/.test(value) ? true : 'Este debe ser un correo electrónico válido';
export const subdomain = value => /^[a-z]+$/.test(value) ? true : 'Solo letras minusculas';
export const maxLength = max => value => value?.length <= max ? true : `Máximo ${max} caracteres`;
export const minLength = min => value => value?.length >= min ? true : `Mínimo ${min} caracteres`;
// Puedes agregar más reglas según necesites