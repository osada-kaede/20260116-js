/* 雪を降らせる --------------------------------------------- */
const containerSnow = document.querySelector('#particle-container');

const createParticle = () => {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  // ランダムな位置を設定
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.top = `${Math.random() * 100}vh`;

  containerSnow.appendChild(particle);

  // 一定時間後に削除
  setTimeout(() => {
    particle.remove();
  }, 5000); // 5秒後に削除
}

setInterval(createParticle, 200); // 0.2秒ごとに粒子を生成


/* キラキラを散りばめる --------------------------------------------- */
const containerStar = document.querySelector('#star-container');

// SVG を生成して、ランダムな位置 & 大きさで表示する関数
const showRandomSVG = () => {
  // SVG 名前空間
  const svgNS = "http://www.w3.org/2000/svg";

  // SVG 要素を作成
  const svgEl = document.createElementNS(svgNS, "svg");
  // SVG の表示領域(viewBox)やサイズを設定
  svgEl.setAttribute('viewBox', '0 0 40 40');
  svgEl.setAttribute('width', '40');
  svgEl.setAttribute('height', '40');

  // キラキラのパス要素を作成
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute('d', 'M40,20c-13.33,3.68-16.32,6.67-20,20-3.68-13.33-6.67-16.32-20-20C13.33,16.32,16.32,13.33,20,0c3.68,13.33,6.67,16.32,20,20Z');
  // SVG 要素にパスを追加
  svgEl.appendChild(path);

  // ランダム座標 (left, top) を算出
  const maxX = containerStar.clientWidth - 40;  // 40px 分の余白
  const maxY = containerStar.clientHeight - 40;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // 絶対配置用のスタイルを設定
  svgEl.style.left = x + 'px';
  svgEl.style.top = y + 'px';

  // ランダムな拡大縮小用の値を生成 (0.5 ~ 1.2 の間)
  const midScale   = (0.5 + Math.random() * 0.7).toFixed(2);

  // CSS 変数に代入
  svgEl.style.setProperty('--mid-scale', midScale);

  // アニメーション適用用クラスを付与
  svgEl.classList.add('svg-element');

  // コンテナに追加
  containerStar.appendChild(svgEl);

  // アニメーション終了後に要素を削除 (メモリ解放)
  svgEl.addEventListener('animationend', () => {
    containerStar.removeChild(svgEl);
  });
}

// 0.5秒ごとに新しい SVG を出現させる
setInterval(showRandomSVG, 500);