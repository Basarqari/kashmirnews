import tabList from './components/tabList';
const container = document.querySelector('.news');

if (localStorage.getItem("news")) {
    var markup = tabList(localStorage.getItem("news"))
    container.innerHTML = markup;
}
getNews();


function getNews() {
    fetch("http://kashmirnews.herokuapp.com/api/all")
        .then(blob => blob.json())
        .then(json => {
            localStorage.setItem("news", JSON.stringify(json))
            return json
        })
        .then(() => tabList(localStorage.getItem("news")))
        .then(markup => container.innerHTML = markup);
}

