import {YtResponse} from "@app/models/YtResponse";
import Swal from "sweetalert2";

export default class AppUtills  { 

  static parseResponse  (response: YtResponse) {
    if(response!=null && response.response!=undefined)
    return response.response;

    return null;
  }

  static createSuccessAlert  (message: string,timer:number) {
    if(timer==null)
      timer=6000;

      Swal.fire({
        icon: 'success', 
        text: message,   
        showConfirmButton: false,
        timer: timer
      })
  }

  static createFailureAlert  (message: string,timer:number,) {
    if(timer==null)
      timer=3000;

    Swal.fire({
      icon: 'error', 
      text: message,   
      showConfirmButton: false,
      timer: timer
    })
}
    
}
 