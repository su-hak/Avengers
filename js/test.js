// import { asstatValue } from "./item.js";
// console.log(asstatValue);
// 챔피언의 스킬정보와 디테일한 스텟정보를 받아오는 함수
// function detailedChamp(id, callback){
//     let detail;
//     $.ajax({
//         type: "get",
//         url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion/"+id+".json",
//         success: function (data) {
//             var dtch = Object.values(data.data); // 챔피언 데이터 배열 추출
//             console.log(dtch);
//             callback(dtch); // 결과를 콜백 함수로 전달합니다.
//         }
//     });
//
//
// }
// stats = {};
let test = {};
//
function selectObject(colElement) {
//         console.log("selectObject 함수 호출 성공");
//         // 해당 div 요소를 가져옵니다.
//         // var colDiv = document.querySelector('.col-3.bg-hover');
//         var colDiv = document.querySelector('.col-3.bg-hover');
// // 이미지 요소를 가져옵니다.
//         var imgElement = colDiv.querySelector('img');
//         var name = imgElement.id;
//         // var info = champ.id.equals(imgElement);
//         console.log(name);
//         // var info = champ.find(name);
//         var info = champ.find(function(champion) {
//             return champion.key === name;
//         });
//         console.log(info);
//         // console.log(champ);

    var clickedDiv = currentTarget;
    var imgElement = clickedDiv.querySelector("img");
    var imgId = imgElement.id;
    console.log("클릭한 div의 img id:", imgId);
    // 필요한 작업을 수행합니다.


}
// 선택한 챔피언의 div img id값으로 선택
// function selectObject(event) {
//     var clickedDiv = event.currentTarget;
//     var imgElement = clickedDiv.querySelector("img");
//     var imgId = imgElement.id;
//     console.log("클릭한 div의 img id:", imgId);
//     var newSrc = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/"+imgId+".png"; // 새로운 이미지 소스 URL
//     searchChampById(imgId);
//     changeLeftChampPortraitSrc(newSrc);
//     // 필요한 작업을 수행합니다.
//
// }

// 이미지를 검색하는 함수
function searchChampById(imgId) {
    var champion = champ.find(function(champion) {
        return champion.id === imgId;
    });
    if (champion) {
        console.log(champion.id);
        setChampStats(champion.id);
        setChampSpells(champion.id)
        // 필요한 작업을 수행합니다.
    } else {
        console.log("해당 imgId를 가진 챔피언을 찾을 수 없습니다.");
    }
}

// 받은 이미지로 spell정보 받아오기
// function setChampSpells(id){
//     console.log("setChampSpells 진입성공");
//     detailedChamp(id, function(dtch) {
//         for(var i=0; i<4; i++){
//             console.log(dtch[0].spells[i]);
//         }
//         // console.log(dtch[0].spells);
//
//
//     });
// }

// 선택한 레벨 받아오기
test.getSelectedLevel = function() {
    const selectElement = document.getElementById('champ_lv');
    test.selectedValue = selectElement.value;
    return test.selectedValue;
}


// 선택한 챔피언의 스탯 긁어오기
function setChampStats(id) {
    console.log("setChampStats 진입성공");

    detailedChamp(id, function(dtch) {
        const baseAttackDamage = dtch[0].stats.attackdamage; // 기본 공격력 값 저장
        const statValues = {
            'attackDamageL': baseAttackDamage, // 공격력
            'abilityPowerL': 0, // 주문력
            'armorL': dtch[0].stats.armor, // 방어력
            'spellBlockL': dtch[0].stats.spellblock, // 마법 저항력
            'attackSpeedL': dtch[0].stats.attackspeed, // 공격 속도
            'moveSpeedL': dtch[0].stats.movespeed, // 이동 속도
            'mpRegenL': Math.round(dtch[0].stats.mpregen), // 마나 재생
            'hpRegenL': Math.round(dtch[0].stats.hpregen), // 체력제생
            'critL': dtch[0].stats.crit, // 치명타 확률
            'hp' : dtch[0].stats.hp, // 체력
            'mp' : dtch[0].stats.mp, // 마나
            'arPenL' : 0, // 방어구 관통력
            'spPenL' : 0, // 마법 관통력 (%)
            'spPen2L' : 0, // 마법 관통력 (정수)
            'adPenL' : 0, // 물리 관통력
            'vampL' : 0, // 모든 피해 흡혈
            'coolTimeL' : 0 // 스킬 가속

        };
        test.updateAttackStats = function(selectedLevel)  {
            console.log("updateAs 호출");
            var itemAt = items.adValue;
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.attackdamageperlevel;
                let a = [];
                // let itemAt = adValue;
                a[0] = baseAttackDamage;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))));
                }
                // statValues['attackdamage'] = Math.round(a[selectedLevel - 1]);
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['attackDamageL'] = Math.round(realRoundedValue) + itemAt;
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a, itemAt);
            } else if (selectedLevel < 2) {
                statValues['attackDamageL'] = baseAttackDamage + itemAt;
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value
                }
            }
        }
        test.updateArmorStats = function (selectedLevel) {
            var itemAr = items.armor;
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.armorperlevel;
                let a = [];
                // let itemAr = 0;
                a[0] = dtch[0].stats.armor;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['armorL'] = Math.round(realRoundedValue) + itemAr;
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['armorL'] = dtch[0].stats.armor + itemAr;
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateSpellBlockStats = function(selectedLevel) {
            var itemSb = items.spellBlock;
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.spellblockperlevel;
                let a = [];
                // let itemSb = 0;
                a[0] = dtch[0].stats.spellblock;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['spellBlockL'] = Math.round(realRoundedValue) + itemSb;
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['spellBlockL'] = dtch[0].stats.spellblock + itemSb;
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateHpregenStats = function(selectedLevel) {
            var itemHr = items.hpRegen;
            var itemHrNum = itemHr * 0.01;
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.hpregenperlevel;
                let a = [];
                // let itemHr = 0;
                a[0] = dtch[0].stats.hpregen;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['hpRegenL'] = Math.round(realRoundedValue) + Math.round(realRoundedValue*itemHrNum);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['hpRegenL'] = Math.round(dtch[0].stats.hpregen) + Math.round(dtch[0].stats.hpregen*itemHrNum);
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateMpregenStats = function(selectedLevel) {
            var itemMr = items.mpRegen;
            var itemMrNum = itemMr * 0.01;
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.mpregenperlevel;
                let a = [];
                // let itemMr = 0;
                a[0] = dtch[0].stats.mpregen;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['mpRegenL'] = Math.round(realRoundedValue) + Math.round(realRoundedValue*itemMrNum);
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['mpRegenL'] = Math.round(dtch[0].stats.mpregen) + Math.round(dtch[0].stats.mpregen*itemMrNum);
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }

        test.updateAttackspeedStats = function(selectedLevel) {
            var itemAs = items.attackSpeed;
            let a = [];
            var itemAsNum = 0;
            if(itemAs == 0){
                itemAsNum = 0;
            }else{
                itemAsNum = itemAs * 0.01;
            }
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.attackspeedperlevel;

                a[0] = dtch[0].stats.attackspeed;
                let level = 1;
                // if(asstatValue != null){
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = ((itemAsNum+(+(coefficient*0.01)*(selectedLevel-1))*(0.7025+(0.0175*(selectedLevel-1))))*a[0]) + a[0];
                }
                // }else{
                //     // itemAs = 0;
                //     for (let i = 1; i < selectedLevel; i++) {
                //         a[i] = ((itemAsNum+(+(coefficient*0.01)*(selectedLevel-1))*(0.7025+(0.0175*(selectedLevel-1))))*a[0]) + a[0];
                //     }
                // }

                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = roundToThreeDecimalPlaces(value);
                // const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['attackSpeedL'] = roundedValue;
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['attackSpeedL'] = roundToThreeDecimalPlaces(dtch[0].stats.attackspeed + (dtch[0].stats.attackspeed*itemAsNum));
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        // function updateHpStats(selectedLevel){
        //     const totalHp = document.getElementById("left-hp-total");
        //     // console.log(dtch[0].stats.hp);
        //     // console.log(dtch[0].stats.hpperlevel);
        //     if (selectedLevel > 1) {
        //         let coefficient = dtch[0].stats.hpperlevel;
        //         let a = [];
        //         let itemHp = 0;
        //         a[0] = dtch[0].stats.hp;
        //         let level = 1;
        //         for (let i = 1; i < selectedLevel; i++) {
        //             a[i] = Math.round((a[i-1]+(coefficient* (0.65+(0.035*(i+1)))))+itemHp);
        //         }
        //         const value = new Decimal(a[selectedLevel - 1]);
        //         const roundedValue = value.toDecimalPlaces(2);
        //         const realRoundedValue = roundedValue.toDecimalPlaces(1);
        //         statValues['hp'] = Math.round(realRoundedValue);
        //         console.log(a);
        //     } else if (selectedLevel < 2) {
        //         statValues['hp'] = Math.round(dtch[0].stats.hp);
        //     }
        //     for (const id in statValues) {
        //         const element = document.getElementById(id);
        //         let value = statValues[id];
        //         if (element) {
        //             totalHp.textContent = value;
        //         }
        //     }
        // }
        test.updateHpStats = function(selectedLevel) {
            var itemHp = items.fullHp;
            console.log(dtch[0].stats.hp);
            const totalHp = document.getElementById("left-hp-total");
            if (selectedLevel > 1) {
                console.log("statValues  ::",statValues);
                let coefficient = dtch[0].stats.hpperlevel;
                let a = [];
                let itemHp = 0;
                a[0] = dtch[0].stats.hp;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i - 1] + Math.round((coefficient * (0.65 + (0.035 * (i + 1))))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['hp'] = Math.round(realRoundedValue) + itemHp;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['hp'] = Math.round(dtch[0].stats.hp) + itemHp;
            }
            for (const id in statValues) {
                const element = 'hp';
                if(element == id){
                    let value = statValues[id];
                    totalHp.textContent = value;
                }
            }
            setRealHp();
        }

        test.updateMpStats = function(selectedLevel) {
            const totalMp = document.getElementById("left-rsc-total");
            if(dtch[0].stats.mp != 0){
                var itemMp = items.fullMp;
                console.log(dtch[0].stats.mp);
                if (selectedLevel > 1) {
                    console.log("statValues  ::",statValues);
                    let coefficient = dtch[0].stats.mpperlevel;
                    let a = [];
                    let itemMp = 0;
                    a[0] = dtch[0].stats.mp;
                    let level = 1;
                    for (let i = 1; i < selectedLevel; i++) {
                        a[i] = (a[i - 1] + Math.round((coefficient * (0.65 + (0.035 * (i + 1))))));
                    }
                    const value = new Decimal(a[selectedLevel - 1]);
                    const roundedValue = value.toDecimalPlaces(2);
                    const realRoundedValue = roundedValue.toDecimalPlaces(1);
                    statValues['mp'] = Math.round(realRoundedValue) + itemMp;
                    console.log(a);
                } else if (selectedLevel < 2) {
                    statValues['mp'] = Math.round(dtch[0].stats.mp) + itemMp;
                }
                for (const id in statValues) {
                    const element = 'mp';
                    if(element == id){
                        let value = statValues[id];
                        totalMp.textContent = value;
                    }
                }
            }else{
                totalMp.textContent = 0;
            }
            setRealMp();

        }

        function updateCritStats(){
            var critTdElement = document.getElementById('critL');
            var statValueElement = document.getElementById('critL_value');

            var criticalCheckbox = document.getElementById('critical');

            criticalCheckbox.addEventListener('change', function() {
                if (criticalCheckbox.checked) {
                    statValueElement.textContent = '100';
                } else {
                    statValueElement.textContent = '0';
                }
            });

        }
        test.updateMovespeedStats = function(){
            // let itemMs = 0;
            let a = 0;
            var itemMs = items.moveSpeed;
            a = dtch[0].stats.movespeed + itemMs;
            statValues['moveSpeedL'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateAbilitypowerStats = function(){
            // let itemAp = 0;
            let a = 0;
            var itemAp = items.apValue;
            a = a+itemAp;
            statValues['abilityPowerL'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateArPenStats = function(){ // 방관
            // let itemAp = 0;
            let a = 0;
            var itemArpen = items.newArPen;
            a = a+itemArpen;
            statValues['arPenL'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateAdPenStats = function(){ // 물관
            // let itemAp = 0;
            let a = 0;
            var itemAdpen = items.adPen;
            a = a+itemAdpen;
            statValues['adPenL'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateNewOmniVampStats = function(){ // 피흡
            // let itemAp = 0;
            let a = 0;
            // var result = test.sendItemStats();
            var itemNewOmniVamp = items.newOmniVamp;
            a = a+itemNewOmniVamp;
            statValues['vampL'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        test.updateCooltimeStats = function(){ // 쿨탐
            // let itemAp = 0;
            let a = 0;
            // var result = test.sendItemStats();
            var itemcooltime = items.cooltime;
            a = a+itemcooltime;
            statValues['coolTimeL'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        // test.updateSpPenStats = function(){ // 물관
        //     // let itemAp = 0;
        //     let a = 0;
        //     // var result = test.sendItemStats();
        //     var itemSppen = items.spPen;
        //     a = a+itemAdpen;
        //     statValues['adPenL'] = a;
        //     for (const id in statValues) {
        //         const element = document.getElementById(id);
        //         let value = statValues[id];
        //         if (element) {
        //             element.nextElementSibling.textContent = value;
        //         }
        //     }
        // }

        function setRealHp(){
            // console.log("hp :::",statValues['hp']);
            var realHp = statValues['hp'];
            var damage = 0;
            const targetHp = document.getElementById("left-hp-value");
            var damageHp = statValues['hp'] - damage;// 데미지 입은만큼 빼기
            targetHp.textContent = damageHp;
            var maxWidth = 100; // 최대 width 값 (100%)
            var currentWidth = (damageHp / realHp) * maxWidth; // 현재 width 값 계산
            var hpBar = document.getElementById("left-hp-bar"); // hp 바 엘리먼트 가져오기
            hpBar.style.width = currentWidth + "%"; // width 값 업데이트
        }

        function setRealMp(){
            // console.log("mp :::",statValues['mp']);
            var realMp = statValues['mp'];
            var cost = 0;
            const targetMp = document.getElementById("left-rsc-value");
            var costMp = statValues['mp'] - cost;// 데미지 입은만큼 빼기
            targetMp.textContent = costMp;
            var maxWidth = 100; // 최대 width 값 (100%)
            var currentWidth = (costMp / realMp) * maxWidth; // 현재 width 값 계산
            var mpBar = document.getElementById("left-rsc-bar"); // hp 바 엘리먼트 가져오기
            mpBar.style.width = currentWidth + "%"; // width 값 업데이트
        }

// 초기 레벨 설정
        const selectedLevel = test.getSelectedLevel();
        // test.test();
        test.updateAttackStats(selectedLevel);
        test.updateArmorStats(selectedLevel);
        test.updateSpellBlockStats(selectedLevel);
        test.updateAttackspeedStats(selectedLevel);
        test.updateHpregenStats(selectedLevel);
        test.updateMpregenStats(selectedLevel);
        test.updateHpStats(selectedLevel);
        test.updateMpStats(selectedLevel);
        updateCritStats();
        test.updateMovespeedStats();
        test.updateAbilitypowerStats();
        test.updateArPenStats();
        test.updateAdPenStats();
        test.updateNewOmniVampStats();
        test.updateCooltimeStats();

// 레벨 변경 시 업데이트
        document.getElementById('champ_lv').onchange = function() {
            const selectedLevel = test.getSelectedLevel();
            // test.test();
            console.log(selectedLevel); // 선택된 레벨 값 출력
            test.updateAttackStats(selectedLevel);
            test.updateArmorStats(selectedLevel);
            test.updateSpellBlockStats(selectedLevel);
            test.updateAttackspeedStats(selectedLevel);
            test.updateHpregenStats(selectedLevel);
            test.updateMpregenStats(selectedLevel);
            test.updateHpStats(selectedLevel);
            test.updateMpStats(selectedLevel);
            updateCritStats();
            test.updateMovespeedStats();
            test.updateAbilitypowerStats();
            test.updateArPenStats();
            test.updateAdPenStats();
            test.updateNewOmniVampStats();
            test.updateCooltimeStats();
        };
    });
}


var checkbox = document.getElementById('right_critical');

checkbox.addEventListener('change', function() {
    var critValue = checkCritbox(); // checkCritbox() 함수 호출하여 반환된 값을 가져옵니다.
    updateCritStats(critValue); // updateCritStats() 함수 호출하여 critValue를 전달합니다.
});
function roundToThreeDecimalPlaces(number) {
    return Math.round(number * 1000) / 1000;

}


//
//
//
//
// // 챔피언 선택시 초상화 해당 챔피언으로 변경하는 함수
// function changeLeftChampPortraitSrc(newSrc) {
//     console.log(newSrc);
//     var imgElement = document.getElementById("left-champ-portrait");
//     if (imgElement) {
//         imgElement.src = newSrc;
//         console.log("left-champ-portrait 이미지의 src가 변경되었습니다.");
//     } else {
//         console.log("left-champ-portrait 이미지를 찾을 수 없습니다.");
//     }
// }
//
//
// // 사용 예시
// // api속 챔피언 갯수만큼 박스 생성
// function createBoxes() {
//
//     var boxes = champ; // 예시로 사용되는 배열
//     var searchInput = document.getElementById("left-champ-search");
//     var searchText = searchInput.value.toLowerCase();
//
//     var boxContainer = document.getElementById("boxContainer");
//     boxContainer.innerHTML = ""; // 기존 요소 초기화
//     for(var i=0; boxes.length; i++){
//
//             let championName = boxes[i].name;
//             // console.log(boxes[i].name);
//
//          // 예시로 사용되는 챔피언 이름
//         // console.log(championName);
//
//         // 검색어가 존재하고 현재 챔피언 이름에 검색어가 포함되지 않으면 요소를 생성하지 않음
//         if (searchText && !championName.toLowerCase().includes(searchText)) {
//             return;
//         }
//
//         var colElement = document.createElement("div");
//         colElement.classList.add("col-3", "bg-hover", "pt-2");
//         colElement.addEventListener("click", selectObject);
//         // selectObject(colElement);
//         // colElement.addEventListener("click", selectObject);
//         // colElement.setAttribute("onclick", "selectObject()");
//
//         // colElement.addEventListener("click", function() {
//         //     selectObject(boxes[i].name);
//         // });
//
//         var imgElement = document.createElement("img");
//         imgElement.src = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/"+champ[i].id+".png";
//         imgElement.classList.add("portrait", "sprite");
//          // imgElement.style.width = "90%"; // 이미지 크기 지정
//          // imgElement.style.height = "90%"; // 이미지 크기 지정
//         imgElement.id = champ[i].id; // 이미지에 id 할당
//         colElement.appendChild(imgElement);
//
//
//         var rowElement = document.createElement("div");
//         rowElement.classList.add("row");
//
//         var pElement = document.createElement("p");
//         pElement.classList.add("text-center", "champ-name", "mx-auto");
//         pElement.textContent = champ[i].name;
//         rowElement.appendChild(pElement);
//
//         colElement.appendChild(rowElement);
//
//         boxContainer.appendChild(colElement);
//     }
//
// }
//
// // 챔피언 초상화 클릭후 search에서 이름으로 검색하는 함수들
// $(document).ready(function () {
//
//
// });
// import { asstatValue } from "./item2.js";

// console.log(asstatValue);  // statValue 값을 사용하는 원하는 로직을 작성합니다.
//
// function enableSearch(parent) {
//     var searchBar = $(parent)
//     searchBar.on("keyup", function() {
//         var input = $(this).val();
//         searchItems(input, parent);
//     });
// }
//
// function searchItems(input, parent) {
//     var filter = input.toUpperCase();
//     // Select all .col-3.bg-hover where the parent is a row preceded by #id
//     var candidates = $(parent).find(".col-3.bg-hover");
//     while ($(candidates).length == 0) {
//         parent = $(parent).parent();
//         candidates = parent.find(".col-3.bg-hover");
//     }
//     for (var i = 0; i < candidates.length; ++i) {
//         if ($(candidates[i]).attr("filtered") == "true") {
//             continue;
//         }
//         var img = $(candidates[i]).find("img");
//         var name = $(candidates[i]).find("p");
//         var text = name.text();
//         if (text.toUpperCase().indexOf(filter) > -1) {
//             $(candidates[i]).show();
//         }
//         else {
//             $(candidates[i]).hide();
//         }
//     }
// }
// end

test.choose = false;

// 광규햄 js
// 챔피언 정보를 받아오는 함수
function getChampionList() {
    $.ajax({
        type: "get",
        url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json",
        success: function (data) {
            var champions = Object.values(data.data);
            // 챔피언 이름을 기준으로 정렬
            champions.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

            displayChampionList(champions);
        }
    });
}


// 챔피언의 스킬정보와 디테일한 스텟정보를 받아오는 함수
function detailedChamp(id, callback){
    let detail;
    $.ajax({
        type: "get",
        url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion/"+id+".json",
        success: function (data) {
            var dtch = Object.values(data.data); // 챔피언 데이터 배열 추출
            console.log(dtch);
            callback(dtch); // 결과를 콜백 함수로 전달합니다.
        }
    });
}

// 챔피언 목록을 표시하는 함수
function displayChampionList(champions) {
    console.log(test.choose);
    var championList = $("#champion-list");
    championList.empty(); // 기존 목록 초기화

    champions.forEach(function (champion, index) {
        var championBox = $("<div>", {
            class: "champion-box",
            click: function () {
                selectChampion(champion);
            }
        });

        var championImg = $("<img>", {
            src: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/" + champion.id + ".png",
            alt: champion.name + " 이미지",
            class: "champion-img"
        });

        var championName = $("<p>", {
            class: "champion-name",
            text: champion.name
        });

        championBox.append(championImg);
        championBox.append($("<br>"));
        championBox.append(championName);
        championList.append(championBox);
    });
}


// 챔피언 선택 시 동작하는 함수
function selectChampion(champion) {
    test.choose = true;
    console.log(test.choose);
    // detailedChamp();
    // 선택한 챔피언에 대한 동작을 추가하세요.
    console.log("선택한 챔피언 ID:", champion.id);
    // 이미지 업데이트
    updateChampionButtonImage(champion.id);
    // 스킬 정보 업데이트

    itemStatCalc();
    setChampSpells(champion.id);
    setChampStats(champion.id);
    console.log(savedItems);

    test.getSelectedLevel();
    // deleteItem();
}


// 검색창에 입력된 텍스트로 챔피언을 검색하는 함수
function searchChampion() {
    var searchText = $("#champion-search").val().toLowerCase();
    var championBoxes = $(".champion-box");

    championBoxes.each(function () {
        var championBox = $(this);
        var championName = championBox.find("p").text().toLowerCase();

        if (championName.includes(searchText)) {
            championBox.show();
        } else {
            championBox.hide();
        }
    });
}
function searchItem() {
    var searchText = $("#left-item-search").val().toLowerCase();
    var itemBoxes = $(".item_box_list");

    itemBoxes.each(function () {
        var itemBox = $(this);
        var itemName = itemBox.find("p").text().toLowerCase();

        if (itemName.includes(searchText)) {
            itemBox.show();
        } else {
            itemBox.hide();
        }
    });
}



// 챔피언 버튼 이미지를 업데이트하는 함수
function updateChampionButtonImage(championId) {
    var championBtnImg = $("#left-champ-portrait");
    championBtnImg.attr("src", "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/" + championId + ".png");
}



// 초기화 함수
function initialize() {
    getChampionList();

    // 검색창에 입력이 있을 때마다 검색 수행
    $("#champion-search").on("input", searchChampion);
    $("#left-item-search").on("input", searchItem);
}

// 페이지 로드 시 초기화 함수 호출
$(document).ready(initialize);

// 스킬 이벤트
function setSkillEvents(skillButton, spellInfo) {
    // 마우스 오버 및 아웃 이벤트 추가
    // skillButton.addEventListener('mouseover', function (event) {
    //     showTooltip(spellInfo, event.pageX, event.pageY);
    // });
    // skillButton.addEventListener('mouseout', hideTooltip);
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

// // 스킬 설명 툴팁
// function showTooltip(content, x, y) {
//     var tooltip = document.getElementById('tooltip');
//     var tooltipContent = document.getElementById('tooltip-content');
//
//     tooltipContent.innerHTML = content;
//     tooltip.style.left = x + 'px';
//     tooltip.style.top = y + 'px';
//     tooltip.style.display = 'block';
// }
//
// function hideTooltip() {
//     var tooltip = document.getElementById('tooltip');
//     tooltip.style.display = 'none';
// }










// 수학 햄 js
let items = {};
// let savedItems = []; // 아이템 저장 배열
let savedItems = new Array(6);
let itemGold = new Array(6);
itemGold.fill(0);
let allItems = {};
let filterItems = {};
let callIdx = 0; //선택한 아이템 칸 idx
let itemPriceL= 0; // 아이템 값을 담아줄 변수

console.log("savedItems",savedItems)


// 스탯 값을 담을 변수 선언
items.adValue= 0;
items.apValue= 0;
items.armor= 0;
items.spellBlock= 0;
items.attackSpeed= 0;
items.moveSpeed= 0;
items.newArPen= 0;
items.adPen= 0;
items.spPen= 0;
items.spPen2= 0;
items.crit= 0;
items.newOmniVamp= 0;
items.cooltime= 0;
items.hpRegen= 0;
items.mpRegen= 0;
items.fullHp= 0;
items.fullMp= 0;


// API 가져오기
$.ajax({
    type: "get",
    url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
    success: function (data) {
        allItems = Object.values(data.data); //아이템 데이터 배열 추출

        /* ===========아이템 가나다 순 정렬 start ==========*/
        allItems.sort(function(a,b){
            var nameA=a.name.toUpperCase();
            var nameB=b.name.toUpperCase();

            if(nameA<nameB){
                return -1;
            }
            if(nameA>nameB){
                return 1;
            }
            return 0;
        });
        /* ===========아이템 가나다 순 정렬 start ==========*/

        // 아이템 필터링 start
        filterItems = allItems.filter(function(allItems){
            return !allItems.requiredChampion // 챔피언전용템제외
                // && items.description.includes('rarityMythic') // 신화급 아이템만 출력
                && allItems.inStore!==false // 스토어: false인 item 제외
                && allItems.maps["11"]===true; // 소환사의 협곡 맵("11")만 출력
        });


        console.log(filterItems);
        // 아이템 필터링 End

        filterItems.forEach((data, index) =>{
            var itemBox = $("<div>").addClass("item_box");
            var itemImg = $("<img>", {
                src: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + data.image.full,
                alt: data.name + " 이미지",
                class: "item-img",
                value : index
            });
            var itemName = $("<p>").addClass("item-name").text(data.name);
            // var imgURL= "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/"+data.image.full;
            // var itemButton = $("<button type='button' class='item_box'><img src='"+imgURL+"'alt='"+data.name+"'></button>"+data.name)
            // $("#itemContainer").append(itemButton);
            itemBox.append(itemImg);
            itemBox.append($("<br>"));
            itemBox.append(itemName);
            $("#item-list").append(itemBox); //#item-list의 자식요소에 <div class="item-box">
        });

    },
    error : function (){
        console.log("API 데이터 가져오는 중 오류 발생");
    }
});

function checkSavedItemsNull() {
    for (var i = 0; i < savedItems.length; i++) {
        if (savedItems[i] != null) {
            return false; // null이 아닌 값이 하나라도 존재하면 false 반환
        }
    }
    return true; // 모든 값이 null이면 true 반환
}


// 아이템 선택
$("#item-list").click(function (e) {
    var totalGold = 0;
    // var callIdx = parseInt(e.target.getAttribute("data-idx"));
    // console.log(e.target);
    console.log(itemGold);
    if (e.target.id === 'emptyBtn') {
        console.log("삭제 버튼 클릭하였습니다.");
        // callIdx = $(e.target).closest('#iBox').index();
        // savedItems.splice(callIdx, 1);
        // delete savedItems[callIdx];
        // savedItems[callIdx] = null;

        itemGold[callIdx] = 0;
        console.log("savedItems :: ",savedItems);
        var isSavedItemsNull = checkSavedItemsNull();

        // 템 제거 시 스텟 초기화
        if(isSavedItemsNull == true){
            items.adValue= 0;
            items.apValue= 0;
            items.armor= 0;
            items.spellBlock= 0;
            items.attackSpeed= 0;
            items.moveSpeed= 0;
            items.newArPen= 0;
            items.adPen= 0;
            items.spPen= 0;
            items.spPen2= 0;
            items.crit= 0;
            items.newOmniVamp= 0;
            items.cooltime= 0;
            items.hpRegen= 0;
            items.mpRegen= 0;
            items.fullHp= 0;
            items.fullMp= 0;
            deleteItem();
        }
        itemStatCalc();
        console.log("아이템 잔여 확인 :: ",savedItems);
        $("#iBox" + callIdx).css("background-image", "none");
        $("#iBox" + callIdx).html('<iconify-icon icon="ic:baseline-plus" style="color: #ff00e1;" width="50" height="50"></iconify-icon>');
        console.log("저장된 스탯::: ", items);
        for(var i=0; i<itemGold.length; i++){
            totalGold += itemGold[i];
            $("#left-cost-value").text(": "+ totalGold + " 원"); //아이템 가격을 HTML에 적용
            console.log("for문 gold :: ", itemGold[i]);
        }

    } else if (e.target.classList.contains('item-img')) {
        console.log(333,)
        console.log("아이템 클릭하였습니다.", e.target.getAttribute("value"));
        // callIdx = $(e.target).closest('.iBox').index();
        console.log("savedItems :: ",savedItems);
        var itemData = filterItems[e.target.getAttribute("value")];
        var imgSrc = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + filterItems[e.target.getAttribute("value")].image.full;

        var clickedIdx = e.target.parentElement.dataset.idx;

        // 이미지를 버튼 위에 겹쳐서 표시
        // var itemImg = $("<img>").attr({
        //     src: imgSrc,
        //     alt: e.target.alt,
        //     class: e.target.classList[0]
        // });
        // $(e.target.parentElement).append(itemImg);

        // $('#iBox' + callIdx).html("<img src='"+imgSrc+"' alt='"+ e.target.alt+"' class='"+ e.target.classList[0]+"'>"); // 아이템 출력*/
        $('#iBox' + callIdx).empty();
        $('#iBox' + callIdx).css({
            'background-image': 'url(' + imgSrc + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'contain'
        });

        savedItems[callIdx] = itemData;
        itemGold[callIdx] = savedItems[callIdx].gold.total; // 아이템의 total값을 누산
        itemStatCalc(); // 아이템 스텟 값 함수 호출
        // console.log("savedItems", savedItems);
        for(var i=0; i<itemGold.length; i++){
            totalGold += itemGold[i];
            $("#left-cost-value").text(": "+ totalGold + " 원"); //아이템 가격을 HTML에 적용
            console.log("for문 gold :: ", itemGold[i]);
        }
    }

});

// 아이템 스탯 업데이트
function deleteItem(){
    var level = test.getSelectedLevel();
    test.updateAttackStats(level);
    test.updateArmorStats(level);
    test.updateSpellBlockStats(level);
    test.updateAttackspeedStats(level);
    test.updateHpregenStats(level);
    test.updateMpregenStats(level);
    test.updateHpStats(level);
    test.updateMpStats(level);
    // updateCritStats();
    test.updateMovespeedStats();
    test.updateAbilitypowerStats();
    test.updateArPenStats();
    test.updateAdPenStats();
    test.updateNewOmniVampStats();
    test.updateCooltimeStats();
}


// 십자 이미지와 그 밖의 버튼 모두 하나의 버튼에 동작 하게 설정
$("#plusItem").click(function (e){
    if (!test.choose) {
        Swal.fire("챔프 선택부터 혀라");
        return; // test.choose가 false인 경우 함수 실행 중단
         }
        console.log("plusItem 클릭 !", e.type);
        if(e.target.dataset.idx != undefined){ // callIdx 안 십자 바깥 영역 클릭 시
            callIdx = e.target.dataset.idx; // 해당 idx 값을 callIdx에 저장
            itemFilterControl();

        }else if(e.target.tagName == 'ICONIFY-ICON' && e.target.parentElement.dataset.idx != undefined){ // 십자 이미지 클릭 시
            callIdx = e.target.parentElement.dataset.idx; // 해당 idx 값을 callIdx에 저장
            itemFilterControl();

        }else if($(this).find('li img').length > 0 ) {
            // callIdx = $(e.target).closest('.iBox').index();
            itemFilterControl();
            // 아이템을 가지고 있어도 템 목록 창 열릴 수 있게 설정
        }else if(e.target.id === 'left-item-filter-options') {
            // left-item-search를 클릭한 경우 아무 동작도 수행하지 않도록 합니다.
            return;
        }
        console.log(e.target.tagName , e.target.classList[0]);
        console.log(callIdx,"callIdx")

    });


// 아이템 목록 창 출력
function itemFilterControl() {
    if($("#left-item-filter-options").css("display") == "block"){
        $("#left-item-filter-options").css("display", "none");
    }else {
        $("#left-item-filter-options").css("display", "block");
    }

}



// 스탯 계산 함수
function itemStatCalc() {
    items.adValue= 0;
    items.apValue= 0;
    items.armor= 0;
    items.spellBlock= 0;
    items.attackSpeed= 0;
    items.moveSpeed= 0;
    items.newArPen= 0;
    items.adPen= 0;
    items.spPen= 0;
    items.spPen2= 0;
    items.crit= 0;
    items.newOmniVamp= 0;
    items.cooltime= 0;
    items.hpRegen= 0;
    items.mpRegen= 0;
    items.fullHp= 0;
    items.fullMp= 0;

    savedItems.forEach(function (data){

        var description = data.description;
        var stats = description.match(/<stats>(.*?)<\/stats>/);
        console.log("stats",stats)

        var statValues = [];
        if (stats) {
            statValues = stats[1].split('<br>');
        }

        statValues.forEach(function (stat) {
            //TODO : 스탯값 있는지 확인 로직 추가

            var statName = stat.match(/^\s*(.*?)\s*<attention>/)[1];
            var statValue = stat.match(/<attention>(.*?)<\/attention>/)[1];


            if (statName && statValue) {
                var level = test.getSelectedLevel();
                switch (statName) {
                    case "공격력":
                        items.adValue += parseInt(statValue);
                        test.updateAttackStats(level);
                        break;
                    case "주문력":
                        items.apValue += parseInt(statValue);
                        test.updateAbilitypowerStats(level);
                        break;
                    case "방어력":
                        items.armor += parseInt(statValue);
                        test.updateArmorStats(level);
                        break;
                    case "마법 저항력":
                        items.spellBlock += parseInt(statValue);
                        test.updateSpellBlockStats(level);
                        break;
                    case "공격 속도":
                        items.attackSpeed += parseInt(statValue);
                        test.updateAttackspeedStats(level);
                        break;
                    case "이동 속도":
                        items.moveSpeed += parseInt(statValue);
                        test.updateMovespeedStats();
                        break;
                    case "방어구 관통력":
                        items.newArPen += parseInt(statValue);
                        test.updateArPenStats();
                        break;
                    case "물리 관통력":
                        items.adPen += parseInt(statValue);
                        test.updateAdPenStats();
                        break;
                    case "마법 관통력":
                        // if (statValue.includes('%')){
                        //     items.spPen += parseInt(statValue);
                        //     break;
                        // }else {
                        //     items.spPen2 += parseInt(statValue);
                        //     break;
                        // }
                        if (statValue.includes('%')){
                            items.spPen += parseInt(statValue);
                            $("#spPenL").next().text( items.spPen +'%' +"("+ items.spPen2+")");
                            break;
                        }else {
                            items.spPen2 += parseInt(statValue);
                            $("#spPenL").next().text(items.spPen + '%' +"("+ items.spPen2+")");
                            break;
                        }
                    case "치명타 확률":
                        items.crit += parseInt(statValue);
                        break;
                    case "모든 피해 흡혈":
                        items.newOmniVamp += parseInt(statValue);
                        test.updateNewOmniVampStats();
                        // $("#vampL").next().text(items.newOmniVamp + "%");
                        break;
                    case "스킬 가속":
                        items.cooltime += parseInt(statValue);
                        test.updateCooltimeStats();
                        break;
                    case "기본 체력 재생":
                        items.hpRegen += parseInt(statValue);
                        test.updateHpregenStats(level);
                        break;
                    case "기본 마나 재생":
                        items.mpRegen += parseInt(statValue);
                        test.updateMpregenStats(level);
                        break;
                    case "체력":
                        items.fullHp += parseInt(statValue);
                        test.updateHpStats(level);
                        break;
                    case "마나":
                        items.fullMp += parseInt(statValue);
                        test.updateMpStats(level);
                        break;
                }
            }
        });
    })

}

// 마우스 오버 시 아이템 정보 출력
$("#item-list").mouseover(function(e) {
    if (e.target.classList.contains('item-img')) {
        var itemData = filterItems[e.target.getAttribute("value")];
        var itemName = itemData.name;
        var description = itemData.description;

        description = description.replace(/(<(?!br\s*\/?)[^>]+)>/ig, ""); // HTML 태그 제거
        description = description.replace(/\r?\n|\r/g, ""); // 필요 없는 문자 제거
        console.log("description",description)

        // 문장 뒤에 <br> 추가
        description = description.replace(/\.(?!\s*<br>)/g, ".<br>");

        var itemBox = $(e.target).closest('.item_box');
        itemBox.append($("<div>").addClass("desBox").html(description));


        // console.log(itemName, description);
        // 또는 원하는 동작을 수행하세요.
    }
});


// 마우스 아웃 시 아이템 정보 제거
$("#item-list").mouseout(function(e){     // 마우스 내리면 이벤트
    var itemBox = $(e.target).closest('.item_box');
    itemBox.find(".desBox").remove(); // itemName과 description을 삭제합니다.
});