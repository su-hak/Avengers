createItemBoxes = function(num){

    var num = num;
    var boxes = champ; // 예시로 사용되는 배열
    var searchInput = document.getElementById("left-champ-search");
    var searchText = searchInput.value.toLowerCase();

    var itemContainer = document.getElementById("itemContainer");
    itemContainer.innerHTML = ""; // 기존 요소 초기화
    for(var i=0; boxes.length; i++){

        let itemName = boxes[i].name;

        // 검색어가 존재하고 현재 챔피언 이름에 검색어가 포함되지 않으면 요소를 생성하지 않음
        if (searchText && !itemName.toLowerCase().includes(searchText)) {
            return;
        }

        var colElement = document.createElement("div");
        colElement.classList.add("col-3", "bg-hover", "pt-2");
        colElement.addEventListener("click", selectObject);


        var imgElement = document.createElement("img");
        imgElement.src = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/"+champ[i].id+".png";
        /*+item.image.full*/
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

        /*$("#itemContainer" + num)*/itemContainer.append(colElement);
    }

    console.log("yes");
}

