// 챔피언 정보를 받아오는 함수
function getChampionList() {
    $.ajax({
        type: "get",
        url: "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json",
        success: function (data) {
            var champions = Object.values(data.data);
            displayChampionList(champions);
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

        // 한 줄에 4개씩 나열되도록 처리
        if ((index + 1) % 4 === 0) {
            championList.append($("<br>")); // 줄 바꿈 요소 추가
        }
    });
}


// 챔피언 선택 시 동작하는 함수
function selectChampion(champion) {
    // 선택한 챔피언에 대한 동작을 추가하세요.
    console.log("선택한 챔피언 ID:", champion.id);
    // 이미지 업데이트
    updateChampionButtonImage(champion.id);
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