// 작은 화면 메뉴버튼 누를때 메뉴 띄우기
document.addEventListener('DOMContentLoaded', function() {
    const triggerButton = document.getElementById('fullscreen-trigger');
    const closeButton = document.getElementById('fullscreen-closed');
    const overlay = document.getElementById('fullscreen-overlay');

    triggerButton.addEventListener('click', function() {
        overlay.style.display = 'block';
        triggerButton.style.display = 'none';
    });

    closeButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        triggerButton.style.display = 'block';
    });
});


// 공지사항 모달창 띄우기
document.addEventListener('DOMContentLoaded', function() {
    // 모달 관련 선언
    var modal = document.getElementById('fullscreenModal');
    var openModalButton = document.getElementById('openModalButton');
    var mContent = document.getElementById('modal_contents');
    var innerContent = document.getElementById('modal_content');
    var mRightLine = document.getElementById('modal-line-right');
    var mLeftLine = document.getElementById('modal-line-left');

    // 버튼 클릭 시 공기사항 모달창 보이게 하기
    openModalButton.onclick = function() {
        modal.style.display = 'block';
    };

    // 닫기버튼 클릭시 모달창 지우기 // 닫기 버튼 안만들어서 적용안함
    // function closeModal() {
    //   modal.style.display = 'none';
    // }

    // 모달창 클릭시 모당찰 지우기
    window.onclick = function(event) {
        if (event.target == mContent || event.target == innerContent || event.target == mRightLine || event.target == mLeftLine ) {
            modal.style.display = 'none';
        }
    };
});
