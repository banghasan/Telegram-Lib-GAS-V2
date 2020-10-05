/**
* Kelas untuk mendaftarkan lib fungsi telegram
* @extends msgTelegram
*/
var daftar = class Daftar extends msgTelegram {

    setToken(token) {
        if (token.lenght<30) {
            Logger.log('Panjang token ERROR!');
            return false;
        }
        this.token = token;
        Logger.log('Token berhasil disimpan!');
    }

    getToken() {
        return this.token;
    }

}
