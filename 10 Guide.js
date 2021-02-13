/**
 * Prosedur Alur
 */

var Alur = {
    doPost: function (e) {
  
      if (e.postData.type == "application/json") {
        var update = JSON.parse(e.postData.contents);
        if (update) return update;
      }
  
      return false;
    }
  }
  
  daftar.prototype.alur = Alur;
  daftar.prototype.doPost = Alur.doPost;