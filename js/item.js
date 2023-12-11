function startsWithKorean(name) {
    var firstChar = name.charAt(0);
    return firstChar >= '가' && firstChar <= '힣';
}

$.ajax({
    type: "get",
    url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
    success: function (data) {
        var allItems = Object.values(data.data); // 챔피언 데이터 배열 추출
        /*// items = allItems; // 초기 재홍이코드*/

        // 'requiredChampion' 속성을 가지지 않은 아이템만 선택
        var filteredallItems = allItems.filter(function(items) {
            return !items.requiredChampion  // 챔피언 전용템 제외
                && items.description.includes('rarityMythic') // 신화급 아이템만 출력
                && items.inStore !== false // 스토어 : false인 item 제외
                && items.maps["11"] === true; // 소환사의 협곡맵("11")만 출력
        });
        console.log(filteredallItems.length)

        filteredallItems.sort(function(a, b) {
            // 아이템 알파벳순 정렬
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

        console.log(filteredallItems[0].name);
        for(var i=0; i<filteredallItems.length; i++){
            console.log(filteredallItems[i].name)
            var items = filteredallItems[i];
            // 'from' 필드가 존재하는 경우 건너뛰기
            // if (items.from) continue;
            // if (items.into) continue;
            // if (items.name)
            var imgURL = "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/" + items.image.full;
            $("#itemss").append("<img src='" + imgURL + "' alt='" + items.name + "'> " + items.name + "<br>")
        }
    }
});