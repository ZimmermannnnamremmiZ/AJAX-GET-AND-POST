const btn = document.querySelector('.btn-get-posts');
const btnAddPost = document.querySelector('.btn-add-post');
const container = document.querySelector('.container');

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

function createPost(body, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");     
    xhr.addEventListener("load", () => {
        const responce = JSON.parse(xhr.responseText);
        callback(responce);
    });

    // без этого придет только id
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    xhr.addEventListener("error", () => {
        console.log('error')
    })
    xhr.send(JSON.stringify(body));
}

// вынесли 'card' в отдельную функцию
function cardTemplate(post) {
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
    return card;
}


function renderPosts(response) {

    const fragment = document.createDocumentFragment();
    response.forEach(post => {
        const card = cardTemplate(post);
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}

// получение ответа от сервера вне функции
// повесили обработчик событий на кнопку (при клике на которую вызовется getPosts)
btn.addEventListener("click", (e) => {
    getPosts(renderPosts);
});

btnAddPost.addEventListener("click", e => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1,
      };
    createPost(newPost, responce => {
        const card = cardTemplate(responce);
        container.insertAdjacentElement("afterbegin", card);
    });
});