export default {
    mutations: {
        openPopup(state, popupContent) {
            state.isOpenPopup = true
            state.popupContent = popupContent
        },
        closePopup(state) {
            state.isOpenPopup = false
        },
        open(state, popup){
            state.activePopup = popup
            state.isOpen = true
        },
        close(state){
            state.isOpen = false
            state.activePopup = null
        }
    },
    state: {
        isOpenPopup: false,
        popupContent: '',
        isOpen: false,
        activePopup: null
    },
    getters: {
        getIsOpenPopup: state => state.isOpenPopup,
        getPopupContent: state => state.popupContent,
        getIsOpen: state => state.isOpen,
        getActivePopup: state => state.activePopup
    }
}