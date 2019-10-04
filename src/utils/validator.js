export function blockWhiteSpace(e) {
    if(e.which === 32) {
      e.preventDefault();
    }
  }

  export function validator(data) {
    Object.keys(data).map(input => {  
        if (data[input] === "") return "Preencha todos os campos";
    })
  }