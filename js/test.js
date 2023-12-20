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
            'spPenL' : 0, // 마법 관통력
            'adPenL' : 0, // 물리 관통력
            'vampL' : 0, // 모든 피해 흡혈
            'coolTimeL' : 0 // 스킬 가속

        };
        test.updateAttackStats = function(selectedLevel)  {
            var result = test.sendItemStats();
            var itemAt = result[0];
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
            var result = test.sendItemStats();
            var itemAr = result[2];
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
            var result = test.sendItemStats();
            var itemSb = result[3];
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
            var result = test.sendItemStats();
            var itemHr = result[12];
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
            var result = test.sendItemStats();
            var itemMr = result[13];
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
            var result = test.sendItemStats();
            var itemAs = result[4];
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
            var result = test.sendItemStats();
            var itemHp = result[14];
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
                var result = test.sendItemStats();
                var itemMp = result[15];
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
            var result = test.sendItemStats();
            var itemMs = result[5];
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
            var result = test.sendItemStats();
            var itemAp = result[1];
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
        function setRealHp(){
            console.log("hp :::",statValues['hp']);
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
            console.log("mp :::",statValues['mp']);
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
        test.test();
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

// 레벨 변경 시 업데이트
        document.getElementById('champ_lv').onchange = function() {
            const selectedLevel = test.getSelectedLevel();
            test.test();
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
    // 선택한 챔피언에 대한 동작을 추가하세요.
    console.log("선택한 챔피언 ID:", champion.id);
    // 이미지 업데이트
    updateChampionButtonImage(champion.id);
    // 스킬 정보 업데이트
    setChampSpells(champion.id);
    setChampStats(champion.id);
    test.getSelectedLevel();
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
let items;

var clickItemBox;// 아이템 출력 기능 구현
// API 가져오기
$.ajax({
    type:"get",
    url:"http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
    success:function(data){
        var allItems=Object.values(data.data);//챔피언 데이터 배열 추출
        items = allItems;

        //6개의 각각의 박스에서 원하는 버튼에 클릭할 경우 기능
        for (var i = 1; i <= 6; i++) {
            $("#iBox" + i).click(function() {
                if(test.choose == false){
                    Swal.fire("챔프 선택부터 혀라");
                }else {
                    var parentContainer = "left-item-filter-options";
                    var container = "itemContainer" ;
                    if ($("#" + container).children().length === 0) {
                        $("#" + container).append('<div id="newBox"></div>');
                    } else if (clickItemBox && clickItemBox[0] === this) {
                        $("#newBox").remove();
                        $("#" + parentContainer).hide(); // left-item-filter-options 숨기기
                        return;
                    }
                    clickItemBox = $(this); // 현재 클릭한 아이템 박스를 저장
                    $("#" + parentContainer).show(); // left-item-filter-options 열고 닫기
                    // 아이템 필터링
                    var filterItems=items.filter(function(items){
                        return !items.requiredChampion // 챔피언전용템제외
                            // && items.description.includes('rarityMythic') // 신화급 아이템만 출력
                            && items.inStore!==false // 스토어: false인 item 제외
                            && items.maps["11"]===true; // 소환사의 협곡 맵("11")만 출력
                    });
                    console.log(filterItems);
                    // 아이템 필터링 End
                    printItems(filterItems); // 아이템 출력을 새로운 박스 안으로 변경
                }


            });
        }

        //=======================아이템 가나다 순 정렬
        items.sort(function(a,b){
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
        /*===========================정렬end==========================*/



        // description 값 확인
        // console.log(filterItems);

        // function printItems(filterItems){
        //     $("#newBox").empty();// newBox의 초기 값
        //
        //     for(var i=0; i<filterItems.length; i++){
        //         var item = filterItems[i];
        //         var imgURL="http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/"+item.image.full;
        //         var itemButton=$("<button type='button' class='item_box'><img src='"+imgURL+"'alt='"+item.name+"'></button>"+item.name);
        //
        //
        //         // 아이템 이미지 버튼에 클릭 이벤트를 설정
        //         setItemClickEvent(itemButton,item,clickItemBox.attr('id').replace('iBox','')-1);
        //
        //         // 버튼에 이미지와 텍스트 추가
        //         $("#newBox").append(itemButton);
        //     }
        // }
        function printItems(items) {
            console.log(test.choose);
            var itemList = $("#item-list");
            itemList.empty(); // 기존 목록 초기화

            items.forEach(function (item, index) {
                var itemBox = $("<div>").addClass("item_box_list").click(function () {
                    // setItemClickEvent(itemButton,item,clickItemBox.attr('id').replace('iBox','')-1);
                });

                var itemImg = $("<img>", {
                    src: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + item.image.full,
                    alt: item.name + " 이미지",
                    class: "item-img"
                });
                var itemName = $("<p>").addClass("item-name").text(item.name);

                itemBox.append(itemImg);
                // itemBox.append($("<br>"));
                itemBox.append(itemName);
                itemList.append(itemBox);
            });
        }


        // 각 아이템 박스마다 선택된 신화 아이템을 저장하는 배열
        var selectedMythicItem=[null,null,null,null,null,null];

        // 스탯 값을 담을 변수 선언
        var adValue= 0; // 공격력
        var apValue= 0; // 주문력
        var armor= 0; // 방어력
        var spellBlock= 0; // 마법 저항력
        var attackSpeed= 0; // 공격 속도
        var moveSpeed= 0; // 이동 속도
        var newArPen= 0; // 방어구 관통력
        var adPen= 0; // 물리 관통력
        var spPen= 0; // 마법 관통력 ( % 붙은 마관)
        var spPen2 = 0; // 마법 관통력 ( 정수 마관)
        var crit= 0; // 치명타 확률
        var newOmniVamp= 0; // 모든 피해 흡혈
        var cooltime= 0; // 스킬 가속
        var hpRegen= 0; // 기본 체력 재생
        var mpRegen= 0; // 기본 마나 재생
        var fullHp= 0; // 체력
        var fullMp= 0; // 마나

        var itemStats = [adValue, apValue, armor, spellBlock, attackSpeed, moveSpeed, newArPen, adPen, spPen, spPen2, crit, newOmniVamp, cooltime, hpRegen, mpRegen, fullHp, fullMp];

        test.sendItemStats =function(){
            return itemStats;
        }

        var itemPriceL= 0; // 아이템 값을 담아줄 변수
        // 아이템 이미지 클릭 이벤트
        // 아이템 이미지 버튼을 클릭하면,선택한 아이템 박스에 이미지를 설정하고,다시 클릭하면 초기화
        function setItemClickEvent(itemButton,item,iBoxIndex){
            itemButton.click(function(){ // 마우스 클릭 시 이벤트
                var imgSrc= $(this).find('img').attr('src');
                //
                var description = item.description;
                var stats = description.match(/<stats>(.*?)<\/stats>/);
                var statValues = [];
                //
                //

                itemPriceL += item.gold.total; // 아이템의 total값을 누산
                $("#left-cost-value").text(": "+ itemPriceL + " 원"); //아이템 가격을 HTML에 적용
                if (stats) {
                    statValues = stats[1].split('<br>');
                }
                // console.log("아이템 가격 ::", item.gold.total);
                //


                // // 이미 신화 아이템이 선택된 상태라면 팝업을 띄우고 함수 종료
                // if(selectedMythicItem.some((selectedMythicItem,index)=>
                //     selectedMythicItem !== null && index !== iBoxIndex)){
                //     alert("신화 아이템은 하나만 선택 가능 합니다.");
                //     return;
                // }
                // 이미 신화 아이템이 선택된 상태라면 팝업을 띄우고 함수 종료 End

                // 이미지와 X버튼을 생성
                clickItemBox.html("<img src='"+imgSrc+"'><button class='itemRemoveBtn'>X</button>");
                $("#newBox").remove();// 아이템을 선택하면 #newBox제거
                $("#left-item-filter-options").hide();
                // 이미지와 X버튼을 생성 End

                // X버튼 클릭 이벤트
                clickItemBox.find('.itemRemoveBtn').click(function(){
                    $(this).siblings('img').remove(); // 현재 'X' 버튼과 동일한 iBox의 이미지만 제거
                    $(this).remove(); // 'X' 버튼 제거
                    selectedMythicItem[iBoxIndex] = null;
                    itemPriceL -= item.gold.total; // 아이템제거시 변수에서도 같은 값을 빼줌
                    console.log("아이템 제거!! :: ", itemPriceL);
                    $("#left-cost-value").text(": "+ itemPriceL + " 원"); //아이템 가격을 HTML에 적용
                    // $("#left-cost-value").text(":0원");// 아이템 가격 초기화


                    statValues.forEach(function(stat) {
                        // 스탯 값을 빼는 로직 추가
                        var statName = stat.match(/^\s*(.*?)\s*<attention>/)[1];
                        var statValue = stat.match(/<attention>(.*?)<\/attention>/)[1];

                        switch (statName) {
                            case "공격력":
                                adValue -= parseInt(statValue);
                                itemStats[0] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateAttackStats(level);
                                break;
                            case "주문력":
                                apValue -= parseInt(statValue);
                                // $("#abilityPowerL").next().text(apValue);
                                itemStats[1] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateAbilitypowerStats(level);
                                break;
                            case "방어력":
                                armor -= parseInt(statValue);
                                // $("#armorL").next().text(armor);
                                itemStats[2] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateArmorStats(level);
                                break;
                            case "마법 저항력":
                                spellBlock -= parseInt(statValue);
                                // $("#spellBlockL").next().text(spellBlock);
                                itemStats[3] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateSpellBlockStats(level);
                                break;
                            case "공격 속도":
                                attackSpeed -= parseInt(statValue);
                                // $("#attackSpeedL").next().text(attackSpeed);
                                itemStats[4] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateAttackspeedStats(level);
                                break;
                            case "이동 속도":
                                moveSpeed -= parseInt(statValue);
                                itemStats[5] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateMovespeedStats(level);
                                break;
                            case "방어구 관통력":
                                newArPen -= parseInt(statValue);
                                $("#arPenL").next().text(newArPen);
                                break;
                            case "물리 관통력":
                                adPen -= parseInt(statValue);
                                $("#adPenL").next().text(adPen);
                                break;
                            case "마법 관통력":
                                if (statValue.includes('%')){
                                    spPen -= parseInt(statValue);
                                    $("#spPenL").next().text( spPen +'%' +"("+ spPen2+")");
                                    break;
                                }else {
                                    spPen2 -= parseInt(statValue);
                                    $("#spPenL").next().text(spPen + '%' +"("+ spPen2+")");
                                    break;
                                }

                            case "치명타 확률":
                                crit -= parseInt(statValue);
                                // $("#critL").next().text(crit);
                                break;
                            case "모든 피해 흡혈":
                                newOmniVamp -= parseInt(statValue);
                                $("#vampL").next().text(newOmniVamp + "%");
                                break;
                            case "스킬 가속":
                                cooltime -= parseInt(statValue);
                                // log();
                                $("#coolTimeL").next().text(cooltime);
                                break;
                            case "기본 체력 재생":
                                hpRegen -= parseInt(statValue);
                                // $("#hpRegenL").next().text(hpRegen);
                                itemStats[12] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateHpregenStats(level);
                                break;
                            case "기본 마나 재생":
                                mpRegen -= parseInt(statValue);
                                // $("#mpRegenL").next().text(mpRegen);
                                itemStats[13] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateMpregenStats(level);
                                break;
                            case "체력":
                                fullHp -= parseInt(statValue);
                                itemStats[14] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateHpStats(level);
                                break;
                            case "마나":
                                fullMp -= parseInt(statValue);
                                itemStats[15] -= parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateMpStats(level);
                                break;
                        }
                    })
                });
                // X버튼 클릭 이벤트 End

                selectedMythicItem[iBoxIndex] = item; // 신화 아이템 선택 상태 업데이트



                // 아이템 스탯 정보 출력
                statValues.forEach(function (stat) {
                    var statName = stat.match(/^\s*(.*?)\s*<attention>/)[1];
                    var statValue = stat.match(/<attention>(.*?)<\/attention>/)[1];

                    if (statName && statValue) {
                        switch (statName) {
                            case "공격력":
                                adValue += parseInt(statValue);
                                itemStats[0] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateAttackStats(level);
                                break;
                            case "주문력":
                                apValue += parseInt(statValue);
                                // $("#abilityPowerL").next().text(apValue);
                                itemStats[1] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateAbilitypowerStats(level);
                                break;
                            case "방어력":
                                armor += parseInt(statValue);
                                // $("#armorL").next().text(armor);
                                itemStats[2] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateArmorStats(level);
                                break;
                            case "마법 저항력":
                                spellBlock += parseInt(statValue);
                                // $("#spellBlockL").next().text(spellBlock);
                                itemStats[3] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateSpellBlockStats(level);
                                break;
                            case "공격 속도":
                                attackSpeed += parseInt(statValue);
                                // $("#attackSpeedL").next().text(attackSpeed);
                                itemStats[4] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateAttackspeedStats(level);
                                break;
                            case "이동 속도":
                                moveSpeed += parseInt(statValue);
                                itemStats[5] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateMovespeedStats(level);
                                break;
                            case "방어구 관통력":
                                newArPen += parseInt(statValue);
                                $("#arPenL").next().text(newArPen);
                                break;
                            case "물리 관통력":
                                adPen += parseInt(statValue);
                                $("#adPenL").next().text(adPen);
                                break;
                            case "마법 관통력":
                                if (statValue.includes('%')){
                                    spPen += parseInt(statValue);
                                    $("#spPenL").next().text( spPen +'%' +"("+ spPen2+")");
                                    break;
                                }else {
                                    spPen2 += parseInt(statValue);
                                    $("#spPenL").next().text(spPen + '%' +"("+ spPen2+")");
                                    break;
                                }

                            case "치명타 확률":
                                crit += parseInt(statValue);
                                // $("#critL").next().text(crit);
                                break;
                            case "모든 피해 흡혈":
                                newOmniVamp += parseInt(statValue);
                                $("#vampL").next().text(newOmniVamp + "%");
                                break;
                            case "스킬 가속":
                                cooltime += parseInt(statValue);
                                // log();
                                $("#coolTimeL").next().text(cooltime);
                                break;
                            case "기본 체력 재생":
                                hpRegen += parseInt(statValue);
                                // $("#hpRegenL").next().text(hpRegen);
                                itemStats[12] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateHpregenStats(level);
                                break;
                            case "기본 마나 재생":
                                mpRegen += parseInt(statValue);
                                // $("#mpRegenL").next().text(mpRegen);
                                itemStats[13] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateMpregenStats(level);
                                break;
                            case "체력":
                                fullHp += parseInt(statValue);
                                itemStats[14] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateHpStats(level);
                                break;
                            case "마나":
                                fullMp += parseInt(statValue);
                                itemStats[15] += parseInt(statValue);
                                var level = test.getSelectedLevel();
                                test.updateMpStats(level);
                                break;
                        }
                    }
                });
                // 아이템 스탯 정보 출력 End
            });

            itemButton.mouseover(function(){    //마우스 올리면 이벤트
                var imgSrc = $(this).find('img').attr('src');
                var imgName = imgSrc.split('/').pop();    //이미지 파일 이름 추출

                // 마우스를 올린 이미지와 API에서 가져 온 아이템의 이미지가 일치하는지 확인
                if(imgName === item.image.full) {
                    var description = item.description;

                    description = description.replace(/(<([^>]+)>)/ig, ""); // HTML 태그 제거
                    description = description.replace(/\r?\n|\r/g, ""); // 필요 없는 문자 제거


                    var newDiv = $("<div></div>"); // 새로운 div 박스 생성 및 description 해당 위치에 출력


                    var buttonOffset = $(this).offset();
                    var mouseX = event.pageX - buttonOffset.left; // x 좌표에 이미지 버튼의 폭을 더해 우측에 보이도록 함
                    var mouseY = event.pageY - buttonOffset.bottom; // y 좌표에 이미지 버튼의 높이를 더해 하단에 보이도록 함

                    newDiv.css({
                        'position': 'absolute',
                        'top': mouseY,
                        'left': mouseX,
                        'background-color': 'white',
                        'border': '1px solid black',
                        'padding': '5px',
                        'z-index': '9999'
                    });


                    newDiv.html('<p>' + description + '</p>'); // description 정보 업데이트


                    $(this).find('div').remove(); // #newBox -> div 초기화
                    $(this).append(newDiv); // #newBox에 div 박스 추가


                    // #newBox의 width와 height 값과 비교하여 newDiv 위치 조정
                    var newBoxOffset = $("#newBox").offset();
                    var newBoxWidth = $("#newBox").outerWidth();
                    var newBoxHeight = $("#newBox").outerHeight();
                    var newDivWidth = newDiv.outerWidth();
                    var newDivHeight = newDiv.outerHeight();

                    // newDiv가 #newBox의 width를 넘어가려고 할 경우
                    if (mouseX + newDivWidth > newBoxOffset.left + newBoxWidth) {
                        mouseX = -newDivWidth; // 이벤트 핸들러의 좌측 하단을 기준으로 한 x 좌표
                        newDiv.css('left', mouseX); // newDiv 위치를 이벤트 핸들러의 우측 하단으로 조정
                    }

                    // newDiv가 #newBox의 height를 넘어가려고 할 경우
                    if (mouseY + newDivHeight > newBoxOffset.top + newBoxHeight) {
                        mouseY = event.pageY - buttonOffset.top - newDivHeight; // 이벤트 핸들러의 우측 하단을 기준으로 한 y 좌표
                        newDiv.css('top', mouseY); // newDiv 위치를 이벤트 핸들러의 우측 상단으로 조정
                    }


                }
            });
            itemButton.mouseout(function(){     // 마우스 내리면 이벤트
                $(this).find('div').remove(); // description 정보 초기화
            });
        }
        // 아이템 이미지 클릭 이벤트 End

    }
});



$(document).mouseup(function(e){
    var container = $("#newBox");
    var filterOptions = $("#left-item-filter-options");

    //newBox와 item_pan를 제외한 부분을 클릭 했을 경우 newBox닫기
    if(!container.is(e.target) && container.has(e.target).length===0
        && !$(".item_pan").is(e.target)
        && $(".item_pan").has(e.target).length===0){
        container.remove();
        filterOptions.hide(); // left-item-filter-options 숨기기
    }
});