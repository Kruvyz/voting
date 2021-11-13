function confirmDialog(msg) {
    return new Promise(function (resolve, reject) {
      let confirmed = window.confirm(msg);
  
      return confirmed ? resolve(true) : reject(false);
    });
};

export {
    confirmDialog
}