export const validateTextInput = (value: string, property: string, reuiredLength: number) => {

    try {
        if(value.length === 0) throw `please provide ${property}`;
        if(value.length !==0 && value.length < reuiredLength) {
            throw `you have to use at least ${reuiredLength} characters for the ${property}`
        };
        return value
    }

    catch(error) {
        alert(error);
      }

}

export const validateNumberInput = (value: number, maxAmount: number) => {

    try {
        if(value <= 0 ) throw "please enter number";
        if(value > maxAmount) {
            throw `you have to provide a number less than ${maxAmount}`
        };
        return value
    }

    catch(error) {
        alert(error);
      }

}