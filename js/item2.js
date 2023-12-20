let items;
let savedItems = []; // 아이템 저장 배열
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
                var parentContainer = "left-item-filter-options";
                var container = "itemContainer" ;

                if ($("#" + container).children().length === 1) {
                    $("#" + container).append('<div id="newBox"></div>');
                } else if (clickItemBox && clickItemBox[0] === this) {
                    $("#newBox").remove();
                    $("#" + parentContainer).hide(); // left-item-filter-options 숨기기
                    return;
                }
                clickItemBox = $(this); // 현재 클릭한 아이템 박스를 저장
                $("#" + parentContainer).show(); // left-item-filter-options 열고 닫기
                printItems(filterItems); // 아이템 출력을 새로운 박스 안으로 변경

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

        // 아이템 필터링
        var filterItems=items.filter(function(items){
            return !items.requiredChampion // 챔피언전용템제외
                // && items.description.includes('rarityMythic') // 신화급 아이템만 출력
                && items.inStore!==false // 스토어: false인 item 제외
                && items.maps["11"]===true; // 소환사의 협곡 맵("11")만 출력
        });
        // 아이템 필터링 End

        // SaveHere 버튼 클릭 이벤트
        $(".saveHere").click(function() {
            for (var i = 1; i <= 6; i++) {
                savedItems[i-1] = selectedMythicItem[i-1]; // 아이템 저장
                console.log(11,savedItems[i-1])
                console.log(22,selectedMythicItem[i-1])
                $("#iBox" + i).empty(); // iBox 비우기
                selectedMythicItem[i-1] = null; // 선택된 아이템 초기화
            }
            statReset(); // 스텟 값 초기화
        });

        // LoadThere 버튼 클릭 이벤트
        $(".loadThere").click(function() {
            for (var i = 1; i <= 6; i++) {
                if (savedItems[i-1]) { // 저장된 아이템이 있다면
                    var item = savedItems[i-1];

                    setItemClickEvent($("#iBox" + i), item, i-1); // 아이템 클릭 이벤트 설정
                    $("#iBox" + i).html('<img src="http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/' + item.image.full + '">'); // 이미지 출력
                    $("#iBox" + i).click(); // 클릭 이벤트 실행
                }
            }
        });

        // description 값 확인
        console.log(filterItems) // 필터링된 전체 아이템 목록

        function printItems(filterItems){
            $("#newBox").empty(); // newBox의 초기 값

            for(var i=0; i<filterItems.length; i++){
                var item = filterItems[i];
                var imgURL= "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/"+item.image.full;
                var itemButton = $("<button type='button' class='item_box'><img src='"+imgURL+"'alt='"+item.name+"'></button>"+item.name)


                // 아이템 이미지 버튼에 클릭 이벤트를 설정
                setItemClickEvent(itemButton,item,clickItemBox.attr('id').replace('iBox','')-1);

                // 버튼에 이미지와 텍스트 추가
                $("#newBox").append(itemButton);
            }
        }
        // 각 아이템 박스마다 선택된 신화 아이템을 저장하는 배열
        var selectedMythicItem= [null,null,null,null,null,null]

        // 스탯 값을 담을 변수 선언
        var adValue= 0;
        var apValue= 0;
        var armor= 0;
        var spellBlock= 0;
        var attackSpeed= 0;
        var moveSpeed= 0;
        var newArPen= 0;
        var adPen= 0;
        var spPen= 0;
        var spPen2= 0;
        var crit= 0;
        var newOmniVamp= 0;
        var cooltime= 0;
        var hpRegen= 0;
        var mpRegen= 0;
        var fullHp= 0;
        var fullMp= 0;

        function statReset() {
            // 저장하기 스텟 값 초기화
            adValue = 0;
            apValue = 0;
            armor= 0;
            spellBlock= 0;
            attackSpeed= 0;
            moveSpeed= 0;
            newArPen= 0;
            adPen= 0;
            spPen= 0;
            spPen2= 0;
            crit= 0;
            newOmniVamp= 0;
            cooltime= 0;
            hpRegen= 0;
            mpRegen= 0;
            fullHp= 0;
            fullMp= 0;

            // 화면에 표시되는 스텟 값 초기화
            $("#attackDamageL").next().text(adValue);
            $("#abilityPowerL").next().text(apValue);
            $("#armorL").next().text(apValue);
            $("#spellBlockL").next().text(apValue);
            $("#attackSpeedL").next().text(apValue);
            $("#moveSpeedL").next().text(apValue);
            $("#arPenL").next().text(apValue);
            $("#adPenL").next().text(apValue);
            $("#spPenL").next().text(apValue);
            $("#critL").next().text(apValue);
            $("#vampL").next().text(apValue);
            $("#coolTimeL").next().text(apValue);
            $("#hpRegenL").next().text(apValue);
            $("#mpRegenL").next().text(apValue);
        }


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
                if (stats) {
                    statValues = stats[1].split('<br>');
                }
                //
                console.log("iBox" + (iBoxIndex + 1) + "에서 선택한 아이템:", item); // 선택한 아이템 확인을 위한 console.log 추가


                // // 이미 신화 아이템이 선택된 상태라면 팝업을 띄우고 함수 종료
                // if(selectedMythicItem.some((selectedMythicItem,index)=>
                //     selectedMythicItem !== null && index !== iBoxIndex)){
                //     alert("신화 아이템은 하나만 선택 가능 합니다.");
                //     return;
                // }
                // 이미 신화 아이템이 선택된 상태라면 팝업을 띄우고 함수 종료 End


                clickItemBox.html("<img src='"+imgSrc+"'>"); // 아이템 출력
                $("#newBox").remove(); // 아이템을 선택하면 #newBox 제거
                $("#left-item-filter-options").hide();
                console.log("클릭박스",clickItemBox)
                selectedMythicItem[iBoxIndex] = item; // 신화 아이템 선택 상태 업데이트
                console.log("new1",selectedMythicItem[iBoxIndex])

                // emptyBtn 클릭 이벤트
                $('#emptyBtn').click(function(){
                    console.log("new2",selectedMythicItem[iBoxIndex])
                    selectedMythicItem[iBoxIndex] = null; // 고른 아이템 clickItemBox에서 null 값으로.
                    console.log("new23",selectedMythicItem[iBoxIndex])

                    clickItemBox.empty();
                    // $(("iBox" + (iBoxIndex + 1))).empty();
                    // $(this).remove(); // 'X' 버튼 제거
                    $(".cost p").text(":0원"); // 아이템 가격 초기화
                    console.log("iBox" + (iBoxIndex + 1) + "에서 지운 아이템:", item);

                // 만들고 나서 default 버튼 만들고 $("#newBox").empty(); 이걸로 디폴트 가능 // newBox의 초기 값



                            statValues.forEach(function (stat) {
                                // 스탯 값을 빼는 로직 추가
                                console.log("##########1#############")

                                var statName = stat.match(/^\s*(.*?)\s*<attention>/)[1];
                                var statValue = stat.match(/<attention>(.*?)<\/attention>/)[1];
                                console.log("##########2#############")

                                if (statName && statValue) {
                                    console.log("##########3#############")

                                    switch (statName) {
                                        case "공격력":
                                            adValue -= parseInt(statValue);
                                            $("#attackDamageL").next().text(adValue);
                                            break;
                                        case "주문력":
                                            apValue -= parseInt(statValue);
                                            $("#abilityPowerL").next().text(apValue);
                                            break;
                                        case "방어력":
                                            armor -= parseInt(statValue);
                                            $("#armorL").next().text(armor);
                                            break;
                                        case "마법 저항력":
                                            spellBlock -= parseInt(statValue);
                                            $("#spellBlockL").next().text(spellBlock);
                                            break;
                                        case "공격 속도":
                                            attackSpeed -= parseInt(statValue);
                                            $("#attackSpeedL").next().text(attackSpeed);
                                            break;
                                        case "이동 속도":
                                            moveSpeed -= parseInt(statValue);
                                            $("#moveSpeedL").next().text(moveSpeed);
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
                                            if (statValue.includes('%')) {
                                                spPen -= parseInt(statValue);
                                                $("#spPenL").next().text(spPen + '%' + "(" + spPen2 + ")");
                                                break;
                                            } else {
                                                spPen2 -= parseInt(statValue);
                                                $("#spPenL").next().text(spPen + '%' + "(" + spPen2 + ")");
                                                break;
                                            }
                                        case "치명타 확률":
                                            crit -= parseInt(statValue);
                                            $("#critL").next().text(crit);
                                            break;
                                        case "모든 피해 흡혈":
                                            newOmniVamp -= parseFloat(statValue);
                                            $("#vampL").next().text(newOmniVamp + "%");
                                            break;
                                        case "스킬 가속":
                                            cooltime -= parseInt(statValue);
                                            $("#coolTimeL").next().text(cooltime);
                                            break;
                                        case "기본 체력 재생":
                                            hpRegen -= parseInt(statValue);
                                            $("#hpRegenL").next().text(hpRegen);
                                            break;
                                        case "기본 마나 재생":
                                            mpRegen -= parseInt(statValue);
                                            $("#mpRegenL").next().text(mpRegen);
                                            break;
                                        case "체력":
                                            fullHp -= parseInt(statValue);
                                            break;
                                        case "마나":
                                            fullMp -= parseInt(statValue);
                                            break;
                                        default:
                                            $(".item_box").empty();
                                    }
                                    console.log("##########4#############")

                                }
                                console.log("##########5#############")
                            })
                    console.log("##########6#############", clickItemBox)
                }); // X버튼 클릭 이벤트 End
                console.log("##########7#############")


                selectedMythicItem[iBoxIndex] = item; // 신화 아이템 선택 상태 업데이트

                var itemPrice= item.gold.total; // 아이템의 total값을 추출
                $(".cost p").text(": "+ itemPrice + " 원"); //아이템 가격을 HTML에 적용


                // 아이템 스탯 정보 출력
                statValues.forEach(function (stat) {
                    var statName = stat.match(/^\s*(.*?)\s*<attention>/)[1];
                    var statValue = stat.match(/<attention>(.*?)<\/attention>/)[1];

                    if (statName && statValue) {
                        switch (statName) {
                            case "공격력":
                                adValue += parseInt(statValue);
                                $("#attackDamageL").next().text(adValue);
                                break;
                            case "주문력":
                                apValue += parseInt(statValue);
                                $("#abilityPowerL").next().text(apValue);
                                break;
                            case "방어력":
                                armor += parseInt(statValue);
                                $("#armorL").next().text(armor);
                                break;
                            case "마법 저항력":
                                spellBlock += parseInt(statValue);
                                $("#spellBlockL").next().text(spellBlock);
                                break;
                            case "공격 속도":
                                attackSpeed += parseInt(statValue);
                                $("#attackSpeedL").next().text(attackSpeed);
                                break;
                            case "이동 속도":
                                moveSpeed += parseInt(statValue);
                                $("#moveSpeedL").next().text(moveSpeed);
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
                                    $("#spPenL").next().text(spPen +'%' +"("+ spPen2+")");
                                    break;
                                }else {
                                    spPen2 += parseInt(statValue);
                                    $("#spPenL").next().text(spPen + '%' +"("+ spPen2+")");
                                    break;
                                }
                            case "치명타 확률":
                                crit += parseInt(statValue);
                                $("#critL").next().text(crit);
                                break;
                            case "모든 피해 흡혈":
                                newOmniVamp += parseInt(statValue);
                                $("#vampL").next().text(newOmniVamp + "%");
                                break;
                            case "스킬 가속":
                                cooltime += parseInt(statValue);
                                $("#coolTimeL").next().text(cooltime);
                                break;
                            case "기본 체력 재생":
                                hpRegen += parseInt(statValue);
                                $("#hpRegenL").next().text(hpRegen);
                                break;
                            case "기본 마나 재생":
                                mpRegen += parseInt(statValue);
                                $("#mpRegenL").next().text(mpRegen);
                                break;
                            case "체력":
                                fullHp += parseInt(statValue);
                                break;
                            case "마나":
                                fullMp += parseInt(statValue);
                                break;
                        }
                    }
                });
                // 아이템 스탯 정보 출력 End
            });

            itemButton.mouseover(function(){    // 마우스 올리면 이벤트
                var imgSrc = $(this).find('img').attr('src');
                var imgName = imgSrc.split('/').pop();    // 이미지 파일 이름 추출

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

        }   // 아이템 이미지 클릭 이벤트 End

        var isItemSavedBoxShown = false;

        // saveItemBtn 버튼 클릭 이벤트 설정
        $(".saveItemBtn").click(function (){
            if (isItemSavedBoxShown){
                $("#itemSavedBox1").show();
                isItemSavedBoxShown = false;
            } else {
                $("#itemSavedBox1").hide();
                isItemSavedBoxShown = true;
            }

        });



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