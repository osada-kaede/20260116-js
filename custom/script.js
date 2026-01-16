const loadingText = document.getElementById('loading-text');
const gaugeBar = document.getElementById('gauge-bar');
const loadingScreen = document.getElementById('loading');

let progress = 0;
let isPaused = false;

function updateLoading() {
    if (progress >= 100) {
        // 完了後、少し余韻をおいてからフェードアウト
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
        }, 300);
        return; 
    }

    let nextStepDelay = 30; // 次の更新までの待ち時間（ミリ秒）

    // --- 区間ごとの速度ロジック ---
    if (progress < 10) {
        // 0~10%: くそ早い
        progress += 2;
        nextStepDelay = 20; 
    } else if (progress < 60) {
        // 11~60%: 少し遅め
        progress += 0.4; 
        nextStepDelay = 40;
    } else if (progress < 94) {
        // 61~94%: 早め
        progress += 1.2;
        nextStepDelay = 20;
    } else if (Math.floor(progress) === 94 || Math.floor(progress) === 95) {
        // 95%: 一時停止（ここで1.2秒ほど粘る）
        if (!isPaused) {
            isPaused = true;
            progress = 95;
            render();
            setTimeout(() => {
                isPaused = false;
                progress = 96;
                updateLoading();
            }, 1200); // 1.2秒停止
            return;
        }
    } else {
        // 96~100%: 鬼早
        progress += 4;
        nextStepDelay = 10;
    }

    render();

    // 次のステップを予約
    if (!isPaused) {
        setTimeout(updateLoading, nextStepDelay);
    }
}

// 描画更新用関数
function render() {
    const displayPercent = Math.min(Math.floor(progress), 100);
    loadingText.textContent = displayPercent + '%';
    gaugeBar.style.width = displayPercent + '%';
}

// 実行
updateLoading();