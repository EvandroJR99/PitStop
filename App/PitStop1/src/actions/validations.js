const soletras = /[a-zA-Z\u00C0-\u00FF ]+/i;
const validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export { soletras, validationEmail };