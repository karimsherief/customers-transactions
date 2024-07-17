const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency'
})
export function formatCurrency(price: number) {
    return CURRENCY_FORMATER.format(price)

}