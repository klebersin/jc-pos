import Api from "./config";

class InvoiceAPI {
  static createInvoice(data) {
    return Api({
      method: "POST",
      url: "/invoice",
      data,
    }).then((res) => res.data);
  }
  static getInvoices() {
    return Api({
      method: "GET",
      url: "/invoice",
    }).then((res) => res.data);
  }
}

export default InvoiceAPI;
