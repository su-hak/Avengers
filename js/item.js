function startsWithKorean(name) {
    var firstChar = name.charAt(0);
    return firstChar >= '가' && firstChar <= '힣';
}

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

        var clickItemBox

        function printItems(filteredallItems) {
            $("#newBox").empty(); // newBox의 초기 값 공백
            for (var i = 0; i < filteredallItems.length; i++) {
                var item = filteredallItems[i];
                var imgURL = "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + item.image.full;
                var itemButton = $("<button><img src='" + imgURL + "' alt='" + item.name + "'></button>"+ item.name)

                // 아이템 이미지 버튼을 클릭하면, 선택한 아이템 박스에 이미지를 설정하고, 다시 클릭하면 초기화
                itemButton.click(function () {
                    var itemName = $(this).find('img').attr('alt');
                    var isDuplicate = false;

                    // #iBox1~#iBox6에서 중복된 아이템이 있는지 확인
                    for (var i = 1; i <= 6; i++) {
                        if ($("#iBox" + i).find('img').attr('alt') === itemName) {
                            isDuplicate = true;
                            break;
                        }
                    }

                    // 중복된 아이템이 없을 경우에만 저장
                    if (!isDuplicate) {
                        var imgSrc = $(this).find('img').attr('src');
                        if (clickItemBox.find('img').length > 0) {
                            clickItemBox.html("<img src='" + imgSrc + "' alt='" + itemName + "'>");  // 이미지 변경
                        } else {
                            clickItemBox.html("<img src='" + imgSrc + "' alt='" + itemName + "'>"); // 이미지 설정
                            $("#newBox").remove(); // 아이템을 저장하면 #newBox 제거
                        }
                    }
                    if (clickItemBox.find('img').length > 0) {
                        // clickItemBox.empty(); // 이미지가 이미 있으면, 초기화
                        clickItemBox.html("<img src='" + imgSrc + "'>"); // 이미지 변경
                    } else {
                        clickItemBox.html("<img src='" + imgSrc + "'>"); // 이미지가 없으면 설정
                        $("#newBox").remove(); // 아이템을 저장하면 #newBox 제거
                    }
                });
                $("#newBox").append(itemButton);
            }
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


