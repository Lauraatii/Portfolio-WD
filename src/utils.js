export function validateUsername(input) {
    const usernameRegex = /^[a-zA-Z]{3,10}$/;
  
    if (input === "" || input === undefined || input === null) {
      return false;
    } else {
      return usernameRegex.test(input);
    }
  }
  
  export function validateEmail(input) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (input === "" || input === undefined || input === null) {
      return false;
    } else {
      return emailRegex.test(input);
    }
  }
  
  export function validatePassword(input) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  
    if (input === "" || input === undefined || input === null) {
      return false;
    } else {
      return passwordRegex.test(input);
    }
  }
  
  export function validateName(input){
    if (input === "" || input === undefined || input === null) {
      return false;
    } else {
      return true
    }
  }

  export function validateDesc(input){
    if (input === "" || input === undefined || input === null) {
      return false;
    } else {
      return true
    }
  }