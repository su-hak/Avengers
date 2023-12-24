// 스킬 정보 업데이트 --------------------
// 받은 이미지로 spell 정보 받아오기 // 스킬 이미지 및 설명
function setChampSpells(id) {
  console.log("setChampSpells 진입성공");
  detailedChamp(id, function (dtch) {
      for (var i = 0; i < 4; i++) {
          var skillButtonId = "skill" + (i + 1); // 스킬버튼 id
          var skillInputId = "left-skill" + (i + 1) + "-num"; // 스킬 레벨 표시 id 변수선언
          var skillLevelInput = document.getElementById(skillInputId);
          var skillImageSrc = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/" + dtch[0].spells[i].id + ".png";   // 각 스킬 이미지
          var skillDescription = dtch[0].spells[i].description; // 스킬 설명 정보 추가

          console.log ("챔피언 스킬정보 불러오기 성공 : " + skillButtonId + skillInputId + skillLevelInput + skillImageSrc + skillDescription);

          // 스킬 이미지 및 설명 설정
          if (skillImageSrc) {
              document.getElementById(skillButtonId).style.backgroundImage = "url('" + skillImageSrc + "')";
          } else {
              // 챔피언 이미지가 없는 경우 해당 input의 값을 0으로 설정
              skillLevelInput.value = 0;
          }

          // 스킬 정보 불러올 때 스킬 레벨을 1로 설정
          skillLevelInput.value = 1;

          // 각 스킬 버튼에 대한 Popover 제거
          $("#" + skillButtonId).popover('dispose');

          // 각 스킬 버튼에 대한 Popover 설정
          $("#" + skillButtonId).popover({
              placement: "bottom",
              trigger: "hover",
              content: skillDescription
          });
      }
  });
}

// 스킬 레벨 업 다운 버튼  --------------------
document.addEventListener("DOMContentLoaded", function () {
  for (var i = 1; i <= 4; i++) {
      setupSkillControls(i);
  }
});

function setupSkillControls(skillIndex) {
  var skillInputId = "left-skill" + skillIndex + "-num";
  var skillLevelInput = document.getElementById(skillInputId);

  // 레벨 다운 버튼 이벤트 처리
  document.getElementById("left-skill" + skillIndex + "-numDown").addEventListener("click", function () {
      if (skillLevelInput.value > 0) {
          skillLevelInput.value = parseInt(skillLevelInput.value) - 1;
      }
  });

  // 레벨 업 버튼 이벤트 처리
  document.getElementById("left-skill" + skillIndex + "-numUp").addEventListener("click", function () {
      if (skillLevelInput.value < parseInt(skillLevelInput.getAttribute("max"))) {
          skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
      }
  });
}
// 스킬 레벨 업 다운 버튼 E --------------------
// 스킬 정보 업데이트 E ------------------------------