/**
* Kelas untuk mendaftarkan lib fungsi telegram
* @extends msgTelegram
*/
var daftar = class Daftar extends msgTelegram {

    setToken(token) {
      this.token = token;
    }
  
    getToken() {
      return this.token;
    }
  
  }
  