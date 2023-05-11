export const validateTextInput = (value: string, reuiredLength: number) => {

    try {
        if(value.length === 0) throw "please provide value";
        if(value.length !==0 && value.length < reuiredLength) {
            throw `you have to use at least ${reuiredLength} characters`
        };
        return value
    }

    catch(error) {
        alert(error);
      }

}