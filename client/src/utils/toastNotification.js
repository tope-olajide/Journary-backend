import toastr from 'toastr'
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-left",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "2000",
        "timeOut": "6000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
export default (toastType, toastMessage) => {
  toastr[toastType](toastMessage);
};
