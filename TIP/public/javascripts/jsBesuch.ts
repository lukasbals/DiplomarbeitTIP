DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = (options): void => {
  //alert(options.IdGeschaeftspartner);
  window.location.href = "/detail/detailBesuch?id=" + options.ClientId + "&startDate=" + options.startDate + "&endDate=" + options.endDate + "&IdGeschaeftspartner=" + options.IdGeschaeftspartner;
}
