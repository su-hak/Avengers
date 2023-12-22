// 파일경로
const filePath = 'champions.json';
let championsArray;
let selectedChampionImg; // 선택한 챔피언 이미지 요소를 저장하는 변수

// Ajax를 사용하여 파일을 받아오는 함수
function getFile(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(new Error('파일을 받아오는 중 오류 발생'), null);
            }
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

// 파일을 받아와서 배열에 저장하는 함수
function saveFileToArray(filePath, callback) {
    getFile(filePath, function (error, fileContent) {
        if (error) {
            callback(error, null);
        } else {
            try {
                const jsonData = JSON.parse(fileContent);
                callback(null, jsonData);
            } catch (jsonError) {
                callback(jsonError, null);
            }
        }
    });
}

// 파일을 받아와서 배열에 저장하는 예제 호출
saveFileToArray(filePath, function (error, jsonData) {
    if (error) {
        console.error('파일 받아오기 중 오류:', error);
    } else {
        championsArray = Object.values(jsonData); // jsonData의 값들을 배열로 변환하여 저장
        console.log(championsArray);
        console.log(championsArray[49].abilities.Q[0].effects[1].leveling[0].modifiers[0].values[0]);
        console.log(championsArray[49].abilities.W[0].effects[0].leveling[0].modifiers[0].values[0]);
        console.log(championsArray[49].abilities.E[0].effects[1].leveling[0].modifiers[0].values[0]);
        console.log(championsArray[49].abilities.R[0].effects[1].leveling[0].modifiers[0].values[0]);
    }
});

// createBoxes() 함수 내에 다음 코드를 추가해주세요.
function createBoxes() {
    const championContainer = document.querySelector('.champion-container');
    const damageLogElement = document.getElementById('damage-log');
    damageLogElement.innerHTML = '';

    totalDamage = 0;
    championContainer.innerHTML = ''; // 기존 챔피언 이미지를 초기화

    if (championsArray) {
        for (let i = 0; i < championsArray.length; i++) {
            const champion = championsArray[i];
            const championBox = document.createElement('div');
            championBox.classList.add('champion-box');

            const championImg = document.createElement('img');
            championImg.src = champion.icon;
            championImg.alt = champion.name;
            championImg.classList.add('champion-img');

            championBox.appendChild(championImg);
            championContainer.appendChild(championBox);

            championImg.addEventListener('click', function () {
                showSelectedChampion(championImg, i);
            });
        }
    }
}


// 이미지 선택 버튼 이벤트 리스너 등록 다시 클릭가능하게
const championButton = document.getElementById('right-champ-dropdown');
championButton.addEventListener('click', function() {
    const championContainer = document.querySelector('.champion-container');
    const allImages = document.querySelectorAll('.champion-container img');

    if (championContainer.style.display === 'none') {
        championContainer.style.display = 'grid';
        allImages.forEach(function(image) {
            image.style.display = 'block';
        });
    } else {
        championContainer.style.display = 'none';
    }
});

// 전역 변수로 index 선언
let index;

// 이미지 선택 후 실행되는 함수
function showSelectedChampion(championImg, selectedIndex) {
// index 변수에 값을 저장
    index = selectedIndex;
    const champButton = document.getElementById('right-champ-dropdown');
    const championContainer = document.querySelector('.champion-container');
    const allImagesContainer = document.querySelector('.all-images-container');
// 공격력 표시
    const attackDamageElement = document.getElementById('attack-damage');
    attackDamageElement.textContent = championsArray[index].stats.attackDamage.flat;


// 선택한 이미지 표시
    champButton.style.backgroundImage = `url(${championImg.src})`;
    champButton.style.backgroundSize = 'cover';
    champButton.style.backgroundPosition = 'center';
    champButton.style.backgroundRepeat = 'no-repeat';
    champButton.innerHTML = '';

// .all-images-container 숨기기
    allImagesContainer.style.display = 'none';

// .champion-container 숨기기
    championContainer.style.display = 'none';

// Q, W, E, R 버튼에 아이콘 설정
    const skill0Button = document.getElementById('skill0');
    skill0Button.innerHTML = '';
    skill0Button.style.backgroundImage = `url(${championsArray[index].abilities.P[0].icon})`;
    skill0Button.style.backgroundSize = 'cover';
    skill0Button.style.backgroundPosition = 'center';
    skill0Button.style.backgroundRepeat = 'no-repeat';

    const skill1Button = document.getElementById('skill1');
    skill1Button.innerHTML = '';
    skill1Button.style.backgroundImage = `url(${championsArray[index].abilities.Q[0].icon})`;
    skill1Button.style.backgroundSize = 'cover';
    skill1Button.style.backgroundPosition = 'center';
    skill1Button.style.backgroundRepeat = 'no-repeat';

    const skill2Button = document.getElementById('skill2');
    skill2Button.innerHTML = '';
    skill2Button.style.backgroundImage = `url(${championsArray[index].abilities.W[0].icon})`;
    skill2Button.style.backgroundSize = 'cover';
    skill2Button.style.backgroundPosition = 'center';
    skill2Button.style.backgroundRepeat = 'no-repeat';

    const skill3Button = document.getElementById('skill3');
    skill3Button.innerHTML = '';
    skill3Button.style.backgroundImage = `url(${championsArray[index].abilities.E[0].icon})`;
    skill3Button.style.backgroundSize = 'cover';
    skill3Button.style.backgroundPosition = 'center';
    skill3Button.style.backgroundRepeat = 'no-repeat';

    const skill4Button = document.getElementById('skill4');
    skill4Button.innerHTML = '';
    skill4Button.style.backgroundImage = `url(${championsArray[index].abilities.R[0].icon})`;
    skill4Button.style.backgroundSize = 'cover';
    skill4Button.style.backgroundPosition = 'center';
    skill4Button.style.backgroundRepeat = 'no-repeat';

//럭스
// Q 스킬 데미지 출력
    const LuxQ = document.querySelector('#skill1 + button + button + button + button + button + p');
    const LuxQDamage = (index === 74) ? championsArray[index].abilities.Q[0].effects[0].leveling[0].modifiers[0].values[0] : '';
    const LuxQPercent = (index === 74) ? championsArray[index].abilities.Q[0].effects[0].leveling[0].modifiers[1].values[0] : '';
    const LuxQADorAP = (index === 74) ? championsArray[index].abilities.Q[0].effects[0].leveling[0].modifiers[1].units[0] : '';


// Q 스킬 데미지 레벨별 업데이트
// 스킬 레벨별 버튼 선언
    const QSkillLevelButtons = document.querySelectorAll("#skill1-level1, #skill1-level2, #skill1-level3, #skill1-level4, #skill1-level5");
// 현재 레벨 1
    let QcurrentLevel = 1; // Set initial level

// 스클레벨별 버튼 클릭시 데미지 불러오기
    QSkillLevelButtons.forEach(button => {
        button.addEventListener("click", function () {
            QcurrentLevel = parseInt(button.innerText); // Get the level from the button text
            updateLuxQDamage();
        });
    });

// 스킬Q 레벨별 데이지 업데이트
    function updateLuxQDamage() {
        const LuxQDamage = (index === 74) ? championsArray[index].abilities.Q[0].effects[0].leveling[0].modifiers[0].values[QcurrentLevel - 1] : '';

        LuxQ.innerHTML = (index === 74)
            ? `빛의 속박<br>
        지정한 위치에 빛의 구체를 발사하여 최대 2명의 적에게 피해를 입힙니다.<br>적은 <span style="color: rebeccapurple;">${LuxQDamage}</span> <span style="color: red;">(+${LuxQPercent}${LuxQADorAP})</span>의 마법 피해를 입고 2초동안 속박당합니다. (사정거리: 1000)`
            : '';
    }

// 럭스 Q스킬 데미지 업데이트
    updateLuxQDamage();


// W 스킬 데미지 출력
    const LuxW = document.querySelector('#skill2 + button + button + button + button + button + p');
    const LuxWShield = (index === 74) ? championsArray[index].abilities.W[0].effects[0].leveling[0].modifiers[0].values[0] : '';
    const LuxWPercent = (index === 74) ? championsArray[index].abilities.W[0].effects[0].leveling[0].modifiers[1].values[0] : '';
    const LuxWADorAP = (index === 74) ? championsArray[index].abilities.W[0].effects[0].leveling[0].modifiers[1].units[0] : '';

// W 스킬 데미지 레벨별 업데이트
// 스킬 레벨별 버튼 선언
    const WSkillLevelButtons = document.querySelectorAll("#skill2-level1, #skill2-level2, #skill2-level3, #skill2-level4, #skill2-level5");
// 현재 레벨 1
    let WcurrentLevel = 1; // Set initial level

// 스클레벨별 버튼 클릭시 데미지 불러오기
    WSkillLevelButtons.forEach(button => {
        button.addEventListener("click", function () {
            WcurrentLevel = parseInt(button.innerText); // Get the level from the button text
            updateLuxWDamage();
        });
    });

// 스킬W 레벨별 데이지 업데이트
    function updateLuxWDamage() {
        const LuxWShield = (index === 74) ? championsArray[index].abilities.W[0].effects[0].leveling[0].modifiers[0].values[WcurrentLevel - 1] : '';

        LuxW.innerHTML = (index === 74)
            ? `프리즘 보호막<br>
럭스가 지정한 위치에 부메랑처럼 돌아오는 마법봉을 던져 <br>자신과 봉에 맞은 아군 챔피언을 2.5초 동안 <span style="color: chartreuse;">${LuxWShield}</span> <span style="color: red;">(+${LuxWPercent}${LuxWADorAP})</span>의 피해로부터 보호합니다. (사정거리: 1000)`
            : '';
    }

// 럭스 W스킬 데미지 업데이트
    updateLuxWDamage();

// E 스킬 데미지 출력
    const LuxE = document.querySelector('#skill3 + button + button + button + button + button + p');
    const LuxESlow = (index === 74) ? championsArray[index].abilities.E[0].effects[0].leveling[0].modifiers[0].values[0] : '';
    const LuxEDamage = (index === 74) ? championsArray[index].abilities.E[0].effects[2].leveling[0].modifiers[0].values[0] : '';
    const LuxEPercent = (index === 74) ? championsArray[index].abilities.E[0].effects[2].leveling[0].modifiers[1].values[0] : '';
    const LuxEADopAP = (index === 74) ? championsArray[index].abilities.E[0].effects[2].leveling[0].modifiers[1].units[0] : '';


// E 스킬 데미지 레벨별 업데이트
// 스킬 레벨별 버튼 선언
    const ESkillLevelButtons = document.querySelectorAll("#skill3-level1, #skill3-level2, #skill3-level3, #skill3-level4, #skill3-level5");
// 현재 레벨 1
    let EcurrentLevel = 1; // Set initial level

// 스클레벨별 버튼 클릭시 데미지 불러오기
    ESkillLevelButtons.forEach(button => {
        button.addEventListener("click", function () {
            EcurrentLevel = parseInt(button.innerText); // Get the level from the button text
            updateLuxEDamage();
        });
    });

// 스킬E 레벨별 데이지 업데이트
    function updateLuxEDamage() {
        const LuxEDamage = (index === 74) ? championsArray[index].abilities.E[0].effects[2].leveling[0].modifiers[0].values[EcurrentLevel - 1] : '';

        LuxE.innerHTML = (index === 74)
            ? `광휘의 특이점<br>
적 유닛의 속도를 ${LuxESlow}% 느리게 하는 지역을 조성합니다(지속 시간 5초).<br>스킬을 다시 사용하여 적에게 <span style="color: rebeccapurple;">${LuxEDamage}</span> <span style="color: red;">(+${LuxEPercent}${LuxEADopAP})</span>의 마법 피해를 즉시 입힐 수도 있습니다. (사정거리: 1100, 범위: 310)`
            : '';
    }

// 럭스 E스킬 데미지 업데이트
    updateLuxEDamage();

// R 스킬 데미지 출력
    const LuxR = document.querySelector('#skill4 + button + button + button + p');
    const LuxRDamage = (index === 74) ? championsArray[index].abilities.R[0].effects[0].leveling[0].modifiers[0].values[0] : '';
    const LuxRPercent = (index === 74) ? championsArray[index].abilities.R[0].effects[0].leveling[0].modifiers[1].values[0] : '';
    const LuxRADorAP = (index === 74) ? championsArray[index].abilities.R[0].effects[0].leveling[0].modifiers[1].units[0] : '';


// R 스킬 데미지 레벨별 업데이트
// 스킬 레벨별 버튼 선언
    const RSkillLevelButtons = document.querySelectorAll("#skill4-level1, #skill4-level2, #skill4-level3");
// 현재 레벨 1
    let RcurrentLevel = 1; // Set initial level

// 스클레벨별 버튼 클릭시 데미지 불러오기
    RSkillLevelButtons.forEach(button => {
        button.addEventListener("click", function () {
            RcurrentLevel = parseInt(button.innerText); // Get the level from the button text
            updateLuxRDamage();
        });
    });

// 스킬R 레벨별 데이지 업데이트
    function updateLuxRDamage() {
        const LuxRDamage = (index === 74) ? championsArray[index].abilities.R[0].effects[0].leveling[0].modifiers[0].values[RcurrentLevel - 1] : '';

        LuxR.innerHTML = (index === 74)
            ? `최후의 섬광<br>
눈부신 광선을 소환하여 일직선 상에 있는 모든 적에게 <span style="color: rebeccapurple;">${LuxRDamage}</span> <span style="color: red;">(+${LuxRPercent}${LuxRADorAP})</span>의 마법 피해를 입힙니다.<br>
최후의 섬광은 광채 효과를 점화시키며 재적용시킵니다. (사정거리: 3340)`
            : '';
    }

// 럭스 R스킬 데미지 업데이트
    updateLuxRDamage();
}
/!*데미지 로그 뜨는거*!/
let totalDamage = 0;

// Basic Attack 버튼 클릭 이벤트에 함수 등록
const basicAttackButton = document.querySelector('.BasicAttack button');
basicAttackButton.addEventListener('click', function () {
    calculateBasicAttackDamage();
});

// Basic Attack 데미지 계산 함수
function calculateBasicAttackDamage() {
    // 방어력 값 가져오기
    const armorValue = parseInt(document.getElementById('armor').value);

    // Basic Attack 데미지 계산
    const basicAttackDamage = calculateBasicAttack(armorValue);

    // 데미지 로그 업데이트
    const damageLogElement = document.getElementById('damage-log');
    damageLogElement.innerHTML += `(Basic Attack)${basicAttackDamage}의 데미지를 입혔습니다.`;

    // 합계 업데이트
    updateTotalDamage(parseFloat(basicAttackDamage));
}

// Basic Attack 데미지를 계산하는 함수
function calculateBasicAttack(armor) {
    const attackDamage = parseFloat(championsArray[index].stats.attackDamage.flat);
    const armorReduction = 100 / (100 + armor);
    const calculatedDamage = attackDamage * armorReduction;
    return calculatedDamage.toFixed(2); // 소수점 2자리까지 표시
}

// 각 스킬 버튼 요소를 가져오기
const qSkillButton = document.getElementById('skill1');
const wSkillButton = document.getElementById('skill2');
const eSkillButton = document.getElementById('skill3');
const rSkillButton = document.getElementById('skill4');

// 각 스킬 버튼 클릭 이벤트에 함수 등록
qSkillButton.addEventListener('click', function () {
    recordSkillDamage('Q');
});

wSkillButton.addEventListener('click', function () {
    recordSkillDamage('W');
});

eSkillButton.addEventListener('click', function () {
    recordSkillDamage('E');
});

rSkillButton.addEventListener('click', function () {
    recordSkillDamage('R');
});

// 스킬 데미지 기록 함수
function recordSkillDamage(skillName) {
// 해당 스킬의 데미지 값을 가져오기
    const skillDamageElement = document.getElementById(`${skillName.toLowerCase()}-skill-damage`);

    if (skillDamageElement) {
// 스킬 데미지의 span 태그 가져오기
        const skillDamageSpan = skillDamageElement.querySelector('span');

        if (skillDamageSpan) {
// span 태그의 color 속성 값 가져오기
            const color = skillDamageSpan.style.color;
            const damageLogElement = document.getElementById('damage-log');

// 데미지 로그 업데이트
            if (color === 'rebeccapurple') {
                const skillDamageValue = parseFloat(skillDamageSpan.textContent);
                damageLogElement.innerHTML += `(${skillName})${skillDamageValue}의 데미지를 입혔습니다. `;
                updateTotalDamage(skillDamageValue);
            } else {
                damageLogElement.innerHTML += `(${skillName})0의 데미지를 입혔습니다.<br>`;
            }
        } else {
            console.error(`스킬 ${skillName}의 데미지 표시 span 요소를 찾을 수 없습니다.`);
        }
    } else {
        console.error(`스킬 ${skillName}의 데미지 표시 요소를 찾을 수 없습니다.`);
    }
}

// 전체 데미지 합계 업데이트 함수
function updateTotalDamage(damage) {
    totalDamage += damage;

// 합계 업데이트
    const damageLogElement = document.getElementById('damage-log');
    damageLogElement.innerHTML += ` 합계: ${totalDamage.toFixed(2)}<br>`;
}

// 초기화 버튼 클릭 시 결과 초기화
function resetDamageRecord() {
    const attackDamageElement = document.getElementById('attack-damage');
    const damageLogElement = document.getElementById('damage-log');

    attackDamageElement.textContent = '0';
    damageLogElement.innerHTML = '';
}

//허수아비
function checkMaxValue(inputId, maxValue) {
    const inputElement = document.getElementById(inputId);
    const inputValue = parseInt(inputElement.value);

    if (inputValue > maxValue) {
        // 최대값을 초과하는 경우 현재 입력값을 최대값으로 설정
        inputElement.value = maxValue;
    }
}

//스탯정보
document.getElementById('magic-damage').innerText = '0';
document.getElementById('Physical-Penetration').innerText = '0';
document.getElementById('Armor-Penetration').innerText = '0';
document.getElementById('Magic-Penetration').innerText = '0';
document.getElementById('Magic-PenetrationPercent').innerText = '0';
