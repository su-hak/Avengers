// // JavaScript 코드를 문서의 로딩이 완료된 후에 실행
// document.addEventListener('DOMContentLoaded', function() {
//     const triggerButton = document.getElementById('fullscreen-trigger');
//     const closeButton = document.getElementById('fullscreen-closed');
//     const overlay = document.getElementById('fullscreen-overlay');

//     triggerButton.addEventListener('click', function() {
//       overlay.style.display = 'block';
//       triggerButton.style.display = 'none';
//     });

//     closeButton.addEventListener('click', function() {
//       overlay.style.display = 'none';
//       triggerButton.style.display = 'block';
//     });
//   });

// 위 내용은 재홍이가 test.js 에 첨부

// 아래는 모달창 띄우기
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal and button elements
  var modal = document.getElementById('fullscreenModal');
  var openModalButton = document.getElementById('openModalButton');
  var mContent = document.getElementById('modalContent');

  // When the user clicks the button, open the modal
  openModalButton.onclick = function() {
      modal.style.display = 'block';
  };

  // When the user clicks on <span> (x), close the modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == mContent) {
          modal.style.display = 'none';
      }
  };
});

