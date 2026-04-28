export const cardFuncValidator = (cardNumber: string): boolean => {
    const cardNum = cardNumber.split("").map(Number).reverse()

    const sum = cardNum.reduce((acc, digit, index) => {
       
        if (index % 2 === 1){
            let value = digit * 2;
            
            return acc + (value > 9 ? value - 9 : value);
        }

        return acc + digit;

    })
    
    return sum % 10 === 0;
}