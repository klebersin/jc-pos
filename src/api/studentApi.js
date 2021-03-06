import Api from "./config";

class StudentAPI {
  static getStudents(page, rowsPerPage, filterStudents) {
    return Api({
      method: "GET",
      url: "/students",
      params: {
        page,
        rowsPerPage,
        filterStudents,
      },
    }).then((res) => res.data);
  }
  static createStudent(data) {
    return Api({
      method: "POST",
      url: "/students",
      data,
    }).then((res) => res.data);
  }
  static editStudent(id, data) {
    return Api({
      method: "PUT",
      url: `/students/${id}`,
      data,
    }).then((res) => res.data);
  }
  static deleteStudent(id) {
    return Api({
      method: "DELETE",
      url: `/students/${id}`,
    }).then((res) => res.data);
  }
  static getStudent(id) {
    return Api({
      method: "GET",
      url: `/students/${id}`,
    }).then((res) => res.data);
  }
}

export default StudentAPI;
