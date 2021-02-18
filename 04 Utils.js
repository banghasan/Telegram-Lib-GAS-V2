/**
Kelas berbagai utilitas
*/
var Utils = {

  /**
  Substr seperti PHP, hanya tidak support minus
  @param {string} text yang akan diolah
  @param {number} offset angka memulai, berawal dari 0
  @param {number} length panjang yang akan dipotong, support minus
  */
  substr: function (input, start, len) {
    // len support minus

    var inputLength = input.length
    var end = inputLength

    if (start < 0) {
      start += end
    }

    if (typeof len !== 'undefined') {
      if (len < 0) {
        end = len + end
      } else {
        end = len + start
      }
    }

    if (start > inputLength || start < 0 || start > end) {
      return false
    }

    return input.slice(start, end)
  },

  /**
  Membersihkan tag HTML
  @param {string} text yang akan dibersihkan
  */
  clearHTML: function (s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  /**
  Membersihkan tag Markdown
  @param {string} text yang akan dibersihkan
  */
  clearMarkdown: function (s) {
    return s
      .replace(/_/g, "\\_")
      .replace(/\*/g, "\\*")
      .replace(/\[/g, "\\[")
      .replace(/`/g, "\\`");
  },


  /**
  Menghasilkan waktu
  @param {date} tanggal dama timeunixstamp
  @param {string} timezone
  @param {string} format yang akan disajikan
  */
  formatDate: function (date, timeZone, format) {
    // contoh: formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
    // format https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
    return Utilities.formatDate(date, timeZone, format);
  },

  formatString: function (template, args) {
    // contoh: formatString('%6s', 'abc');
    // "   abc"
    return Utilities.formatString(template, args);
  },

  // untuk pengecekkan hak akses
  /* contoh: 
      var adminID = [1, 2, 3, 4]
      if ( tg.util.punyaAkses(adminID, msg.from.id) ) { .. }
  */
  punyaAkses: function (array, index) {
    if (array.indexOf(index) > -1) {
      return true;
    } else {
      return false;
    }
  },

  isArray: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },

  random: function () {

    // random(list) : item
    if (arguments.length === 1 && this.isArray(arguments[0])) {
      var list = arguments[0];
      return list[Math.floor((Math.random() * list.length))];
    }

    // random(min, max) : integer
    if (arguments.length === 2 && typeof (arguments[0]) === 'number' && typeof (arguments[1]) === 'number') {
      var min = arguments[0];
      var max = arguments[1];
      if (max < min) { [min, max] = [max, min]; }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return false;
  },

  uuID: function () {
    // unik ID
    return Utilities.getUuid();
  },

  sleep: function (milidetik) {
    return Utilities.sleep(milidetik);
  },

  // fungsi timeConverter, untuk merubah timestamp ke waktu yang bisa dibaca manusia
  // kadang perlu di x1000 dari timestamp biasa (timestampnya telegram)

  // jika timeConverter(UNIX_timestamp) berarti timestamp biasa yang akan di x1000
  // jika timeConverter(UNIX_timestamp, true) berarti akan dikali ribuan 
  timeConverter: function (UNIX_timestamp, ribuan) {
    ribuan = (typeof ribuan == 'undefined') ? false : true;

    var a = new Date(UNIX_timestamp);
    if (ribuan) {
      a = new Date(UNIX_timestamp * 1000);
    }

    //buat index bulan
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'];

    // ambil pecahan waktu masing-masing
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    // gabungkan ke dalam variable time
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  },

  // number format seperti PHP

  /*
  number_format(1234.56)   //   returns  '1,235'

  number_format(1234.56, 2, ',', ' ')  //   returns  '1 234,56'
  
  number_format(1234.5678, 2, '.', '')   //   returns '1234.57'
  
  number_format(67, 2, ',', '.')   //   returns '67,00'
  
  number_format(1000)   //  returns  '1,000'
  
  number_format(67.311, 2)   //   returns '67.31'
  
  number_format(1000.55, 1)  //   returns '1,000.6'
  
  number_format(67000, 5, ',', '.')  //   returns  '67.000,00000'
  
  number_format(0.9, 0) //  returns '1'
  
  number_format('1.20', 2)   //  returns  '1.20'
  
  number_format('1.20', 4)   //  returns '1.2000'
  
  number_format('1.2000', 3)  //  returns  '1.200'
  
  number_format('1 000,50', 2, '.', ' ')  //  returns '100 050.00'
  
  number_format(1e-8, 8, '.', '')  //  returns 14: '0.00000001'
  */

  number_format: function (number, decimals, decPoint, thousandsSep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    var s = ''

    var toFixedFix = function (n, prec) {
      if (('' + n).indexOf('e') === -1) {
        return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
      } else {
        var arr = ('' + n).split('e')
        var sig = ''
        if (+arr[1] + prec > 0) {
          sig = '+'
        }
        return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
      }
    }

    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)
  },

  // contoh: var blob = textBlob('Hasanudin H Syafaat', 'nama')
  textBlob: function (isiText, namaFile) {
    return Utilities.newBlob('')
      .setDataFromString(isiText)
      .setName(namaFile + '.txt')
      .setContentType('plain/text');
  },

  outputText: function (text) {
    return ContentService.createTextOutput(text);
  },

  outputJSON: function (data) {
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  },

  outputHTML: function (text) {
    return HtmlService.createHtmlOutput(text);
  },

  outToJSON: function (data, spasi = 2) {
    return JSON.stringify(data, null, spasi);
  }

}


var Button = {
  text: function (text, data) {
    return {
      'text': text,
      'callback_data': data
    }
  },
  // inline = alias dari text
  inline: function (text, data) {
    return {
      'text': text,
      'callback_data': data
    }
  },
  query: function (text, data) {
    return {
      'text': text,
      'switch_inline_query': data
    }
  },
  url: function (text, url) {
    return {
      'text': text,
      'url': url
    }
  }
}

/**
Fungsi berbagai utilitas
*/
daftar.prototype.util = Utils;

/**
Fungsi berbagai untuk button
*/
daftar.prototype.button = Button;

/**
Fungsi berbagai untuk tombol atau alias button
*/
daftar.prototype.tombol = Button;
