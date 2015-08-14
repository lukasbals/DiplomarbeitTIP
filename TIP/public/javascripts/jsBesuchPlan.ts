DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = (options): void => {
  window.location.href = "/detail/detailBesuchPlan?id=" + options.ClientId + "&startDate=" + options.startDate + "&endDate=" + options.endDate;
}
