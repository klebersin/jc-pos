import axios from "axios";

class StudentApi {
    static getStudents (){
        return axios.get(process.env.API_URL);
    }
    static createStudent (data){
        return axios.post(process.env.API_URL, data);
    }
    static updateStudent (id, data){
        return axios.put(process.env.API_URL+`/${id}`, data);
    }
    static deleteStudent (id){
        return axios.delete(process.env.API_URL+`/${id}`);
    }
}
export default StudentApi;