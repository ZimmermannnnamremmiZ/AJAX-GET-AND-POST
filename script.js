const btn = document.querySelector('button');


// т.к. действие асинхронное, создаем callback
function getPosts(callback) {
    // некие настройки будущего запроса
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

    // подписываемся на событие загрузки и получения данных от сервера     
    xhr.addEventListener("load", () => {
        // перевод ответа от сервера в массив
        const responce = JSON.parse(xhr.responseText);
        console.log(responce);
        callback(responce);
    });



    //подписка на события Error
    xhr.addEventListener("error", () => {
        console.log('error')
    })

    // отправка запроса
    xhr.send();
}

// получение ответа от сервера вне функции
// повесили обработчик событий на кнопку (при клике на которую вызовется getPosts)
btn.addEventListener("click", (e) => {
    getPosts(response => {
        console.log(response)
    });
});