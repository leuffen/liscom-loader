import {ka_create_element} from "@kasimirjs/embed";

const indexName = "liscom_loader_hit_index";
let state = sessionStorage.getItem(indexName);
if (state === null) {
    sessionStorage.setItem(indexName, "0");
}
sessionStorage.setItem(indexName, "" + (parseInt(sessionStorage.getItem(indexName) ?? "0") + 1));

export const hitIndex =  parseInt(sessionStorage.getItem(indexName) ?? "0");

export function initLoader() {
    let interval = setInterval(() => {
        // Detect if body is loaded
        if (document.body) {
            // Cancel interval
            clearInterval(interval);

            let img = document.querySelector("img")?.cloneNode(true) as HTMLImageElement;

            if (img === undefined) {
                console.warn("[liscom-loader] No image found to use as loader.");
                return;
            }
            let loader = ka_create_element("div", {class: "loader"});
            let loaderImg =  ka_create_element("div", {class: "loader-img"}, [img], loader);
            img.setAttribute("class", "");
            img.setAttribute("loading", "eager");

            let loaderBar = ka_create_element("div", {class: "loader-bar"}, [], loader)


            document.querySelector("body").appendChild(loader);
        }
    }, hitIndex === 1 ? 0 : 350); // Wait 350 on subsequent requests to prevent flickering
}


