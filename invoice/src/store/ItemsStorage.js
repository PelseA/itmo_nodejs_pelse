import InvoicePositionVO from "../model/vos/InvoicePositionVO.js";

class ItemsStorage {
    getExistItemsOrEmptyArr() {
        const res = JSON.parse(localStorage.getItem("itemsArr")) || [];
        console.log(typeof res); // объект
        console.log(res); // [{...}, {...}, {...}]
        return res;
    }

    saveNewItem(itemName, cost, qty, itemsArr) {
        let newItems = new InvoicePositionVO();
        newItems.setItemName(itemName);
        newItems.setCost(cost);
        newItems.setQty(qty);
        itemsArr.push(newItems);
        localStorage.setItem(itemsArr, JSON.stringify(itemsArr));
    }
}

export default ItemsStorage;

