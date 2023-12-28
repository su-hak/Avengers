let test = {};
let testR = {};
//
function selectObject(colElement) {

    var clickedDiv = currentTarget;
    var imgElement = clickedDiv.querySelector("img");
    var imgId = imgElement.id;
    console.log("클릭한 div의 img id:", imgId);
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
            console.log("item 공속 ::::",itemAsNum);
            if (selectedLevel > 1) {
                let coefficient = dtch[0].stats.attackspeedperlevel;

                a[0] = dtch[0].stats.attackspeed;
                let level = 1;
                // if(asstatValue != null){
                for (let i = 1; i < selectedLevel; i++) {
                    a[i] = ((itemAsNum+(+(coefficient*0.01)*(selectedLevel-1))*(0.7025+(0.0175*(selectedLevel-1))))*a[0]) + a[0];
                }

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

        test.updateHpStats = function(selectedLevel) {
            var itemHp = items.fullHp;
            console.log(selectedLevel, dtch[0].stats.hp);
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
            test.setRealMp(0);

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
            // var itemMs = items.moveSpeed;
            console.log(dtch[0].stats.movespeed + items.moveSpeedInt);
            console.log((dtch[0].stats.movespeed + items.moveSpeedInt) * (items.moveSpeedPer * 0.01));
            a = (dtch[0].stats.movespeed + items.moveSpeedInt) + ((dtch[0].stats.movespeed + items.moveSpeedInt) * (items.moveSpeedPer * 0.01));
            statValues['moveSpeedL'] = Math.round(a);
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
        test.updateSpPenStats = function() {
            let a = 0;
            var itemSpPen = items.spPen;
            var itemSpPen2 = items.spPen2;
            a = a + itemSpPen;
            statValues['spPenL'] = a + '% (' + items.spPen2 + ')';
            for (const id in statValues) {
                const element = document.getElementById(id);
                let value = statValues[id];
                if (element) {
                    element.nextElementSibling.textContent = value;
                }
            }
        }


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
        let cost = 0;
        test.setRealMp = function(getCost){
            // console.log("mp :::",statValues['mp']);
            var realMp = statValues['mp'];
            cost += getCost;
            const targetMp = document.getElementById("left-rsc-value");
            var costMp = statValues['mp'] - cost;// 데미지 입은만큼 빼기
            if (costMp <= 0 && statValues['mp'] != 0) {
                Swal.fire({
                    text: "마나를 다 써버리셨군요... \n 리필 해드릴게요!!",
                    showCancelButton: true,
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        costMp = realMp;
                        cost = 0;
                        targetMp.textContent = costMp;
                        var maxWidth = 100; // 최대 width 값 (100%)
                        var currentWidth = (costMp / realMp) * maxWidth; // 현재 width 값 계산
                        var mpBar = document.getElementById("left-rsc-bar"); // mp 바 엘리먼트 가져오기
                        mpBar.style.width = currentWidth + "%"; // width 값 업데이트
                    }
                });
            } else {
                targetMp.textContent = costMp;
                var maxWidth = 100; // 최대 width 값 (100%)
                var currentWidth = (costMp / realMp) * maxWidth; // 현재 width 값 계산
                var mpBar = document.getElementById("left-rsc-bar"); // mp 바 엘리먼트 가져오기
                mpBar.style.width = currentWidth + "%"; // width 값 업데이트
            }
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
        test.updateSpPenStats();

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
            test.updateSpPenStats();
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

// 더미 스탯, 아이템
let rArea = {}; // 오른쪽 관련 함수
let itemsR = {}; // 오른쪽 아이템
// itemsR.fullHpR = 0; // 오른쪽 아이템으로 증가할 hp수치
rArea.updateArmorStatsR = function () {
    var itemAr = itemsR.armor;
    var armorR = document.getElementById("armorR");
    var nextTd = armorR.nextElementSibling;

    var currentValue = parseInt(nextTd.innerHTML);
    var newValue = 30 + itemAr;
    nextTd.innerHTML = newValue;
}
rArea.updateSpellBlockStatsR = function (){
    var itemSp = itemsR.spellBlock;
    var spellBlockR = document.getElementById("spellBlockR");
    var nextTd = spellBlockR.nextElementSibling;

    var currentValue = parseInt(nextTd.innerHTML);
    var newValue = 30 + itemSp;
    nextTd.innerHTML = newValue;
}
rArea.updateHpStatsR = function() {
    var itemHpR = itemsR.fullHp;
    // console.log(dtch[0].stats.hp);
    const totalHp = document.getElementById("right-hp-total");
    // let defaultHp = parseInt(document.getElementById("right-hp-total").innerText);
    let defaultHp = 1000;
    let a = itemHpR + defaultHp;
    totalHp.textContent = a;
    rArea.r_SetRealHp(0);
}
let damage = 0;
// rArea.r_SetRealHp = function(getDamage){
//     // console.log("hp :::",statValues['hp']);
//     var realHp = parseInt(document.getElementById('right-hp-total').innerText);
//     damage += getDamage;
//     const targetHp = document.getElementById("right-hp-value");
//     var damageHp = realHp - damage;// 데미지 입은만큼 빼기
//     if (damageHp <= 0) {
//         Swal.fire("적을 처치 하였슴둥 \n 체력을 회복합니다.");
//         damageHp = realHp;
//         damage = 0;
//     }
//     targetHp.textContent = damageHp;
//     var maxWidth = 100; // 최대 width 값 (100%)
//     var currentWidth = (damageHp / realHp) * maxWidth; // 현재 width 값 계산
//     var hpBar = document.getElementById("right-hp-bar"); // hp 바 엘리먼트 가져오기
//     hpBar.style.width = currentWidth + "%"; // width 값 업데이트
//
// }
rArea.r_SetRealHp = function(getDamage){
    // console.log("hp :::",statValues['hp']);
    var realHp = parseInt(document.getElementById('right-hp-total').innerText);
    damage += getDamage;
    const targetHp = document.getElementById("right-hp-value");
    var damageHp = realHp - damage;// 데미지 입은만큼 빼기
    if (damageHp <= 0) {
        Swal.fire({
            title: "적을 처치 하였슴둥",
            text: "체력을 회복합니다.",
            showCancelButton: true,
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                damageHp = realHp;
                damage = 0;
                targetHp.textContent = damageHp;
                var maxWidth = 100; // 최대 width 값 (100%)
                var currentWidth = (damageHp / realHp) * maxWidth; // 현재 width 값 계산
                var hpBar = document.getElementById("right-hp-bar"); // hp 바 엘리먼트 가져오기
                hpBar.style.width = currentWidth + "%"; // width 값 업데이트
            }
        });
    } else {
        targetHp.textContent = damageHp;
        var maxWidth = 100; // 최대 width 값 (100%)
        var currentWidth = (damageHp / realHp) * maxWidth; // 현재 width 값 계산
        var hpBar = document.getElementById("right-hp-bar"); // hp 바 엘리먼트 가져오기
        hpBar.style.width = currentWidth + "%"; // width 값 업데이트
    }
}





// 광규햄 js
// 챔피언 정보를 받아오는 함수
function getChampionList() {
    $.ajax({
        type: "get",
        url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json",
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
        url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion/"+id+".json",
        success: function (data) {
            var dtch = Object.values(data.data); // 챔피언 데이터 배열 추출
            console.log("dtch :" + dtch);
            callback(dtch); // 결과를 콜백 함수로 전달합니다.
            console.log("callback(dtch) :" + dtch);
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

function searchItemR() {
    var searchText = $("#right-item-search").val().toLowerCase();
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
    rArea.updateHpStatsR();

    // 검색창에 입력이 있을 때마다 검색 수행
    $("#champion-search").on("input", searchChampion);
    $("#left-item-search").on("input", searchItem);
    $("#right-item-search").on("input", searchItemR);
}

// 페이지 로드 시 초기화 함수 호출
$(document).ready(initialize);




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

            // 스킬 정보 불러올 때 스킬 레벨을 0로 설정
            skillLevelInput.value = 0;

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

// function setupSkillControls(skillIndex) {
//     var skillInputId = "left-skill" + skillIndex + "-num";
//     var skillLevelInput = document.getElementById(skillInputId);
//     // 초기 변수 설정
//
//     // 레벨 다운 버튼 이벤트 처리
//     document.getElementById("left-skill" + skillIndex + "-numDown").addEventListener("click", function () {
//         if (skillLevelInput.value > 0) {
//             console.log("totalSkillLevel :::", totalSkillLevel);
//             skillLevelInput.value = parseInt(skillLevelInput.value) - 1;
//         }
//     });
//     // 레벨 업 버튼 이벤트 처리
//     document.getElementById("left-skill" + skillIndex + "-numUp").addEventListener("click", function () {
//         if (skillLevelInput.value < parseInt(skillLevelInput.getAttribute("max"))) {
//             skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
//             // console.log("현재 스킬레벨은 :::",skillLevelInput.value);
//
//         }
//     });
// }
function setupSkillControls(skillIndex) {
    var skillInputId = "left-skill" + skillIndex + "-num";
    var skillLevelInput = document.getElementById(skillInputId);

    // 레벨 다운 버튼 이벤트 처리
    document.getElementById("left-skill" + skillIndex + "-numDown").addEventListener("click", function () {
        if (skillLevelInput.value > 0) {
            skillLevelInput.value = parseInt(skillLevelInput.value) - 1;
            calculateTotalSkillLevel();
        }
    });

    // 레벨 업 버튼 이벤트 처리
    // document.getElementById("left-skill" + skillIndex + "-numUp").addEventListener("click", function () {
    //     if (skillLevelInput.value < parseInt(skillLevelInput.getAttribute("max"))) {
    //         var totalLevel = calculateTotalSkillLevel();
    //         var level = test.getSelectedLevel();
    //         if (totalLevel > level) {
    //             Swal.fire("스킬의 레벨합이 선택한 레벨보다 높습니다. \n 챔피언 레벨을 더 올려주세요.");
    //         } else {
    //             if (skillIndex === 4){
    //                 if(level === 6 || level === 11 || level === 16){
    //                     console.log("조건 충족");
    //                     skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
    //                 }
    //                 // else{
    //                 //     Swal.fire("궁극기 찍을 레벨이 아니다");
    //                 // }
    //             }else{
    //
    //                 skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
    //             }
    //         }
    //     }
    // });
    document.getElementById("left-skill" + skillIndex + "-numUp").addEventListener("click", function () {
        if (skillLevelInput.value < parseInt(skillLevelInput.getAttribute("max"))) {
            var totalLevel = calculateTotalSkillLevel();
            var level = test.getSelectedLevel();
            if (skillIndex === 4) {
                if (level >= 6 && skillLevelInput.value == 0) {
                    skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
                } else if (level >= 11 && skillLevelInput.value == 1) {
                    skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
                } else if (level >= 16 && skillLevelInput.value == 2) {
                    skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
                } else {
                    Swal.fire("궁 찍을수 있는 레벨이 아니지렁~");
                }
            } else {
                if (totalLevel > level) {
                    Swal.fire("스킬의 레벨합이 선택한 레벨보다 높습니다. \n 챔피언 레벨을 더 올려주세요.");
                } else {
                    skillLevelInput.value = parseInt(skillLevelInput.value) + 1;
                }
            }
        }
    });



}

// 스킬 레벨의 합 계산 함수
function calculateTotalSkillLevel() {
    var totalSkillLevel = 1;
    for (var i = 1; i <= 4; i++) {
        var skillInputId = "left-skill" + i + "-num";
        var skillLevelInput = document.getElementById(skillInputId);
        totalSkillLevel += parseInt(skillLevelInput.value);
    }
    console.log("4개 스킬 레벨의 합은", totalSkillLevel);
    return totalSkillLevel;
}



// function totalSkillLevel(){
//     let totalSkillLevel = 0;
//
// // 스킬 버튼들의 id를 배열로 저장
//     const skillIds = ['left-skill1', 'left-skill2', 'left-skill3', 'left-skill4'];
//
// // for문을 사용하여 각 스킬 버튼에 이벤트 처리
//     for (let i = 0; i < skillIds.length; i++) {
//         const skillId = skillIds[i];
//         const skillButton = document.getElementById(`${skillId}-numUp`);
//
//         skillButton.addEventListener('click', function() {
//             const skillLevel = parseInt(document.getElementById(`${skillId}-num`).value);
//             return totalSkillLevel += skillLevel;
//         });
//     }
// }

// 스킬 레벨 업 다운 버튼 E --------------------
// 스킬 정보 업데이트 E ------------------------------



// 수학 햄 js
let items = {};
// let savedItems = []; // 아이템 저장 배열
var savedItems = new Array(6);
var itemGold = new Array(6);
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
    url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
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
                && allItems.maps["11"]===true // 소환사의 협곡 맵("11")만 출력
                && !allItems.tags.includes("Jungle")
                && !allItems.tags.includes("Consumable")
                && !allItems.description.includes('퀘스트')
                && !allItems.description.includes('장신구')
                && allItems.description.indexOf('<stats></stats>') === -1; // <stats></stats> 값이 null인 경우 출력하지 않음
        });


        console.log(filterItems);
        // 아이템 필터링 End

        // 아이템 설명창 띄우기
        function showDescription(data, index) {
            // 팝오버 내용 설정
            var itemName = data.name;
            var description = data.description;

            description = description.replace(/(<(?!br\s*\/?)[^>]+)>/ig, ""); // HTML 태그 제거
            description = description.replace(/\r?\n|\r/g, ""); // 필요 없는 문자 제거
            // console.log("description",description)

            // 문장 뒤에 <br> 추가
            description = description.replace(/\.(?!\s*<br>)/g, ".<br>");

            // 팝오버 생성 및 표시
            $('#item-img-' + index).popover({
                title: itemName,
                content: description,
                trigger: 'manual', // 수동으로 트리거
                html: true,
                placement: 'bottom',
                // container: 'body'
            }).popover('show');
        }
        // 아이템 설명창 띄우기 E


        filterItems.forEach((data, index) => {
            var itemBox = $("<div>").addClass("item_box_list");
            var itemImg = $("<img>", {
                id: 'item-img-' + index,
                src: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + data.image.full,
                alt: data.name + " 이미지",
                class: "item-img",
                value: index
            });
            var itemName = $("<p>").addClass("item-name").text(data.name);

            // 마우스 오버 이벤트에 아이템 설명창 팝오버 표시 함수 연결
            itemImg.mouseover(function () {
                showDescription(data, index);
            });

            // 마우스 나가기 이벤트에  아이템 설명창 팝오버 숨기기
            itemImg.mouseout(function () {
                $('#item-img-' + index).popover('hide');
            });

            itemBox.append(itemImg);
            itemBox.append($("<br>"));
            itemBox.append(itemName);
            $("#item-list").append(itemBox);
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

// 템 제거 시 스텟 초기화
function isSavedItemsDefault() {
    var isSavedItemsNull = checkSavedItemsNull();


    if(isSavedItemsNull == true){
        items.adValue= 0;
        items.apValue= 0;
        items.armor= 0;
        items.spellBlock= 0;
        items.attackSpeed= 0;
        items.moveSpeedInt= 0;
        items.moveSpeedPer = 0;
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
    }else {
        deleteItem();
    }
}

function itemGoldUpdate() {
    var totalGold = 0;
    for(var i=0; i<itemGold.length; i++){
        totalGold += itemGold[i];
        $("#left-cost-value").text(": "+ totalGold + " 원"); //아이템 가격을 HTML에 적용
        console.log("for문 gold :: ", itemGold[i]);
    }
}

// 아이템 선택
$("#item-list").click(function (e) {

    console.log(itemGold);
    if (e.target.id === 'emptyBtn') {
        console.log("삭제 버튼 클릭하였습니다.");

        delete savedItems[callIdx];
        itemGold[callIdx] = 0;

        itemStatCalc();
        isSavedItemsDefault();
        console.log("아이템 잔여 확인 :: ",savedItems);
        $("#iBox" + callIdx).css("background-image", "none");
        $("#iBox" + callIdx).html('<iconify-icon icon="ic:baseline-plus" style="color: #ff00e1;" width="50" height="50"></iconify-icon>');
        console.log("저장된 스탯::: ", items);
        itemGoldUpdate();
        itemFilterControl();


    } else if (e.target.classList.contains('item-img')) {
        console.log(333,)
        console.log("아이템 클릭하였습니다.", e.target.getAttribute("value"));
        // callIdx = $(e.target).closest('.iBox').index();
        console.log("savedItems :: ",savedItems);
        var itemData = filterItems[e.target.getAttribute("value")];
        var imgSrc = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + filterItems[e.target.getAttribute("value")].image.full;

        $('#iBox' + callIdx).empty();
        $('#iBox' + callIdx).css({
            'background-image': 'url(' + imgSrc + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'contain'
        });
        savedItems[callIdx] = itemData;
        itemGold[callIdx] = savedItems[callIdx].gold.total; // 아이템의 total값을 누산
        console.log("items ::::", items);
        const searchInput = document.getElementById('left-item-search');
        searchInput.value = '';
        searchItem();
        itemStatCalc(); // 아이템 스텟 값 함수 호출
        deleteItem();
        // console.log("savedItems", savedItems);
        itemGoldUpdate();
        itemFilterControl();
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
    test.updateSpPenStats();
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
    items.moveSpeedInt= 0;
    items.moveSpeedPer = 0;
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
                        // items.moveSpeed += parseInt(statValue);
                        // test.updateMovespeedStats();
                        // break;
                        if (statValue.includes('%')){
                            items.moveSpeedPer += parseInt(statValue);
                            test.updateMovespeedStats();
                            break;
                        }else {
                            items.moveSpeedInt += parseInt(statValue);
                            test.updateMovespeedStats();
                            break;
                        }
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
                            // $("#spPenL").next().text( items.spPen +'%' +"("+ items.spPen2+")");
                            test.updateSpPenStats();
                            break;
                        }else {
                            items.spPen2 += parseInt(statValue);
                            // $("#spPenL").next().text(items.spPen + '%' +"("+ items.spPen2+")");
                            test.updateSpPenStats();
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

// 아이템 생성 컨테이너 바깥 영역 클릭 시 닫기
$(document).mouseup(function(e){
    var containerL=$("#left-item-filter-options");
    var containerR=$("#right-item-filter-options");

// newBox와 item_pan를 제외한 부분을 클릭 했을 경우 newBox닫기
    if(!containerL.is(e.target)
        && containerL.has(e.target).length===0
        && !$("#plusItem").is(e.target)
        && $("#plusItem").has(e.target).length===0){
        $("#left-item-filter-options").css("display", "none");
    }
    if(!containerR.is(e.target)
        && containerR.has(e.target).length===0
        && !$("#plusItemR").is(e.target)
        && $("#plusItemR").has(e.target).length===0){
        $("#right-item-filter-options").css("display", "none");
    }
});

// 왼쪽 아이템 끝

// 오른쪽 아이템 추가
// let saveditemsR = []; // 아이템 저장 배열
var saveditemsR = new Array(6);
var itemGoldR = new Array(6);
itemGoldR.fill(0);
let allitemsR = {};
let filteritemsR = {};
let callIdxR = 0; //선택한 아이템 칸 idx
let itemPriceR= 0; // 아이템 값을 담아줄 변수

// 스탯 값을 담을 변수 선언
itemsR.adValue= 0;
itemsR.apValue= 0;
itemsR.armor= 0;
itemsR.spellBlock= 0;
itemsR.attackSpeed= 0;
itemsR.moveSpeed= 0;
itemsR.newArPen= 0;
itemsR.adPen= 0;
itemsR.spPen= 0;
itemsR.spPen2= 0;
itemsR.crit= 0;
itemsR.newOmniVamp= 0;
itemsR.cooltime= 0;
itemsR.hpRegen= 0;
itemsR.mpRegen= 0;
itemsR.fullHp= 0;
itemsR.fullMp= 0;


// API 가져오기
$.ajax({
    type: "get",
    url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
    success: function (data) {
        allitemsR = Object.values(data.data); //아이템 데이터 배열 추출

        /* ===========아이템 가나다 순 정렬 start ==========*/
        allitemsR.sort(function(a,b){
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
        filteritemsR = allitemsR.filter(function(allitemsR){
            return !allitemsR.requiredChampion // 챔피언전용템제외
                // && itemsR.description.includes('rarityMythic') // 신화급 아이템만 출력
                && allitemsR.inStore!==false // 스토어: false인 item 제외
                && allitemsR.maps["11"]===true // 소환사의 협곡 맵("11")만 출력
                && !allitemsR.tags.includes("Jungle")
                && !allitemsR.tags.includes("Consumable")
                && !allitemsR.description.includes('퀘스트')
                && !allitemsR.description.includes('장신구')
                && allitemsR.description.indexOf('<stats></stats>') === -1;
        });


        console.log(filteritemsR);
        // 아이템 필터링 End


        // 아이템 설명창 띄우기
        function showDescriptionR(data, index) {
            // 팝오버 내용 설정
            var itemName = data.name;
            var description = data.description;

            description = description.replace(/(<(?!br\s*\/?)[^>]+)>/ig, ""); // HTML 태그 제거
            description = description.replace(/\r?\n|\r/g, ""); // 필요 없는 문자 제거
            // console.log("description",description)

            // 문장 뒤에 <br> 추가
            description = description.replace(/\.(?!\s*<br>)/g, ".<br>");

            // 팝오버 생성 및 표시
            $('#item-imgR-' + index).popover({
                title: itemName,
                content: description,
                trigger: 'manual', // 수동으로 트리거
                html: true,
                placement: 'bottom',
                // container: 'body'
            }).popover('show');
        }
        // 아이템 설명창 띄우기 E


        // filteritemsR에 대한 코드 추가
        filteritemsR.forEach((data, index) => {
            var itemBox = $("<div>").addClass("item_box_list");
            var itemImg = $("<img>", {
                id: 'item-imgR-' + index,
                src: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + data.image.full,
                alt: data.name + " 이미지",
                class: "item-img",
                value: index
            });
            var itemName = $("<p>").addClass("item-name").text(data.name);

            // 마우스 오버 이벤트에 팝오버 표시 함수 연결
            itemImg.mouseover(function () {
                showDescriptionR(data, index, '#item-listR');
            });

            // 마우스 나가기 이벤트에 팝오버 숨기기
            itemImg.mouseout(function () {
                $('#item-imgR-' + index).popover('hide');
            });

            itemBox.append(itemImg);
            itemBox.append($("<br>"));
            itemBox.append(itemName);
            $("#item-listR").append(itemBox);
        });


    },
    error : function (){
        console.log("API 데이터 가져오는 중 오류 발생");
    }
});
function checkSaveditemsNullR() {
    for (var i = 0; i < saveditemsR.length; i++) {
        if (saveditemsR[i] != null) {
            return false; // null이 아닌 값이 하나라도 존재하면 false 반환
        }
    }
    return true; // 모든 값이 null이면 true 반환
}

// 템 제거 시 스텟 초기화
function isSaveditemsDefaultR() {
    var isSaveditemsNullR = checkSaveditemsNullR();


    if(isSaveditemsNullR == true){
        itemsR.adValue= 0;
        itemsR.apValue= 0;
        itemsR.armor= 0;
        itemsR.spellBlock= 0;
        itemsR.attackSpeed= 0;
        itemsR.moveSpeedInt= 0;
        itemsR.moveSpeedPer = 0;
        itemsR.newArPen= 0;
        itemsR.adPen= 0;
        itemsR.spPen= 0;
        itemsR.spPen2= 0;
        itemsR.crit= 0;
        itemsR.newOmniVamp= 0;
        itemsR.cooltime= 0;
        itemsR.hpRegen= 0;
        itemsR.mpRegen= 0;
        itemsR.fullHp= 0;
        itemsR.fullMp= 0;
        deleteItemR();
    }else{
        deleteItemR();
    }
}

function itemGoldUpdateR() {
    var totalGoldR = 0;
    for(var i=0; i<itemGoldR.length; i++){
        totalGoldR += itemGoldR[i];
        $("#right-cost-value").text(": "+ totalGoldR + " 원"); //아이템 가격을 HTML에 적용
        console.log("for문 goldR :: ", itemGoldR[i]);
    }
}

// 아이템 선택
$("#item-listR").click(function (e) {


    if (e.target.id === 'emptyBtnR') {
        console.log("삭제 버튼 클릭하였습니다.");

        delete saveditemsR[callIdxR];
        itemGoldR[callIdxR-6] = 0;

        itemstatCalcR();
        isSaveditemsDefaultR();
        console.log("아이템 잔여 확인 :: ",saveditemsR);
        $("#iBox" + callIdxR).css("background-image", "none");
        $("#iBox" + callIdxR).html('<iconify-icon icon="ic:baseline-plus" style="color: #ff00e1;" width="50" height="50"></iconify-icon>');
        console.log("저장된 스탯::: ", itemsR);
        itemGoldUpdateR();
        itemFilterControlR();



    } else if (e.target.classList.contains('item-img')) {
        console.log("아이템 클릭하였습니다.", e.target.getAttribute("value"));
        // callIdx = $(e.target).closest('.iBox').index();
        console.log("saveditemsR :: ",saveditemsR);
        var itemDataR = filteritemsR[e.target.getAttribute("value")];
        var imgSrcR = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + filteritemsR[e.target.getAttribute("value")].image.full;

        $('#iBox' + callIdxR).empty();
        $('#iBox' + callIdxR).css({
            'background-image': 'url(' + imgSrcR + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'contain'
        });
        saveditemsR[callIdxR] = itemDataR;
        console.log(saveditemsR[callIdxR].gold.total);
        itemGoldR[callIdxR-6] = saveditemsR[callIdxR].gold.total; // 아이템의 total값을 누산
        const searchInputR = document.getElementById('right-item-search');
        searchInputR.value = '';
        searchItemR();
        itemstatCalcR(); // 아이템 스텟 값 함수 호출
        deleteItemR();
        // console.log("saveditemsR", saveditemsR);
        itemGoldUpdateR();
        itemFilterControlR();
        console.log("itemsR ::::", itemsR);
    }

});

// 아이템 스탯 업데이트
function deleteItemR(){
    rArea.updateArmorStatsR();
    rArea.updateHpStatsR();
    rArea.updateSpellBlockStatsR();
}


// 십자 이미지와 그 밖의 버튼 모두 하나의 버튼에 동작 하게 설정
$("#plusItemR").click(function (e){
    // 오른쪽 챔피언 구현되면 주석 풀기
    // if (!test.choose) {
    //     Swal.fire("챔프 선택부터 혀라");
    //     return; // test.choose가 false인 경우 함수 실행 중단
    // }
    console.log("plusItemR 클릭 !", e.type);
    if(e.target.dataset.idx != undefined){ // callIdx 안 십자 바깥 영역 클릭 시
        callIdxR = e.target.dataset.idx; // 해당 idx 값을 callIdx에 저장
        itemFilterControlR();

    }else if(e.target.tagName == 'ICONIFY-ICON' && e.target.parentElement.dataset.idx != undefined){ // 십자 이미지 클릭 시
        callIdxR = e.target.parentElement.dataset.idx; // 해당 idx 값을 callIdx에 저장
        itemFilterControlR();

    }else if($(this).find('li img').length > 0 ) {
        // callIdx = $(e.target).closest('.iBox').index();
        itemFilterControlR();
        // 아이템을 가지고 있어도 템 목록 창 열릴 수 있게 설정
    }else if(e.target.id === 'right-item-filter-options') {
        // left-item-search를 클릭한 경우 아무 동작도 수행하지 않도록 합니다.
        return;
    }
    console.log(e.target.tagName , e.target.classList[0]);
    console.log(callIdxR,"callIdxR")

});


// 아이템 목록 창 출력
function itemFilterControlR() {
    if($("#right-item-filter-options").css("display") == "block"){
        $("#right-item-filter-options").css("display", "none");
    }else {
        $("#right-item-filter-options").css("display", "block");
    }

}



// 스탯 계산 함수
function itemstatCalcR() {
    itemsR.adValue= 0;
    itemsR.apValue= 0;
    itemsR.armor= 0;
    itemsR.spellBlock= 0;
    itemsR.attackSpeed= 0;
    itemsR.moveSpeedInt= 0;
    itemsR.moveSpeedPer = 0;
    itemsR.newArPen= 0;
    itemsR.adPen= 0;
    itemsR.spPen= 0;
    itemsR.spPen2= 0;
    itemsR.crit= 0;
    itemsR.newOmniVamp= 0;
    itemsR.cooltime= 0;
    itemsR.hpRegen= 0;
    itemsR.mpRegen= 0;
    itemsR.fullHp= 0;
    itemsR.fullMp= 0;

    saveditemsR.forEach(function (data){

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
                // var level = testR.getSelectedLevel();
                switch (statName) {
                    case "공격력":
                        itemsR.adValue += parseInt(statValue);
                        // testR.updateAttackStats(level);
                        console.log("itemsR",itemsR)
                        break;
                    case "주문력":
                        itemsR.apValue += parseInt(statValue);
                        // testR.updateAbilitypowerStats(level);
                        break;
                    case "방어력":
                        itemsR.armor += parseInt(statValue);
                        rArea.updateArmorStatsR();
                        // testR.updateArmorStats(level);
                        break;
                    case "마법 저항력":
                        itemsR.spellBlock += parseInt(statValue);
                        rArea.updateSpellBlockStatsR();
                        // testR.updateSpellBlockStats(level);
                        break;
                    case "공격 속도":
                        itemsR.attackSpeed += parseInt(statValue);
                        // testR.updateAttackspeedStats(level);
                        break;
                    case "이동 속도":
                        // itemsR.moveSpeed += parseInt(statValue);
                        // testR.updateMovespeedStats();
                        // break;
                        if (statValue.includes('%')){
                            itemsR.moveSpeedPer += parseInt(statValue);
                            // testR.updateMovespeedStats();
                            break;
                        }else {
                            itemsR.moveSpeedInt += parseInt(statValue);
                            // testR.updateMovespeedStats();
                            break;
                        }
                    case "방어구 관통력":
                        itemsR.newArPen += parseInt(statValue);
                        // testR.updateArPenStats();
                        break;
                    case "물리 관통력":
                        itemsR.adPen += parseInt(statValue);
                        // testR.updateAdPenStats();
                        break;
                    case "마법 관통력":
                        // if (statValue.includes('%')){
                        //     itemsR.spPen += parseInt(statValue);
                        //     break;
                        // }else {
                        //     itemsR.spPen2 += parseInt(statValue);
                        //     break;
                        // }
                        if (statValue.includes('%')){
                            itemsR.spPen += parseInt(statValue);
                            // $("#spPenL").next().text( itemsR.spPen +'%' +"("+ itemsR.spPen2+")");
                            // testR.updateSpPenStats();
                            break;
                        }else {
                            itemsR.spPen2 += parseInt(statValue);
                            // $("#spPenL").next().text(itemsR.spPen + '%' +"("+ itemsR.spPen2+")");
                            // testR.updateSpPenStats();
                            break;
                        }
                    case "치명타 확률":
                        itemsR.crit += parseInt(statValue);
                        break;
                    case "모든 피해 흡혈":
                        itemsR.newOmniVamp += parseInt(statValue);
                        // testR.updateNewOmniVampStats();
                        // $("#vampL").next().text(itemsR.newOmniVamp + "%");
                        break;
                    case "스킬 가속":
                        itemsR.cooltime += parseInt(statValue);
                        // testR.updateCooltimeStats();
                        break;
                    case "기본 체력 재생":
                        itemsR.hpRegen += parseInt(statValue);
                        // testR.updateHpregenStats(level);
                        break;
                    case "기본 마나 재생":
                        itemsR.mpRegen += parseInt(statValue);
                        // testR.updateMpregenStats(level);
                        break;
                    case "체력":
                        itemsR.fullHp += parseInt(statValue);
                        rArea.updateHpStatsR();
                        // testR.updateHpStats(level);
                        break;
                    case "마나":
                        itemsR.fullMp += parseInt(statValue);
                        // testR.updateMpStats(level);
                        break;
                }
            }
        });
    })

}

// HTML 테이블에서 stat_value의 값을 가져와 배열에 넣는 함수
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
            damageText = `(Q) <span style='color: #eeff00;'>${damage}</span>의 데미지를 입혔습니다.<br>`;
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
            damageText = `(E) <span style='color: #eeff00;'>${damage}</span>의 데미지를 입혔습니다.<br>`;
        } else if (skillIndex === 3) {
            const damage = Math.round((Number(championsArray[championIndex].abilities.R[0].effects[0].leveling[0].modifiers[0].values[level - 1]) + (Number(championsArray[championIndex].abilities.R[0].effects[0].leveling[0].modifiers[1].values[0] * 0.01)) * Number(values[1])) * 100 / (100 + Number(valuesR[3]) - (Number(valuesR[3]) * (Number(parseInt(values[7])) * 0.01) + Number(Magic_Penetration))));
            const skillMp = championsArray[74].abilities.R[0].cost.modifiers[0].values[level - 1];
            rArea.r_SetRealHp(damage);
            test.setRealMp(skillMp);
            damageText = `(R) <span style='color: #eeff00;'>${damage}</span>의 데미지를 입혔습니다.<br>`;
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

    button.addEventListener('click', function() {
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
    logPan.innerHTML += "(평타) <span style='color: #eeff00;'>" + damage + "</span>" + "의 데미지를 입혔습니다. <br>";
});



// 챔피언 변경시 데미지로그 초기화
const championButton = document.getElementById('champion-btn');
const logPanElement = document.getElementById('left-log_pan');
championButton.addEventListener('click', function () {
    // 여기서 log_pan의 내용을 초기화
    logPanElement.innerHTML = '';
});

// 데이미 로그 하단 갱신
function scrollToBottom() {
    var chatContainer = document.getElementById("left-log_pan");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
setInterval(scrollToBottom, 1000); // 1초마다 스크롤을 맨 아래로 이동





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

$('#defaultAll').click(function (){
    defaultAll();
    itemStatCalc();
    isSavedItemsDefault();
    itemGoldUpdate();

})

function defaultAll() {
    const resetLevel = document.getElementById('champ_lv');
    resetLevel.value = 1;

    savedItems = Array(6); // 아이템 초기화
    itemGold = Array(6); // 아이템 골드 초기화 (nan으로 표시)
    itemGold.fill(0); // 골드를 0 으로 초기화

    // 저장 된 스킬 레벨
    for (var i = 0; i < 4; i++) {
        var skillInputId = "left-skill" + (i + 1) + "-num"; // 스킬 레벨 표시 id 변수선언
        var skillLevelInput = document.getElementById(skillInputId);
        skillLevelInput.value = 0;
    }

    // for문 돌면서 모든 iBox 선택
    for (let callIdx = 0; callIdx < 6; callIdx++) {
        $("#iBox" + callIdx).css("background-image", "none");
        $("#iBox" + callIdx).html('<iconify-icon icon="ic:baseline-plus" style="color: #ff00e1;" width="50" height="50"></iconify-icon>');
    }
}
