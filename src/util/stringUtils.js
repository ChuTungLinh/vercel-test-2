
export const convertToMoney = (number) => {
    return parseInt(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}