class MenuActive {
    constructor(menuElementID, expandElemId, imgArrowID) {
        this.menuElementID = menuElementID;
        this.expandElemId = expandElemId;
        this.imgArrowID = imgArrowID;
        this.menuElement = document.getElementById(menuElementID);
        this.expandElem = document.getElementById(expandElemId);
        this.imgArrow = document.getElementById(imgArrowID);
    }

    expandMenu() {
        this.menuElement.addEventListener('click', (event) => {
            const coordinates = this.getCoordinateElemMenu(this.menuElement);
            this.toggleImgArrow();
            this.expandElem.style.setProperty('--element-top', coordinates.top);
            this.expandElem.style.setProperty('--element-left', coordinates.left);
            this.expandElem.classList.toggle('show');
        });
    }

    toggleImgArrow() {
        this.imgArrow.src = /icon-arrow-down\.svg/.test(this.imgArrow.src) ? 'images/icon-arrow-up.svg' : 'images/icon-arrow-down.svg';
    }

    getCoordinateElemMenu(element) {
        let c = element.getBoundingClientRect();
        return {
            top: c.top,
            left: c.left,
        };
    }
    hiddenMenu() {
        // Close the dropdown menu if the user clicks outside it
    }
}

const menuActive_features = new MenuActive(
    'featuresElemMenu',
    'featuresDropdown',
    'featuresImgArrow');
const menuActive_company = new MenuActive(
    'companyElemMenu',
    'companyDropdown',
    'companyImgArrow');
menuActive_features.expandMenu();
menuActive_features.hiddenMenu();
menuActive_company.expandMenu();
menuActive_company.hiddenMenu();


