const GRADES = [
  {
    value: 1,
    label: "Primer grado",
  },
  {
    value: 2,
    label: "Segundo grado",
  },
  {
    value: 3,
    label: "Tercer grado",
  },
  {
    value: 4,
    label: "Cuarto grado",
  },
  {
    value: 5,
    label: "Quinto grado",
  },
  {
    value: 6,
    label: "Sexto grado",
  },
];

const MONTHLY_PAYMENT_TYPES = {
  JANUARY: { value: "January", label: "Enero" },
  FEBRUARY: { value: "February", label: "Febrero" },
  MARCH: { value: "March", label: "Marzo" },
  APRIL: { value: "April", label: "Abril" },
  MAY: { value: "May", label: "Mayo" },
  JUNE: { value: "June", label: "Junio" },
  JULY: { value: "July", label: "Julio" },
  AUGUST: { value: "August", label: "Agosto" },
  SEPTEMBER: { value: "September", label: "Septiembre" },
  OCTOBER: { value: "October", label: "Octubre" },
  NOVEMBER: { value: "November", label: "Noviembre" },
  DECEMBER: { value: "December", label: "Diciembre" },
};

const SERVICES_TYPES = {
  REGISTRATION: { value: "registration", label: "Matricula" },
  MONTHLY_PAYMENT: { value: "monthlyPayment", label: "Pensión" },
  PRODUCTS: { value: "products", label: "Productos" },
};

module.exports = { GRADES, SERVICES_TYPES, MONTHLY_PAYMENT_TYPES };
