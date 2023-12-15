// 챔피언 정보 ajax로 받아오기

let champ; // 전역 변수로 선언



$.ajax({
    type: "get",
    url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json",
    success: function (data) {
        var champions = Object.values(data.data); // 챔피언 데이터 배열 추출
        champ = champions;

        champ.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        console.log(champ);
    }
});
// end

// // 챔피언 초상화 클릭후 search에서 이름으로 검색하는 함수들
// $(document).ready(function () {
//     enableSearch("#left-champ-search");
// });
//
// function enableSearch(parent) {
//     var searchBar = $(parent)
//     searchBar.on("keyup", function() {
//         var input = $(this).val();
//         // searchItems(input, parent);
//     });
// }

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
//     function selectObject(colElement) {
// //         console.log("selectObject 함수 호출 성공");
// //         // 해당 div 요소를 가져옵니다.
// //         // var colDiv = document.querySelector('.col-3.bg-hover');
// //         var colDiv = document.querySelector('.col-3.bg-hover');
// // // 이미지 요소를 가져옵니다.
// //         var imgElement = colDiv.querySelector('img');
// //         var name = imgElement.id;
// //         // var info = champ.id.equals(imgElement);
// //         console.log(name);
// //         // var info = champ.find(name);
// //         var info = champ.find(function(champion) {
// //             return champion.key === name;
// //         });
// //         console.log(info);
// //         // console.log(champ);
//
//             var clickedDiv = currentTarget;
//             var imgElement = clickedDiv.querySelector("img");
//             var imgId = imgElement.id;
//             console.log("클릭한 div의 img id:", imgId);
//             // 필요한 작업을 수행합니다.
//
//
//     }
// 선택한 챔피언의 div img id값으로 선택
function selectObject(event) {
    var clickedDiv = event.currentTarget;
    var imgElement = clickedDiv.querySelector("img");
    var imgId = imgElement.id;
    console.log("클릭한 div의 img id:", imgId);
    var newSrc = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/"+imgId+".png"; // 새로운 이미지 소스 URL
    searchChampById(imgId);
    changeLeftChampPortraitSrc(newSrc);
    // 필요한 작업을 수행합니다.

}

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
function setChampSpells(id){
    console.log("setChampSpells 진입성공");
    detailedChamp(id, function(dtch) {
        for(var i=0; i<4; i++){
            console.log(dtch[0].spells[i]);
        }
        // console.log(dtch[0].spells);


    });
}

// 선택한 레벨 받아오기
function getSelectedLevel() {
    const selectElement = document.getElementById('champ_lv');
    const selectedValue = selectElement.value;
    return selectedValue;
}


// 선택한 챔피언의 스탯 긁어오기
// function setChampStats(id) {
//     console.log("setChampStats 진입성공");
//
//     detailedChamp(id, function(dtch) {
//         const baseAttackDamage = dtch[0].stats.attackdamage; // 기본 공격력 값 저장
//         let attackDamageMultiplier = 0; //
//
//         const statValues = {
//             'attackdamage': baseAttackDamage,
//             'abilitypower': 0,
//             'armor': dtch[0].stats.armor,
//             'spellblock': dtch[0].stats.spellblock,
//             'attackspeed': dtch[0].stats.attackspeed,
//             'movespeed': dtch[0].stats.movespeed,
//             'mpregen': dtch[0].stats.mpregen,
//             'hpregen': dtch[0].stats.hpregen,
//             'crit': dtch[0].stats.crit
//         };
//
//         function updateStats(selectedLevel) {
//             if (selectedLevel > 1) {
//                 for (let i = 1; i < selectedLevel; i++) {
//                     attackDamageMultiplier += Math.round(baseAttackDamage * (dtch[0].stats.attackdamageperlevel * 0.01));
//
//                 }
//                 statValues['attackdamage'] = baseAttackDamage + attackDamageMultiplier;
//             } else {
//                 statValues['attackdamage'] = baseAttackDamage;
//             }
//
//             for (const id in statValues) {
//                 const element = document.getElementById(id);
//                 let value = statValues[id]; // 소수점 이하를 제거합니다
//                 value = Math.floor(value);
//
//                 if (element) {
//                     element.nextElementSibling.textContent = value;
//                 }
//             }
//         }
//         // 초기 레벨 설정
//         const selectedLevel = getSelectedLevel();
//         updateStats(selectedLevel);
//
//         // 레벨 변경 시 업데이트
//         document.getElementById('champ_lv').onchange = function() {
//             const selectedLevel = getSelectedLevel();
//             console.log(selectedLevel); // 선택된 레벨 값 출력
//             updateStats(selectedLevel);
//         };
//     });
// }


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
            'mpregen': dtch[0].stats.mpregen,
            'hpregen': dtch[0].stats.hpregen,
            'crit': dtch[0].stats.crit
        };

        function updateAttackStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.attackdamageperlevel;
                let a = [];
                a[0] = baseAttackDamage;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = a[i-1]+(coefficient* (0.65+(0.035*(i+1))));
                }
                // statValues['attackdamage'] = Math.round(a[selectedLevel - 1]);
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['attackdamage'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel === 1) {
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
                a[0] = dtch[0].stats.armor;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = a[i-1]+(coefficient* (0.65+(0.035*(i+1))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['armor'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel === 1) {
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
        function updateSpellblockStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.spellblockperlevel;
                let a = [];
                a[0] = dtch[0].stats.spellblock;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = a[i-1]+(coefficient* (0.65+(0.035*(i+1))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['spellblock'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel === 1) {
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
        function updateAttackspeedStats(selectedLevel) {
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.attackspeedperlevel;
                let a = [];
                a[0] = dtch[0].stats.attackspeed;
                let level = 1;
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = a[i-1]+(coefficient* (0.65+(0.035*(i+1))));
                }
                const value = new Decimal(a[selectedLevel - 1]);
                const roundedValue = value.toDecimalPlaces(2);
                const realRoundedValue = roundedValue.toDecimalPlaces(1);
                statValues['attackspeed'] = Math.round(realRoundedValue);
                // statValues['attackdamage'] = realRoundedValue;
                console.log(a);
            } else if (selectedLevel === 1) {
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

// 초기 레벨 설정
        const selectedLevel = getSelectedLevel();
        updateAttackStats(selectedLevel);
        updateArmorStats(selectedLevel);
        updateSpellblockStats(selectedLevel);
        updateAttackspeedStats(selectedLevel)

// 레벨 변경 시 업데이트
        document.getElementById('champ_lv').onchange = function() {
            const selectedLevel = getSelectedLevel();
            console.log(selectedLevel); // 선택된 레벨 값 출력
            updateAttackStats(selectedLevel);
            updateArmorStats(selectedLevel);
            updateSpellblockStats(selectedLevel);
            updateAttackspeedStats(selectedLevel)
        };
    });
}






// 챔피언 선택시 초상화 해당 챔피언으로 변경하는 함수
function changeLeftChampPortraitSrc(newSrc) {
    console.log(newSrc);
    var imgElement = document.getElementById("left-champ-portrait");
    if (imgElement) {
        imgElement.src = newSrc;
        console.log("left-champ-portrait 이미지의 src가 변경되었습니다.");
    } else {
        console.log("left-champ-portrait 이미지를 찾을 수 없습니다.");
    }
}


// 사용 예시
// api속 챔피언 갯수만큼 박스 생성
function createBoxes() {

    var boxes = champ; // 예시로 사용되는 배열
    var searchInput = document.getElementById("left-champ-search");
    var searchText = searchInput.value.toLowerCase();

    var boxContainer = document.getElementById("boxContainer");
    boxContainer.innerHTML = ""; // 기존 요소 초기화
    for(var i=0; boxes.length; i++){

        let championName = boxes[i].name;
        // console.log(boxes[i].name);

        // 예시로 사용되는 챔피언 이름
        // console.log(championName);

        // 검색어가 존재하고 현재 챔피언 이름에 검색어가 포함되지 않으면 요소를 생성하지 않음
        if (searchText && !championName.toLowerCase().includes(searchText)) {
            return;
        }

        var colElement = document.createElement("div");
        colElement.classList.add("col-3", "bg-hover", "pt-2");
        colElement.addEventListener("click", selectObject);
        // selectObject(colElement);
        // colElement.addEventListener("click", selectObject);
        // colElement.setAttribute("onclick", "selectObject()");

        // colElement.addEventListener("click", function() {
        //     selectObject(boxes[i].name);
        // });

        var imgElement = document.createElement("img");
        imgElement.src = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/"+champ[i].id+".png";
        imgElement.classList.add("portrait", "sprite");
        // imgElement.style.width = "90%"; // 이미지 크기 지정
        // imgElement.style.height = "90%"; // 이미지 크기 지정
        imgElement.id = champ[i].id; // 이미지에 id 할당
        colElement.appendChild(imgElement);


        var rowElement = document.createElement("div");
        rowElement.classList.add("row");

        var pElement = document.createElement("p");
        pElement.classList.add("text-center", "champ-name", "mx-auto");
        pElement.textContent = champ[i].name;
        rowElement.appendChild(pElement);

        colElement.appendChild(rowElement);

        boxContainer.appendChild(colElement);
    }

}

// 챔피언 초상화 클릭후 search에서 이름으로 검색하는 함수들
$(document).ready(function () {
    enableSearch("#left-champ-search");

});

function enableSearch(parent) {
    var searchBar = $(parent)
    searchBar.on("keyup", function() {
        var input = $(this).val();
        searchItems(input, parent);
    });
}

function searchItems(input, parent) {
    var filter = input.toUpperCase();
    // Select all .col-3.bg-hover where the parent is a row preceded by #id
    var candidates = $(parent).find(".col-3.bg-hover");
    while ($(candidates).length == 0) {
        parent = $(parent).parent();
        candidates = parent.find(".col-3.bg-hover");
    }
    for (var i = 0; i < candidates.length; ++i) {
        if ($(candidates[i]).attr("filtered") == "true") {
            continue;
        }
        var img = $(candidates[i]).find("img");
        var name = $(candidates[i]).find("p");
        var text = name.text();
        if (text.toUpperCase().indexOf(filter) > -1) {
            $(candidates[i]).show();
        }
        else {
            $(candidates[i]).hide();
        }
    }
}
// end

