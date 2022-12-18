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
}

export default InvoicePositionView;