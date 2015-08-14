DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = (options): void => {
  window.location.href = "/detail/detailBesuch?id=" + options.ClientId + "&startDate=" + options.startDate + "&endDate=" + options.endDate;
}
