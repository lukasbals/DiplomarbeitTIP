DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = function (options) {
    window.location.href = "/detail/detailBesuch?id=" + options.ClientId + "&startDate=" + options.startDate + "&endDate=" + options.endDate;
};
