import Api from "./config";

class AuthAPI {
  static login(data) {
    return Api({
      method: "POST",
      url: "/users",
      data,
    }).then((res) => res.data);
  }
}

export default AuthAPI;
