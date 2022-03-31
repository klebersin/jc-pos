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

const PAYMENT_METHODS = {
  CASH: {
    value: "cash",
    label: "Efectivo",
  },
  BANK_TRANSFER: {
    value: "bankTransfer",
    label: "Transferencia bancaria",
  },
};

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
  MONTHLY_PAYMENT: { value: "monthlyPayment", label: "Pensión" },
  REGISTRATION: { value: "registration", label: "Matricula" },
  PRODUCTS: { value: "products", label: "Productos" },
};

const YEAR_OPTIONS = {
  TWENTY_TWO: "2022",
  TWENTY_THREE: "2023",
  TWENTY_FOUR: "2024",
  TWENTY_FIVE: "2025",
  TWENTY_SIX: "2026",
};

module.exports = {
  GRADES,
  SERVICES_TYPES,
  MONTHLY_PAYMENT_TYPES,
  YEAR_OPTIONS,
  PAYMENT_METHODS,
};
