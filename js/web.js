// 이미지를 클릭하면 전체 화면 창을 나타내는 함수
document.getElementById('fullscreen-trigger').addEventListener('click', function() {
    var overlay = document.getElementById('fullscreen-overlay');
    overlay.style.display = 'block'; // 화면에 보이도록 변경
    setTimeout(function() {
        overlay.style.opacity = 1; // 천천히 나타나도록 변경
    }, 10);
});

// 전체 화면 창을 클릭하면 창을 닫는 함수
document.getElementById('fullscreen-overlay').addEventListener('click', function() {
    var overlay = document.getElementById('fullscreen-overlay');
    overlay.style.opacity = 0; // 천천히 사라지도록 변경
    setTimeout(function() {
        overlay.style.display = 'none'; // 화면에서 숨김
    }, 500); // 0.5초 후에 실행 (opacity transition 시간과 동일하게 설정)
});