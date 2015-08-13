DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = function (options) {
    console.log(options);
    window.location.href = "http://localhost:3000/detail/detailBesuchPlan?id=" + options.ClientId + "&startDate=" + options.startDate + "&endDate=" + options.endDate;
};
