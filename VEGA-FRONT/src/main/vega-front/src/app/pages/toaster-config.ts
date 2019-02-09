import { ToasterConfig } from "angular2-toaster";

export const TOASTER_CONFIG:ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss:true,
    preventDuplicates:false,
    animation: 'flyRight',
    limit: 5,
  });