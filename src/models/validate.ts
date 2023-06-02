export const validateTextInput = (value: string, property: string, reuiredLength: number) => {

    try {
        if(value.length === 0) throw "please provide value";
        if(value.length !==0 && value.length < reuiredLength) {
            throw `you have to use at least ${reuiredLength} characters for the ${property}`
        };
        return value
    }

    catch(error) {
        alert(error);
      }

}