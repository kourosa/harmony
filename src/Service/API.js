import axios from 'axios';
import decode from 'jwt-decode';


export default class API {

    register(u, e, p, t) {
        let body = JSON.stringify({
            email: e,
            password: p,
            username: u,
            type: t
        });
        return axios.post(`http://localhost:8080/ReactAPI/API/register.php`, body)
            .then(res => {
                console.log("res", res);
                return Promise.resolve(res);
            }).catch(error => {
                console.log(error);
                console.log("responce data", error.response);
                return Promise.resolve(error.response);

            });

    }

    login(u, p) {
        console.log(this.getProfile);
        let body = JSON.stringify({
            email: u,
            password: p
        });
        console.log(u, p);
        return axios.post(`http://localhost:8080/ReactAPI/API/login.php`, body)
            .then(res => {
                localStorage.setItem('jwt', res.data.jwt);
                return Promise.resolve(res);

            }).catch(error => {
                console.log("responce data", error.response.data.message);
                return Promise.resolve(error);

            });

    }


    validate(jwt) {
        let body = JSON.stringify({
            "jwt": jwt
        });
        return axios.post(`http://localhost:8080/ReactAPI/API/validate_token.php`, body)
            .then(res => {
                return Promise.resolve(res.data.data);

            }).catch(error => {

                console.log(error);
                return Promise.resolve(error);

            });

    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('jwt');
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('jwt');
    }

    getProfile() {
        return decode(this.getToken()).data;
    }


    addCompany(data) {
        let body = JSON.stringify(data);
        return axios.post(`http://localhost:8080/ReactAPI/API/addcompany.php`, body)
            .then(res => {
                //console.log("resdata", res.data);
                return Promise.resolve(res);
            }).catch(error => {
                //console.log("responce data", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }

    updateCompany(data) {
        let body = JSON.stringify(data);
        return axios.post(`http://localhost:8080/ReactAPI/API/updatecompany.php`, body)
            .then(res => {
                //console.log("resdata", res.data);
                return Promise.resolve(res);
            }).catch(error => {
                //console.log("responce data", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }

    updateCompanyService(data) {
        let body = JSON.stringify(data);
        console.log("body", body);
        return axios.post(`http://localhost:8080/ReactAPI/API/updateservice.php`, body)
            .then(res => {
                return Promise.resolve(res.data);
            }).catch(error => {
                console.log("resdata from update backend", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }


    getCompanyInfo(id) {
        let body = JSON.stringify({
            "id": id
        });
        return axios.post(`http://localhost:8080/ReactAPI/API/getcompanyinfo.php`, body)
            .then(res => {
                //console.log("getCompanyInfo api responce.data :", res.data);
                return Promise.resolve(res);

            }).catch(error => {
                //console.log("getCompanyInfo api error:", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }


    getAllItems() {
        return axios.post(`http://localhost:8080/ReactAPI/API/getallitems.php`)
            .then(res => {
                //console.log("get AllItems API response data : ", res.data);
                return Promise.resolve(res.data);

            }).catch(error => {
                //console.log("get AllItems API error", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }

    getCompanyServices(companyid) {
        let body = JSON.stringify({
            "companyid": companyid
        });
        return axios.post(`http://localhost:8080/ReactAPI/API/getcompanyitems.php`, body)
            .then(res => {
                console.log("resdata", res.data);
                return Promise.resolve(res);

            }).catch(error => {
                console.log("error data", error.response.data.message);
                return Promise.resolve(error.response);
            });
    }

    addCompanyService(data) {
        let body = JSON.stringify(data);
        console.log(body);
        console.log("body", body);

        return axios.post(`http://localhost:8080/ReactAPI/API/addservice.php`, body)
            .then(res => {
                console.log("resdata", res.data);
                return Promise.resolve(res);
            }).catch(error => {
                //console.log("responce data", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }

    removeCompanyService(id) {
        let body = JSON.stringify({
            "itemid": id
        });
        console.log("body", body);

        return axios.post(`http://localhost:8080/ReactAPI/API/removeservice.php`, body)
            .then(res => {
                console.log("resdata from remove", res.data);
                return Promise.resolve(res.data);
            }).catch(error => {
                console.log("responce data from remove", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }

    uploadImage(file, id) {
        console.log('file', file);
        var formData = new FormData();
        formData.append('image', file);
        formData.append('id', id);
        console.log("formData upload api:", formData);
        return axios.post(`http://localhost:8080/ReactAPI/API/uploadimage.php`, formData)
            .then(res => {
                console.log("uploadImage responce :", res.data);
                return Promise.resolve(res.data);
            }).catch(error => {
                console.log(error);
                return Promise.resolve(error);
            });
    }


    uploadImage2(file, id) {
        console.log('file', file);
        var formData = new FormData();
        formData.append('image', file);
        formData.append('id', id);
        console.log("formData upload api:", formData);
        return axios.post(`http://localhost:8080/ReactAPI/API/uploadimage.php`, formData)
            //return axios.post(`http://localhost:8080/ReactAPI/API/uploadimage.php`, file)
            .then(res => {
                console.log("uploadImage responce :", res.data);
                return Promise.resolve(res.data);

            }).catch(error => {
                console.log("kouros error", error);
                return Promise.resolve(error);
            });
    }

    addCoupon(data) {
        let body = JSON.stringify(data);
        console.log("body", body);

        return axios.post(`http://localhost:8080/ReactAPI/API/addcoupon.php`, body)
            .then(res => {
                console.log("resdata", res.data);
                return Promise.resolve(res.data);
            }).catch(error => {
                //console.log("responce data", error.response.data.message);
                return Promise.resolve(error.response.data);
            });
    }

    getUserCoupons(userid) {
        let body = JSON.stringify({
            "userid": userid
        });
        return axios.post(`http://localhost:8080/ReactAPI/API/getusercoupons.php`, body)
            .then(res => {
                // console.log("resdata", res);
                return Promise.resolve(res);

            }).catch(error => {
                // console.log("responce data", error.response.data.message);
                return Promise.resolve(error.response);
            });
    }

    getCompanyCoupons(companyid) {
        let body = JSON.stringify({
            "companyid": companyid
        });
        return axios.post(`http://localhost:8080/ReactAPI/API/getcompanycoupons.php`, body)
            .then(res => {
                // console.log("resdata", res);
                return Promise.resolve(res);

            }).catch(error => {
                // console.log("responce data", error.response.data.message);
                return Promise.resolve(error.response);
            });
    }

}
