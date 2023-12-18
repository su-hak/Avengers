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
function getSelectedLevel() {
    const selectElement = document.getElementById('champ_lv');
    const selectedValue = selectElement.value;
    return selectedValue;
}


// 선택한 챔피언의 스탯 긁어오기
function setChampStats(id) {
    console.log("setChampStats 진입성공");

    detailedChamp(id, function(dtch) {
        const baseAttackDamage = dtch[0].stats.attackdamage; // 기본 공격력 값 저장
        const statValues = {
            'attackdamage': baseAttackDamage,
            'abilitypower': 0,
            'armor': dtch[0].stats.armor,
            'spellblock': dtch[0].stats.spellblock,
            'attackspeed': dtch[0].stats.attackspeed,
            'movespeed': dtch[0].stats.movespeed,
            'mpregen': Math.round(dtch[0].stats.mpregen),
            'hpregen': Math.round(dtch[0].stats.hpregen),
            'crit': dtch[0].stats.crit,
            'hp' : dtch[0].stats.hp
        };

        function updateAttackStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.attackdamageperlevel;
                let a = [];
                let itemAt = 0;
                a[0] = baseAttackDamage;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))))+itemAt;
                }
                // statValues['attackdamage'] = Math.round(a[selectedLevel - 1]);
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['attackdamage'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['attackdamage'] = baseAttackDamage;
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        function updateArmorStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.armorperlevel;
                let a = [];
                let itemAr = 0;
                a[0] = dtch[0].stats.armor;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))))+itemAr;
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['armor'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                console.log("1레벨 진입");
                statValues['armor'] = dtch[0].stats.armor;
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        function updateSpellBlockStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.spellblockperlevel;
                let a = [];
                let itemSb = 0;
                a[0] = dtch[0].stats.spellblock;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))))+itemSb;
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['spellblock'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['spellblock'] = dtch[0].stats.spellblock;
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        function updateHpregenStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.hpregenperlevel;
                let a = [];
                let itemHr = 0;
                a[0] = dtch[0].stats.hpregen;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))))+itemHr;
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['hpregen'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['hpregen'] = Math.round(dtch[0].stats.hpregen);
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        function updateMpregenStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.mpregenperlevel;
                let a = [];
                let itemMr = 0;
                a[0] = dtch[0].stats.mpregen;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = (a[i-1]+(coefficient* (0.65+(0.035*(i+1)))))+itemMr;
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['mpregen'] = Math.round(realRoundedValue);
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['mpregen'] = Math.round(dtch[0].stats.mpregen);
            }
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }

        function updateAttackspeedStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.attackspeedperlevel;
                let a = [];
                console.log("testjs assval :" , asstatValue);
                // let cleanedValue = asstatValue.replace('%', '');
                let itemAs = 0
                if(asstatValue == 0){
                    itemAs = 0;
                }else{
                    itemAs = asstatValue * 0.01;
                }
                a[0] = dtch[0].stats.attackspeed;
                let level = 1;
                if(asstatValue != null){
                    for (let i = 1; i < selectedLevel; i++) {
                        a[i] = ((itemAs+(+(coefficient*0.01)*(selectedLevel-1))*(0.7025+(0.0175*(selectedLevel-1))))*a[0]) + a[0];
                    }
                }else{
                    itemAs = 0;
                    for (let i = 1; i < selectedLevel; i++) {
                        a[i] = ((itemAs+(+(coefficient*0.01)*(selectedLevel-1))*(0.7025+(0.0175*(selectedLevel-1))))*a[0]) + a[0];
                    }
                }

                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = roundToThreeDecimalPlaces(value);
                // const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['attackspeed'] = roundedValue;
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel < 2) {
                statValues['attackspeed'] = dtch[0].stats.attackspeed;
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
        //
        // }
        function updateHpStats(selectedLevel) {
            const totalHp = document.getElementById("left-hp-total");
            if (totalHp) { // totalHp가 null이 아닌 경우에만 처리
                if (selectedLevel > 1) {
                    let coefficient = dtch[0].stats.hpperlevel;
                    let a = [];
                    let itemHp = 0;
                    a[0] = dtch[0].stats.hp;
                    let level = 1;
                    for (let i = 1; i < selectedLevel; i++) {
                        a[i] = (a[i - 1] + Math.round((coefficient * (0.65 + (0.035 * (i + 1)))) + itemHp));
                    }
                    const value = new Decimal(a[selectedLevel - 1]);
                    const roundedValue = value.toDecimalPlaces(2);
                    const realRoundedValue = roundedValue.toDecimalPlaces(1);
                    statValues['hp'] = Math.round(realRoundedValue);
                    console.log(a);
                } else if (selectedLevel < 2) {
                    statValues['hp'] = Math.round(dtch[0].stats.hp);
                }
                // for (const id in statValues) {
                //     const element = document.getElementById(id);
                //     let value = statValues[id];
                //     if (element) {
                //         totalHp.textContent = value;
                //     }
                // }
                totalHp.textContent = statValues[id];
            }
        }


        function updateCritStats(){
            var critValueElement = document.getElementById('crit_value');
            var criticalCheckbox = document.getElementById('critical');

            criticalCheckbox.addEventListener('change', function() {
                if (criticalCheckbox.checked) {
                    critValueElement.textContent = '100';
                } else {
                    critValueElement.textContent = '0';
                }
            });
        }
        function updateMovespeedStats(){
            let itemMs = 0;
            let a = 0;
            a = dtch[0].stats.movespeed + itemMs;
            statValues['movespeed'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }
        function updateAbilitypowerStats(){
            let itemAp = 0;
            let a = 0;
            a = a+itemAp;
            statValues['abilitypower'] = a;
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }

// 초기 레벨 설정
        const selectedLevel = getSelectedLevel();
        updateAttackStats(selectedLevel);
        updateArmorStats(selectedLevel);
        updateSpellBlockStats(selectedLevel);
        updateAttackspeedStats(selectedLevel);
        updateHpregenStats(selectedLevel);
        updateMpregenStats(selectedLevel);
        updateHpStats(selectedLevel)
        updateCritStats();
        updateMovespeedStats();
        updateAbilitypowerStats();

// 레벨 변경 시 업데이트
        document.getElementById('champ_lv').onchange = function() {
            const selectedLevel = getSelectedLevel();
            console.log(selectedLevel); // 선택된 레벨 값 출력
            updateAttackStats(selectedLevel);
            updateArmorStats(selectedLevel);
            updateSpellBlockStats(selectedLevel);
            updateAttackspeedStats(selectedLevel);
            updateHpregenStats(selectedLevel);
            updateMpregenStats(selectedLevel);
            updateHpStats(selectedLevel)
            updateCritStats();
            updateMovespeedStats();
            updateAbilitypowerStats();
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


// 광규햄 js
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
    // 선택한 챔피언에 대한 동작을 추가하세요.
    console.log("선택한 챔피언 ID:", champion.id);
    // 이미지 업데이트
    updateChampionButtonImage(champion.id);
    // 스킬 정보 업데이트
    setChampSpells(champion.id);
    setChampStats(champion.id);
    getSelectedLevel();
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
}

// 페이지 로드 시 초기화 함수 호출
$(document).ready(initialize);

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
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    tooltip.style.display = 'block';
}

function hideTooltip() {
    var tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}