
// 스킬 이벤트
function setSkillEvents(skillButton, spellInfo) {
    // 마우스 오버 및 아웃 이벤트 추가
    skillButton.addEventListener('mouseover', function (event) {
        showTooltip(spellInfo, event.pageX, event.pageY);
    });
    skillButton.addEventListener('mouseout', hideTooltip);
}
// 받은 이미지로 spell 정보 받아오기 // 스킬 이미지 및 설명
function setChampSpells(id){
    console.log("setChampSpells 진입성공");
    detailedChamp(id, function(dtch) {
        for(var i=0; i<4; i++){
            var skillButtonId = "skill" + (i + 1);
            var skillImageSrc = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/" + dtch[0].spells[i].id + ".png";

            // 각 스킬 버튼의 id에 해당하는 요소에 이미지를 설정합니다.
            document.getElementById(skillButtonId).style.backgroundImage = "url('" + skillImageSrc + "')";
            // 이미지 및 툴팁 이벤트 추가
            var skillButton = document.getElementById(skillButtonId);
            skillButton.style.backgroundImage = "url('" + skillImageSrc + "')";

            // 툴팁에 표시할 스킬 정보 저장
            var spellInfo = dtch[0].spells[i].description;


            // 각 스킬에 대한 이벤트 설정
            setSkillEvents(skillButton, spellInfo);
        }
    });
}

// 스킬 설명 툴팁
function showTooltip(content, x, y) {
    var tooltip = document.getElementById('tooltip');
    var tooltipContent = document.getElementById('tooltip-content');

    tooltipContent.innerHTML = content;
    tooltip.style.left = x-20 + 'px';
    tooltip.style.top = y-100 + 'px';
    tooltip.style.display = 'block';
}

function hideTooltip() {
    var tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}
