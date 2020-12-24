function getPosts() {
    // некие настройки будущего запроса
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

    // подписываемся на событие загрузки и получения данных от сервера     
    xhr.addEventListener("load", () => {

    });

    //подписка на события Error
    xhr.addEventListener("error", () => {
        console.log('error', )
    })

    // отправка запроса
    xhr.send();
}