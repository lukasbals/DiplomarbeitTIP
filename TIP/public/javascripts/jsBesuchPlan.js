DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = function (options) {
    window.location.href = "/detail/detailBesuchPlan?id=" + options.ClientId + "&startDate=" + options.startDate + "&endDate=" + options.endDate;
};
