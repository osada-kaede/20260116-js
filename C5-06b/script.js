const loadingElement = document.getElementById('loading');

// 進行状況の数値
let progress = 0;

// 10ミリ秒ごとに数値を加算しテキストを更新する
const intervalId = setInterval(() =>{
    progress++;
    loadingElement.textContent = progress + '%';

    // 
    if(progress >= 100){
        clearInterval(intervalId);
        loadingElement.classList.add('fade-out');
    }
},10)