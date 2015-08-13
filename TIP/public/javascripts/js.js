DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = function (options) {
    console.log(options);
    window.location.href = "http://localhost:3000/detail/detailBesuchPlan?id=" + options.ClientId + "&startDate=" + options.startDate + "&endDate=" + options.endDate;
};
var expectFriendNames = function(expectedNames, key) {
  alert("HIER");
  element.all(by.repeater(key + ' in friends').column(key + '.name')).then(function(arr) {
    arr.forEach(function(wd, i) {
      expect(wd.getText()).toMatch(expectedNames[i]);
    });
  });
};
