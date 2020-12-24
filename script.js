const btn = document.querySelector('button');
const countainer = document.querySelector('.countainer');

// т.к. действие асинхронное, создаем callback
function getPosts(callback) {
    // некие настройки будущего запроса
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

    // подписываемся на событие загрузки и получения данных от сервера     
    xhr.addEventListener("load", () => {
        // перевод ответа от сервера в массив
        const responce = JSON.parse(xhr.responseText);
        callback(responce);
    });



    //подписка на события Error
    xhr.addEventListener("error", () => {
        console.log('error')
    })

    // отправка запроса
    xhr.send();
}

function renderPosts(response) {

    const fragment = document.createDocumentFragment();
    response.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = post.title;
        const article = document.createElement("p");
        article.classList.add("card-text");
        article.textContent = post.body;
        cardBody.appendChild(title);
        cardBody.appendChild(article);
        card.appendChild(cardBody);
        fragment.appendChild(card);
    });
    countainer.appendChild(fragment);
}

// получение ответа от сервера вне функции
// повесили обработчик событий на кнопку (при клике на которую вызовется getPosts)
btn.addEventListener("click", (e) => {
    getPosts(renderPosts);
});
