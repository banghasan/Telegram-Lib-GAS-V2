/**
* Kelas untuk Script Properti
* @type {Class} klass utama
*/
var script = class scriptProperties {
  /**
*initialize constructor
*/
  constructor() {
    this.service = PropertiesService.getScriptProperties();
  }

  setValue(kunci, nilai) {
    // contoh: setValue('token', '123:xxxx');
    return this.service.setProperty(kunci, nilai);
  }

  setValues(data) {
    // contoh {nickname: 'Bob', region: 'US', language: 'EN'};
    return this.service.setProperties(data);
  }

  getValue(kunci) {
    // contoh: getValue('token');
    return this.service.getProperty(kunci);
  }

  getValues() {
    return this.service.getProperties();
  }

  getKeys() {
    return this.service.getKeys();
  }

  delete(kunci) {
    return this.service.deleteProperty(kunci);
  }

  deleteAll() {
    return this.service.deleteAllProperties();
  }
}
