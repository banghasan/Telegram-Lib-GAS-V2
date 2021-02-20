# Log Version

```
01 : init
02 :
    daftar.js (Alur)
        + setToken(token)
        + getToken

03-07: bug fix        

08 : user.js
        + delete(kunci)

09 : Utils.js
        + punyaAkses(array, index) : boolean

10 : bug fix requestForm

11 : Utils.js
        + textBlob(isiText, namaFile) : blob
        + random(list) : item
        + random(min, max) : integer

-12 : Utils.js
        + isArray(object) : boolean
        + substr(text, offset, length) : string

        x dibatalkan rilis, karena ada bugs yang belum diketahui sebabnya

- 13 : telegram.js
        + update bot API v5
     newMsg.js
        * bugfix sendSticker

     URL: https://t.me/bot_indonesia/21

     x dibatalkan rilis, banyak struktur berubah. Silakan kembali ke v11.


- 14&15 : (skiping)

- 16 : newMsg.js
        * bugfix sendSticker

       script.js
         + new class untuk miniDB, scriptProperties   

- 17 : util.js
        * bugfix random([array])
        + isArray(object) : boolean
        + substr(text, offset, length) : string

- 18 : telegram.js
        * bug fix requestForm

        newMsg.js
        * version() // untuk cek versi Lib

        utils.js
        + substr(input, start, len): panjangnya boleh minus
        + number_format: function(number, decimals, decPoint, thousandsSep) // number format seperti PHP

- 19* : newMsg.js
        + versi() // alias untuk version()

        util.js
        + isString(val)
        + isNumber(val)
        + isObject(val)
        + isBlob(val)
        + isDate(val)
        + isFunction(val)
        + forEach(obj, fn) // bisa untuk objek JSON
        + allReplace(str, obj)

        fetch.js
        + memasukkan class fetch // detail di doc aja

```

_Tanda * berarti belum di rilis versi barunya._
_Tanda - berarti rilis dibatalkan._