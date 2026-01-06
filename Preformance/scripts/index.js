import SearchBar from "./search.js";
import ProductContainer from "./productContainer.js";

SearchBar.makeSearch(".product-nav");
const products = new ProductContainer(".product-main");
const value = SearchBar.debounce((query) => {products.fetchProductImage(query)},500);
const debounceDeactiveSearchListener = SearchBar.debounce(()=>{deactiveSearchListener()},10000);

let listenActive = false;
let input = document.querySelector("input");

function handleInput(event){
    value(event.target.value);
    debounceDeactiveSearchListener();
}

function activeSearchListener() {
    if (listenActive) return;
    input.addEventListener("input",  handleInput);
    listenActive = true;
    debounceDeactiveSearchListener();
}

function deactiveSearchListener(){
    input.removeEventListener("input", handleInput);
    listenActive = false;
    input = null;
}

activeSearchListener();