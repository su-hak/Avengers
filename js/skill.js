// HTML 테이블에서 stat_value의 값을 가져와 배열에 넣는 함수
// HTML 테이블에서 stat_value, left-rsc-value, left-hp-value의 값을 가져와 배열에 넣는 함수

function calculateDamage(championName, skillIndex, level, values, valuesR, ) {
    const logPan = document.getElementById('left-log_pan');
    const Magic_Penetration = values[7].match(/\((.*?)\)/)[1];
    let championIndex = 0;
    console.log("재재재재재재재ㅐ재재재재재재" + championIndex);
    console.log("ㅂㅈㅇㅈㅂㅈㅂㅇㅈㅂㅇㅈ");

    console.log("선택한 챔프 :::",championName);
    let damageText = "";
    if(championName === "Lux"){
        championIndex = 74;
        if (skillIndex === 0) {
            const damage = Math.round((Number(championsArray[championIndex].abilities.Q[0].effects[0].leveling[0].modifiers[0].values[level - 1]) + (Number(championsArray[championIndex].abilities.Q[0].effects[0].leveling[0].modifiers[1].values[0]) * 0.01) * Number(values[1])) * 100 / (100 + Number(valuesR[3]) - (Number(valuesR[3]) * (Number(parseInt(values[7])) * 0.01) + Number(Magic_Penetration))));
            const skillMp = championsArray[74].abilities.Q[0].cost.modifiers[0].values[level - 1];
            rArea.r_SetRealHp(damage);
            test.setRealMp(skillMp);
            damageText = `(Q) ${damage}의 데미지를 입혔습니다.<br>`;
        } else if (skillIndex === 1) {
            const skillMp = championsArray[74].abilities.W[0].cost.modifiers[0].values[level - 1];
            damageText = "(W) 0의 데미지를 입혔습니다.<br>";
            rArea.r_SetRealHp(damage);
            test.setRealMp(skillMp);
        } else if (skillIndex === 2) {
            const damage = Math.round((Number(championsArray[championIndex].abilities.E[0].effects[2].leveling[0].modifiers[0].values[level - 1]) + (Number(championsArray[championIndex].abilities.E[0].effects[2].leveling[0].modifiers[1].values[0]) * 0.01) * Number(values[1])) * 100 / (100 + Number(valuesR[3]) - (Number(valuesR[3]) * (Number(parseInt(values[7])) * 0.01) + Number(Magic_Penetration))));
            const skillMp = championsArray[74].abilities.E[0].cost.modifiers[0].values[level - 1];
            rArea.r_SetRealHp(damage);
            test.setRealMp(skillMp);
            damageText = `(E) ${damage}의 데미지를 입혔습니다.<br>`;
        } else if (skillIndex === 3) {
            const damage = Math.round((Number(championsArray[championIndex].abilities.R[0].effects[0].leveling[0].modifiers[0].values[level - 1]) + (Number(championsArray[championIndex].abilities.R[0].effects[0].leveling[0].modifiers[1].values[0] * 0.01)) * Number(values[1])) * 100 / (100 + Number(valuesR[3]) - (Number(valuesR[3]) * (Number(parseInt(values[7])) * 0.01) + Number(Magic_Penetration))));
            const skillMp = championsArray[74].abilities.R[0].cost.modifiers[0].values[level - 1];
            rArea.r_SetRealHp(damage);
            test.setRealMp(skillMp);
            damageText = `(R) ${damage}의 데미지를 입혔습니다.<br>`;
        }
    }


    // 현재 로그에 데미지 텍스트 추가
    logPan.innerHTML += damageText;
}

function getValues() {
    const values = [];
    const statValueElements = document.getElementsByClassName('stat_value');
    const leftRscValue = document.getElementById('left-rsc-value').innerHTML;
    const leftHpValue = document.getElementById('left-hp-value').innerHTML;

    for (let i = 0; i < statValueElements.length; i++) {
        const value = statValueElements[i].innerHTML;
        values.push(value);
    }

    values.push(leftRscValue);
    values.push(leftHpValue);

    return values;
}

function getValuesR() {
    const valuesR = [];
    const statValueElements = document.getElementsByClassName('stat_value_R');
    const rightRscValue = document.getElementById('right-rsc-value').innerHTML;
    const rightHpValue = document.getElementById('right-hp-value').innerHTML;

    for (let i = 0; i < statValueElements.length; i++) {
        const valueR = statValueElements[i].innerHTML;
        valuesR.push(valueR);
    }

    valuesR.push(rightRscValue);
    valuesR.push(rightHpValue);

    return valuesR;
}

// left_BA_button 클릭 이벤트 처리
const leftBAButton = document.getElementById('left_BA_button');
const skillButtons = [
    document.getElementById('skill1'),
    document.getElementById('skill2'),
    document.getElementById('skill3'),
    document.getElementById('skill4')
];

for (let i = 0; i < skillButtons.length; i++) {
    const button = skillButtons[i];

    button.addEventListener('click', function () {
        const values = getValues();
        const valuesR = getValuesR();
        const imgElement = document.querySelector('.portrait');
        const src = imgElement.getAttribute('src');
        const championName = src.split('/').pop().split('.')[0];

        const levelInput = document.getElementById(`left-skill${i + 1}-num`);
        const level = parseInt(levelInput.value);

        console.log(championName, values, valuesR); // 배열 출력 또는 원하는 작업 수행

        if (level >= 1 && level <= 5) {
            calculateDamage(championName, i, level, values, valuesR);
        } else {
            console.error('Invalid level input');
        }
    });
}



//평타버튼
leftBAButton.addEventListener('click', function() {
    const values = getValues(); // 선택한 챔 능력치
    const valuesR = getValuesR(); // 허수아비 능력치
    const selectedLevel = test.getSelectedLevel(); // 레벨 불러오기

    var imgElement = document.querySelector('.portrait');
    var src = imgElement.getAttribute('src');
    var championName = src.split('/').pop().split('.')[0];

    console.log(championName, values, valuesR); // 배열 출력 또는 원하는 작업 수행
    const logPan = document.getElementById('left-log_pan');

    let damage;
    if (values[11] === "100") { // 치명타 구현
        damage = Math.round(Number(values[0] * 1.75) * 100 / (100 + Number(valuesR[2]) - ((Number(valuesR[2]) * Number(values[6]) * 0.01 + ((0.6 * Number(values[8]) + (0.4 * (selectedLevel / 18) * Number(values[8]))))))));
        rArea.r_SetRealHp(damage);
    } else {
        damage = Math.round(Number(values[0]) * 100 / (100 + Number(valuesR[2]) - ((Number(valuesR[2]) * Number(values[6]) * 0.01 + ((0.6 * Number(values[8]) + (0.4 * (selectedLevel / 18) * Number(values[8]))))))));
        rArea.r_SetRealHp(damage);
    }

    console.log(Number(valuesR[15]) - Number(damage));
    logPan.innerHTML += "(평타)" + damage + "의 데미지를 입혔습니다.<br>";
});



// 챔피언 변경시 데미지로그 초기화
const championButton = document.getElementById('champion-btn');
const logPanElement = document.getElementById('left-log_pan');
championButton.addEventListener('click', function () {
    // 여기서 log_pan의 내용을 초기화
    logPanElement.innerHTML = '';
});









// 파일경로
const filePath = 'js/champions.json';

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

let championsArray = []; // 전역 변수로 선언

// 파일을 받아와서 배열에 저장하는 함수
function saveFileToArray(filePath, callback) {
    getFile(filePath, function (error, fileContent) {
        if (error) {
            callback(error, null);
        } else {
            try {
                const jsonData = JSON.parse(fileContent);
                championsArray = Object.values(jsonData); // 전역 변수에 저장
                callback(null, championsArray);
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
        console.log(championsArray[74].abilities.Q[0].cost.modifiers[0].values[0]);
        console.log(championsArray[74].abilities.W[0].cost.modifiers[0].values[0]);
        console.log(championsArray[74].abilities.E[0].cost.modifiers[0].values[0]);
        console.log(championsArray[74].abilities.R[0].cost.modifiers[0].values[0]);
    }
});
