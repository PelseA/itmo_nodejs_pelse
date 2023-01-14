class InvoicePositionVO {
    constructor() {
        this.itemName = '';
        this.cost = '';
        this.qty = '';
        this.total = '';
    }

    setItemName(itemName) {
        this.item = itemName;
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
