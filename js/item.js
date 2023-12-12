// API 가져오기
$.ajax({
    type: "get",
    url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
    success: function (data) {
        var allItems = Object.values(data.data); // 챔피언 데이터 배열 추출

        var filteredallItems = allItems.filter(function (items) {
            return !items.requiredChampion  // 챔피언 전용템 제외
                && items.description.includes('rarityMythic') // 신화급 아이템만 출력
                && items.inStore !== false // 스토어 : false인 item 제외
                && items.maps["11"] === true; // 소환사의 협곡맵("11")만 출력
        });
        // console.log(filteredallItems.length)

/*                         정렬                                             */
        function startsWithKorean(name) {
            var firstChar = name.charAt(0);
            return firstChar >= '가' && firstChar <= '힣';
        }
        // 아이템 알파벳순 정렬
        filteredallItems.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            var aStartsWithKorean = startsWithKorean(nameA);
            var bStartsWithKorean = startsWithKorean(nameB);

            if (aStartsWithKorean && !bStartsWithKorean) {
                return -1;
            }
            if (!aStartsWithKorean && bStartsWithKorean) {
                return 1;
            }

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
/*                         정렬 end                                             */


/*                           아이템 각종 기능 구현                                 */
        var clickItemBox;
function printItems(filteredallItems) {
            $("#newBox").empty(); // newBox의 초기 값 공백
            for (var i = 0; i < filteredallItems.length; i++) {
                var item = filteredallItems[i];
                var imgURL = "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + item.image.full;
                var itemButton = $("<button type='button' class='item_box'><img src='" + imgURL + "' alt='" + item.name + "'></button>" + item.name)

                // 아이템 이미지 버튼에 클릭 이벤트를 설정
                setItemClickEvent(itemButton, item, clickItemBox.attr('id').replace('iBox', '') -1);

                $("#newBox").append(itemButton);
            }
        }
        // 각 아이템 박스마다 선택된 신화 아이템을 저장하는 배열
        var selectedMythicItem = [null, null, null, null, null, null]

                // 아이템 이미지 버튼을 클릭하면, 선택한 아이템 박스에 이미지를 설정하고, 다시 클릭하면 초기화
        function setItemClickEvent(itemButton, item, iBoxIndex){
                    itemButton.click(function () { // 마우스 클릭시 이벤트
                    var imgSrc = $(this).find('img').attr('src');

                    // 이미 신화 아이템이 선택된 상태라면 팝업을 띄우고 함수 종료
                    if (selectedMythicItem.some((selectedMythicItem, index)
                        => selectedMythicItem !== null && index !== iBoxIndex)) {
                        alert("신화 아이템은 하나만 선택가능합니다.");
                        return;
                    }
                            // 이미지와 X 버튼을 생성
                            clickItemBox.html("<img src='" + imgSrc + "'><button class='itemRemoveBtn'>X</button>");
                            $("#newBox").remove(); // 아이템을 선택하면 #newBox 제거

                            // X 버튼 클릭 이벤트
                            $('.itemRemoveBtn').click(function (){
                                clickItemBox.empty();
                                selectedMythicItem[iBoxIndex] = null;
                                $(".cost p").text(": 0원"); // 아이템 가격 초기화
                            });

                            selectedMythicItem[iBoxIndex] = item; // 신화 아이템 선택 상태 업데이트

                            var itemPrice = item.gold.total; // 아이템의 total 값을 추출
                            $(".cost p").text(": " + itemPrice + " 원"); // 아이템 가격을 HTML에 적용
                });

                    itemButton.mouseover(function (){ // 마우스 올리면 이벤트
                        var imgSrc = $(this).find('img').attr('src');
                        var imgName = imgSrc.split('/').pop(); // 이미지 파일 이름 추출
                        // 마우스를 올린 이미지와 API에서 가져온 아이템의 이미지가 일치하는지 확인
                        if (imgName === item.image.full) {
                            var description = item.description;
                            // HTML 태그 제거
                            description = description.replace(/(<([^>]+)>)/ig, "");
                            // 필요 없는 문자 제거
                            description = description.replace(/\r?\n|\r/g, "");

                            // 모든 description 출력
                            $("#newBox").append('<p>' + description + '</p>');
                        }
                    });
                    itemButton.mouseout(function (){ // 마우스 내리면 이벤트
                        $("#newBox p").remove();
                    });
            }

        // 6개의 각각의 박스에서 원하는 버튼에 클릭할 경우 기능
            for (var i = 1; i <= 6; i++) {
            // 버튼을 클릭하면 아이템 출력
            $("#iBox" + i).click(function () {
                if ($("#newBox").length === 0) {
                    $("body").append('<div id="newBox"></div>'); // 새로운 박스 생성
                } else if (clickItemBox && clickItemBox[0] === this) {
                    $("#newBox").remove(); // #iBox1~#iBox6을 재클릭하면 #newBox 제거
                    return; // 이후 코드 실행 방지
                }
                clickItemBox = $(this);  // 현재 클릭한 아이템 박스를 저장
                printItems(filteredallItems); // 아이템 출력을 새로운 박스 안으로 변경
            });
        }
    }
});
$(document).mouseup(function (e) {
    var container = $("#newBox");

    // newBox와 item_pan를 제외한 부분을 클릭했을 경우 newBox 닫기
    if (!container.is(e.target) && container.has(e.target).length === 0 && !$(".item_pan").is(e.target) && $(".item_pan").has(e.target).length === 0) {
        container.remove();
    }
});


