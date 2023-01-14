class InvoicePositionView {
    static createSimpleViewFromVO(index, vo) {
        return `
            <hr>
            <div class="flex flex-row">
                <div class="basis-1/2">
                    <div>Design services</div>
                    <span class="text-gray-300">20% initial free</span>
                </div>
                <div class="flex flex-row basis-1/2">
                    <div class="basis-1/4">
                        <span>$5000</span>
                    </div>
                    <div class="basis-1/4">
                        <span>1</span>
                    </div>
                    <div class="basis-1/2 text-right">$5000</div>
                </div>
            </div>
        `;
    }

    /* nextDataOrderNumber - следующий номер для атрибута data-order-number **/
    static getNewItemHTML(nextDataOrderNumber) {
        return `
            <hr>
            <div class="flex flex-row">
            <div class="basis-1/2 flex flex-col">
              <input data-order-number="${nextDataOrderNumber}" placeholder="Enter service name..." type="text">
              <span class="text-gray-300">20% initial free</span>
            </div>
            <div class="flex flex-row basis-1/2">
              <div class="basis-1/4">
                <input id="inputServiceCost" placeholder="0000" type="text">
              </div>
              <div class="basis-1/4">
                <input id="inputServiceQty" placeholder="0" type="text">
              </div>
              <div class="basis-1/2 text-right">$5000</div>
            </div>
          </div>
        `;
    }
}

export default InvoicePositionView;