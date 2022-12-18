class InvoicePositionVO {
    constructor() {
        this.item = '';
        this.cost = '';
        this.qty = '';
        this.total = '';
    }

    setItem(item) {
        this.item = item;
    }
    setCost(cost) {
        this.cost = cost;
    }
    setQty(qty) {
        this.qty = qty;
    }
    setTotal() {
        if (this.cost !== '' && this.qty !== '') {
            this.total = this.cost * this.qty;
        }
    }

}
export default InvoicePositionVO;
