import { useToast } from "vue-toastification";

const toast = useToast();

export function useToastAlert() {
  
    const warningToast = (text, position) => {
        toast(text, {
            toastClassName: "warning-toast",
            bodyClassName: "warning-toast-body",
            position: position,
            icon: false,
            closeButton: false,  
            hideProgressBar: true,
        });
    };

    //error
    const errorToast = (text, position) => {
        toast(text, {
            toastClassName: "error-toast",
            bodyClassName: "error-toast-body",
            position: position,
            timeout: 3000,
            icon: false,
            closeButton: false,  
            hideProgressBar: true,
        });
    };
 
    return { warningToast, errorToast};
  }