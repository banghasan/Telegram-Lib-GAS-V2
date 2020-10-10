/**
Kelas berbagai utilitas
*/
var Utils = {
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

  random: function () {

    // random(list) : item
    if (arguments.length === 1 && (arguments[0]) instanceof Array) {
      var list = arguments[0];
      return list[Math.floor((Math.random()*list.length))];
    }

    // random(min, max) : integer
    if (arguments.length === 2 && typeof (arguments[0]) === 'number' && typeof (arguments[1]) === 'number' ) {
      var min = arguments[0];
      var max = arguments[1];
      if (max<min) { [min, max] = [max, min]; }
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

  // contoh: var blob = textBlob('Hasanudin H Syafaat', 'nama')
  textBlob: function (isiText, namaFile) {
    return Utilities.newBlob('')
    .setDataFromString(isiText)
    .setName(namaFile + '.txt')
    .setContentType('plain/text');
  },
  
  outputText: function(text) {
    return ContentService.createTextOutput(text);
  },
  
  outputJSON: function(data) {
    return ContentService.createTextOutput(JSON.stringify(data) ).setMimeType(ContentService.MimeType.JSON); 
  },
  
  outputHTML: function(text) {
    return HtmlService.createHtmlOutput(text);
  },
  
  outToJSON: function(data, spasi) {
    spasi = spasi || 2;
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
