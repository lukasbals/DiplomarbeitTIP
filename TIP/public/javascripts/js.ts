DevExpress.ui.dxScheduler.prototype.showAppointmentPopup = (options): void =>  {
  console.log(options);
  window.location.href = "http://localhost:3000/detail/detailBesuchPlan?id=" + options.ClientId;
}
