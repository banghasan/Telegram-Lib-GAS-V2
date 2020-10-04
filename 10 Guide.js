/**
 * Prosedur Alur
 */

var Alur = {
    doPost: function(e, debug) {
        debug = debug || false;
        
        if(e.postData.type !== "application/json") {
            return false;
        }

        var update = JSON.parse(e.postData.contents);
        if (update) return update;

        return false;        
    }
}

daftar.prototype.alur   = Alur;
daftar.prototype.doPost = Alur.doPost;