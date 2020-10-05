/**
* Kelas untuk mendaftarkan lib fungsi telegram
* @extends msgTelegram
*/
var daftar = class Daftar extends msgTelegram {

    setToken(token) {
        if (token.lenght<30) return false;
        this.token = token;
        return true;
    }

    getToken() {
        return this.token;
    }

}
