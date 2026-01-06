export default class ProductContainer {
    #activeSearch = null;
    constructor(select){
        this.select = document.querySelector(select)
    }

    async fetchProductImage(query){
        if (this.#activeSearch){
           this.#activeSearch.abort()
        }

        this.#activeSearch = new AbortController();
        try{
            this.select.replaceChildren();
            const data = await fetch(`https://images-api.nasa.gov/search?q=${query}`,{signal:this.#activeSearch.signal});
            const data_json = await data.json();
            this.#render(data_json.collection.items)
        } catch(error) {
            console.error(error);
            throw error;
        } finally {
            this.#activeSearch = null;
        }
    }

    #render(items){
        let frg = document.createDocumentFragment();

        items.forEach(item => {
            if(!item.links) return;
            const product_card = document.createElement("div");
            product_card.innerHTML = `<img src="${item.links[0].href}" loading="lazy"><h1>Center: ${item.data[0].center}</h1>`;
            frg.appendChild(product_card);
        });
        this.select.appendChild(frg);
    }
}
