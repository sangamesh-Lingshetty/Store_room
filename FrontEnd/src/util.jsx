import {toast} from "react-toastify";

export const handlesuccess =(msg)=>{

   
    const successaudio = new Audio("/mixkit-software-interface-start-2574.wav");
    successaudio.play();



    toast.success(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
    })
}

export const handleerror =(msg)=>{

    const errorAudio = new Audio("/error-126627.mp3");
    errorAudio.play();

    toast.error(msg,{
        position: "top-left",
    })
}