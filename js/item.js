// // API 가져오기
// $.ajax({
//     type:"get",
//     url:"http://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json",
//     success:function(data){
//         var allItems=Object.values(data.data);//챔피언데이터배열추출
//
//         var filteredallItems=allItems.filter(function(items){
//             return !items.requiredChampion // 챔피언전용템제외
//                 && items.description.includes('rarityMythic') //신화급아이템만출력
//                 && items.inStore!==false //스토어:false인item제외
//                 && items.maps["11"]===true; //소환사의협곡맵("11")만출력
//         });
//
//
//         /* 정렬 */
//         function startsWithKorean(name){
//             var firstChar=name.charAt(0);
//             returnfirstChar>='가'&&firstChar<='힣';
//         }
//         //아이템알파벳순정렬
//         filteredallItems.sort(function(a,b){
//             var nameA=a.name.toUpperCase();
//             var nameB=b.name.toUpperCase();
//
//             var aStartsWithKorean=startsWithKorean(nameA);
//             var bStartsWithKorean=startsWithKorean(nameB);
//
//             if(aStartsWithKorean&&!bStartsWithKorean){
//                 return -1;
//             }
//             if(!aStartsWithKorean&&bStartsWithKorean){
//                 return 1;
//             }
//
//             if(nameA<nameB){
//                 return -1;
//             }
//             if(nameA>nameB){
//                 return 1;
//             }
//             return 0;
//         });
//         /*정렬end*/
//
//         /* 아이템 각종 기능 구현 */
//         var clickItemBox;
//         function printItems(filteredallItems){
//             $("#newBox").empty();//newBox의초기값공백
//             for(vari=0;i<filteredallItems.length;i++){
//                 var item=filteredallItems[i];
//                 var imgURL="http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/"+item.image.full;
//                 var itemButton=$("<button type='button' class='item_box'><imgsrc='"+imgURL+"'alt='"+item.name+"'></button>"+item.name)
//
//                 //아이템 이미지 버튼에 클릭 이벤트를 설정
//                 setItemClickEvent(itemButton,item,clickItemBox.attr('id').replace('iBox','')-1);
//
//                 $("#newBox").append(itemButton);
//             }
//         }
// //각 아이템 박스마다 선택된 신화 아이템을 저장하는 배열
//         var selectedMythicItem=[null,null,null,null,null,null]
//
// //아이템이미지버튼을클릭하면,선택한아이템박스에이미지를설정하고,다시클릭하면초기화
//         functionsetItemClickEvent(itemButton,item,iBoxIndex){
//             itemButton.click(function(){//마우스클릭시이벤트
//                 var imgSrc=$(this).find('img').attr('src');
//
// //이미신화아이템이선택된상태라면팝업을띄우고함수종료
//                 if(selectedMythicItem.some((selectedMythicItem,index)=>
//                     selectedMythicItem!==null&&index!==iBoxIndex)){
//                     alert("신화아이템은하나만선택가능합니다.");
//                     return;
//                 }
// //이미지와X버튼을생성
//                 clickItemBox.html("<imgsrc='"+imgSrc+"'><buttonclass='itemRemoveBtn'>X</button>");
//                 $("#newBox").remove();//아이템을선택하면#newBox제거
//
// //X버튼클릭이벤트
//                 clickItemBox.find('.itemRemoveBtn').off().click(function(){//off()함수는이전에등록된클릭이벤트를제거함
//                     clickItemBox.empty();
//                     selectedMythicItem[iBoxIndex]=null;
//                     $(".costp").text(":0원");//아이템가격초기화
//                 });
//
//                 selectedMythicItem[iBoxIndex]=item;//신화아이템선택상태업데이트
//
//                 varitemPrice=item.gold.total;//아이템의total값을추출
//                 $(".costp").text(":"+itemPrice+"원");//아이템가격을HTML에적용
//             });
//
//             itemButton.mouseover(function(){//마우스올리면이벤트
//                 var imgSrc=$(this).find('img').attr('src');
//                 var imgName=imgSrc.split('/').pop();//이미지파일이름추출
// //마우스를올린이미지와API에서가져온아이템의이미지가일치하는지확인
//                 if(imgName===item.image.full){
//                     var description=item.description;
// //HTML태그제거
//                     description=description.replace(/(<([^>]+)>)/ig,"");
// //필요없는문자제거
//                     description=description.replace(/\r?\n|\r/g,"");
//
// //모든description출력
//                     $("#newBox").append('<p>'+description+'</p>');
//                 }
//             });
//             itemButton.mouseout(function(){//마우스내리면이벤트
//                 $("#newBoxp").remove();
//             });
//         }
//
// //6개의 각각의 박스에서 원하는 버튼에 클릭할 경우 기능
//         for(var i=1;i<=6;i++){
// //버튼을 클릭하면 아이템 출력
//             $("#iBox"+i).click(function(){
//                 if($("#newBox").length===0){
//                     $("body").append('<divid="newBox"></div>');//새로운박스생성
//                 }elseif(clickItemBox&&clickItemBox[0]===this){
//                     $("#newBox").remove();//#iBox1~#iBox6을재클릭하면#newBox제거
//                     return;//이후코드실행방지
//                 }
//                 clickItemBox=$(this);//현재클릭한아이템박스를저장
//                 printItems(filteredallItems);//아이템출력을새로운박스안으로변경
//             });
//         }
//     }
// });
// $(document).mouseup(function(e){
//     varcontainer=$("#newBox");
//
// //newBox와 item_pan를 제외한 부분을 클릭 했을 경우 newBox닫기
//     if(!container.is(e.target)&&container.has(e.target).length===0&&!$(".item_pan").is(e.target)&&$(".item_pan").has(e.target).length===0){
//         container.remove();
//     }
// });