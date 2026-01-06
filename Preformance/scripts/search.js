export default class SearchBar {
    constructor(){
    }

    static makeSearch(targetSelector){
        const containerToQuery = document.querySelector(targetSelector);
        const queryContainer = document.createElement("div");
        queryContainer.innerHTML = "<input>";
        containerToQuery.appendChild(queryContainer);
    }

    static debounce(func,timer) {
        let debounceTimer;

        return (...args) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(()=>{
                func(...args)
                debounceTimer = null;
            },timer);
        }
    }
}
