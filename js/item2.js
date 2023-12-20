let items = {};
let savedItems = []; // 아이템 저장 배열
let allItems = {};
let filterItems = {};
let clickItemBox;// 아이템 출력 기능 구현
let callIdx = 0; //선택한 아이템 칸 idx


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
        allItems = Object.values(data.data);//아이템 데이터 배열 추출

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
        filterItems=allItems.filter(function(allItems){
            return !allItems.requiredChampion // 챔피언전용템제외
                // && items.description.includes('rarityMythic') // 신화급 아이템만 출력
                && allItems.inStore!==false // 스토어: false인 item 제외
                && allItems.maps["11"]===true; // 소환사의 협곡 맵("11")만 출력
        });

        console.log(filterItems);

        // 아이템 필터링 End
        filterItems.forEach((data, index) =>{
            var itemBox = $("<div>").addClass("item-box");
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
            $("#item-list").append(itemBox);
        });

    },
    error : function (){
        console.log("API 데이터 가져오는 중 오류 발생");
    }
});

$("#plusItem").click(function (e){
    if(e.target.dataset.idx != undefined){
        callIdx = e.target.dataset.idx;
    }else if(e.target.parentElement.dataset.idx != undefined){
        callIdx = e.target.parentElement.dataset.idx;
    }
    itemFilterControl();

});

$("#item-list").click(function (e) {
    if (e.target.id == 'emptyBtn') {
        console.log("삭제 버튼");
        savedItems.splice(callIdx, 1);
        console.log("아이템 삭제 확인 :: ",savedItems);
        $("#iBox" + callIdx).empty();
    } else if (e.target.classList.contains('item-img')) {
        console.log("이미지 클릭", e.target.getAttribute("value"));
        var itemData = filterItems[e.target.getAttribute("value")];
        var imgSrc = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + filterItems[e.target.getAttribute("value")].image.full;


        $('#iBox' + callIdx).html("<img src='"+imgSrc+"'>"); // 아이템 출력
        savedItems[callIdx] = itemData;
        itemStatCalc();
        console.log(savedItems);


    }
});

function itemFilterControl() {
    if($("#left-item-filter-options").css("display") == "block"){
        $("#left-item-filter-options").css("display", "none");
    }else {
        $("#left-item-filter-options").css("display", "block");

    }

}

//스탯 계산 함수
function itemStatCalc() {
    savedItems.forEach(function (data){

        var description = data.description;
        var stats = description.match(/<stats>(.*?)<\/stats>/);

        var statValues = [];
        if (stats) {
            statValues = stats[1].split('<br>');
        }

        statValues.forEach(function (stat) {
            //TODO : 스탯값 있는지 확인 로직 추가

            var statName = stat.match(/^\s*(.*?)\s*<attention>/)[1];
            var statValue = stat.match(/<attention>(.*?)<\/attention>/)[1];

            if (statName && statValue) {
                switch (statName) {
                    case "공격력":
                        items.adValue += parseInt(statValue);
                        break;
                    case "주문력":
                        items.apValue += parseInt(statValue);
                        break;
                    case "방어력":
                        items.armor += parseInt(statValue);
                        break;
                    case "마법 저항력":
                        items.spellBlock += parseInt(statValue);
                        break;
                    case "공격 속도":
                        items.attackSpeed += parseInt(statValue);
                        break;
                    case "이동 속도":
                        items.moveSpeed += parseInt(statValue);
                        break;
                    case "방어구 관통력":
                        items.newArPen += parseInt(statValue);
                        break;
                    case "물리 관통력":
                        items.adPen += parseInt(statValue);
                        break;
                    case "마법 관통력":
                        if (statValue.includes('%')){
                            items.spPen += parseInt(statValue);
                            break;
                        }else {
                            items.spPen2 += parseInt(statValue);
                            break;
                        }
                    case "치명타 확률":
                        items.crit += parseInt(statValue);
                        break;
                    case "모든 피해 흡혈":
                        items.newOmniVamp += parseInt(statValue);
                        break;
                    case "스킬 가속":
                        items.cooltime += parseInt(statValue);
                        break;
                    case "기본 체력 재생":
                        items.hpRegen += parseInt(statValue);
                        break;
                    case "기본 마나 재생":
                        items.mpRegen += parseInt(statValue);
                        break;
                    case "체력":
                        items.fullHp += parseInt(statValue);
                        break;
                    case "마나":
                        items.fullMp += parseInt(statValue);
                        break;
                }
            }
        });
    })
}