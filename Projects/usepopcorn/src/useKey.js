import {useEffect} from "react";

export function useKey(key, action){
    useEffect(function(){
    function callback(e){
        if(e.key.toLowerCase() === key.toLowerCase())
        {
        action();
        }
    }
    document.addEventListener('keydown',callback);
    // the reason for cleaning the event listener is that the eventlistener will be created on every movie.
    return function(){
        document.removeEventListener('keydown', callback);
    }
    },[action, key]);
}