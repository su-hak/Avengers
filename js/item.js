let filteredallItems;
let items; // 전역 변수 선언 재선언 불가
// API 가져오기
$.ajax({
    type:"get",
    url:"http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
    success:function(data){
        var allItems=Object.values(data.data);//챔피언데이터배열추출
        items = allItems;
        
        var filteredallItems=items.filter(function(items){
            return !items.requiredChampion // 챔피언전용템제외
                && items.description.includes('rarityMythic') //신화급아이템만출력
                && items.inStore!==false //스토어:false인item제외
                && items.maps["11"]===true; //소환사의협곡맵("11")만출력
        });


        /* 정렬 */
        function startsWithKorean(name){
            var firstChar=name.charAt(0);
            return firstChar>='가'&&firstChar<='힣';
        }
        //아이템알파벳순정렬
        filteredallItems.sort(function(a,b){
            var nameA=a.name.toUpperCase();
            var nameB=b.name.toUpperCase();

            var aStartsWithKorean=startsWithKorean(nameA);
            var bStartsWithKorean=startsWithKorean(nameB);

            if(aStartsWithKorean&&!bStartsWithKorean){
                return -1;
            }
            if(!aStartsWithKorean&&bStartsWithKorean){
                return 1;
            }

            if(nameA<nameB){
                return -1;
            }
            if(nameA>nameB){
                return 1;
            }
            return 0;
        });
        /*  정렬end   */

        /* 아이템 각종 기능 구현 */
        let clickItemBox;
        function printItems(filteredallItems){
            $("#newBox").empty();//newBox의초기값공백
            for(var i=0;i<filteredallItems.length;i++){
                var item=filteredallItems[i];
                var imgURL="http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/"+item.image.full;
                var itemButton=$("<button type='button' class='item_box'><img src='"+imgURL+"'alt='"+item.name+"'></button>"+item.name)

                //아이템 이미지 버튼에 클릭 이벤트를 설정
                setItemClickEvent(itemButton,item,clickItemBox.attr('id').replace('iBox','')-1);

                $("#newBox").append(itemButton);
            }
        }
        //각 아이템 박스 마다 선택된 신화 아이템을 저장하는 배열
        var selectedMythicItem=[null,null,null,null,null,null]

        //아이템 이미지 버튼을 클릭하면,선택한 아이템 박스에 이미지를 설정하고,다시 클릭하면 초기화
        function setItemClickEvent(itemButton,item,iBoxIndex){
            itemButton.click(function(){//마우스클릭시이벤트
                var imgSrc= $(this).find('img').attr('src');

                //이미 신화 아이템이 선택된 상태라면 팝업을 띄우고 함수종료
                if(selectedMythicItem.some((selectedMythicItem,index)=>
                    selectedMythicItem!==null&&index!==iBoxIndex)){
                    alert("신화 아이템은 하나만 선택 가능합니다.");
                    return;
                }
                //이미지와 X버튼을 생성
                clickItemBox.html("<img src='"+imgSrc+"'><button class='itemRemoveBtn'>X</button>");
                $("#newBox").remove(); // 아이템을 선택하면 #newBox 제거

                //X버튼 클릭 이벤트
                clickItemBox.find('.itemRemoveBtn').click(function(){//off()함수는이전에등록된클릭이벤트를제거함
                    $(this).siblings('img').remove(); // 현재 'X'버튼과 동일한 iBox의 이미지만 제거
                    $(this).remove(); // 'X'버튼 제거

                    selectedMythicItem[iBoxIndex]=null; // 선택한 아이템 업데이트
                    $(".cost p").text(":0원");//아이템 가격 초기화
                });

                selectedMythicItem[iBoxIndex]=item; // 신화 아이템 선택 상태 업데이트

                var itemPrice=item.gold.total;//아이템의total값을추출
                $(".cost p").text(": "+itemPrice+" 원");//아이템가격을HTML에적용
            });

            // 팝업 창을 띄운 iBox 칸에 대한 초기화 변수 적용
            $("#iBox" + iBoxIndex + "_R").click(function() {
                clickItemBox = $("#iBox" + iBoxIndex);
                selectedMythicItem[iBoxIndex] = null;
                $(".cost p").text(":0원");
            });

            itemButton.mouseover(function(){//마우스올리면이벤트
                var imgSrc=$(this).find('img').attr('src');
                var imgName=imgSrc.split('/').pop();//이미지파일이름추출
                //마우스를 올린 이미지와 API에서 가져온 아이템의 이미지가 일치 하는지 확인
                if(imgName===item.image.full){
                    var description=item.description;
                    //HTML 태그 제거
                    description=description.replace(/(<([^>]+)>)/ig,"");
                    //필요 없는 문자 제거
                    description=description.replace(/\r?\n|\r/g,"");

                    //모든 description 출력
                    $("#newBox").append('<p>'+description+'</p>');
                }
            });
            itemButton.mouseout(function(){ //마우스내리면이벤트
                $("#newBox p").remove();
            });
        }

        //6개의 각각의 박스에서 원하는 버튼에 클릭할 경우 기능
        for(var i=1;i<=6;i++){
            //버튼을 클릭하면 아이템 출력
            $("#iBox"+i).click(function(){
                /* if($("#newBox").length===0){
                    $("body").append('<div id="newBox"></div>');//새로운박스생성
                }else if(clickItemBox&&clickItemBox[0]===this){
                    $("#newBox").remove();//#iBox1~#iBox6을재클릭하면#newBox제거
                    return;//이후코드실행방지
                }*/
                var id = $(this).attr('id').replace('iBox','');
                $("#itemContainer"+id).empty(); // 기존 요소 초기화
                createItemBoxes(id); // 아이템 출력을 createItemBoxes 함수로 변경
                /*clickItemBox=$(this);//현재클릭한아이템박스를저장
                printItems(filteredallItems);//아이템출력을새로운박스안으로변경*/
            });
        }
    }
});
$(document).mouseup(function(e){
    var container=$("#newBox");

//newBox와 item_pan를 제외한 부분을 클릭 했을 경우 newBox닫기
    if(!container.is(e.target)&&container.has(e.target).length===0&&!$(".item_pan").is(e.target)&&$(".item_pan").has(e.target).length===0){
        container.remove();
    }
});

// api속 챔피언 갯수만큼 박스 생성
function createItemBoxes(id) {
    var boxes = filteredallItems; // 전역 변수 사용
    var searchInput = document.getElementById("left-item-search");
    var searchText = searchInput.value.toLowerCase();

    var itemContainer = document.getElementById("itemContainer"+id);
    itemContainer.innerHTML = ""; // 기존 요소 초기화

    for(var i=0; boxes.length; i++){
        let itemName = boxes[i].name;
        // 검색어가 존재하고 현재 아이템 이름에 검색어가 포함되지 않으면 요소를 생성하지 않음
        if (searchText && !itemName.toLowerCase().includes(searchText)) {
            continue;
        }

        var colElement = document.createElement("div");
        colElement.classList.add("col-3", "bg-hover", "pt-2");
        // colElement.addEventListener("click", selectObject);

        var imgElement = document.createElement("img");
        imgElement.src = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/"+boxes[i].image.full;
        imgElement.classList.add("portrait", "sprite");
        imgElement.id = boxes[i].id; // 이미지에 id 할당
        colElement.appendChild(imgElement);


        var rowElement = document.createElement("div");
        rowElement.classList.add("row");

    var pElement = document.createElement("p");
        pElement.classList.add("text-center", "item-name", "mx-auto");
        pElement.textContent = boxes[i].name;
        rowElement.appendChild(pElement);

        colElement.appendChild(rowElement);

        itemContainer.appendChild(colElement);
    }

    /* for (var i=1; i<=6; i++){
        $("#iBox"+i).click(function (){
            createItemBoxes(i);
        });
    }*/
}