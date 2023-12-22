// 파일경로
const filePath = 'champions.json';
let championsArray;
let selectedChampionImg; // 선택한 챔피언 이미지 요소를 저장하는 변수

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

// 파일을 받아와서 배열에 저장하는 함수
function saveFileToArray(filePath, callback) {
    getFile(filePath, function (error, fileContent) {
        if (error) {
            callback(error, null);
        } else {
            try {
                const jsonData = JSON.parse(fileContent);
                callback(null, jsonData);
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

        //Aatrox 아트록스
        console.log(championsArray[0].name)
        console.log(championsArray[0].abilities.Q[0].effects[2].leveling[0].attribute); //Q 1타
        console.log(championsArray[0].abilities.Q[0].effects[2].leveling[1].attribute); //Q 1타끝사거리
        console.log(championsArray[0].abilities.Q[0].effects[3].leveling[0].attribute); //Q 2타
        console.log(championsArray[0].abilities.Q[0].effects[3].leveling[1].attribute); //Q 2타끝사거리
        console.log(championsArray[0].abilities.Q[0].effects[4].leveling[0].attribute); //Q 3타
        console.log(championsArray[0].abilities.Q[0].effects[4].leveling[1].attribute); //Q 3타끝사거리

        console.log(championsArray[0].abilities.W[0].effects[0].leveling[0].attribute); //W

        //Ahri 아리
        console.log(championsArray[1].name);
        console.log(championsArray[1].abilities.Q[0].effects[0].leveling[1].attribute); //Q 풀뎀
        console.log(championsArray[1].abilities.W[0].effects[2].leveling[1].attribute); //W 풀뎀
        console.log(championsArray[1].abilities.E[0].effects[0].leveling[0].attribute); //E
        console.log(championsArray[1].abilities.R[0].effects[0].leveling[0].attribute); //R * 3

        //Akali 아칼리
        console.log(championsArray[2].name);
        console.log(championsArray[2].abilities.Q[0].effects[0].leveling[0].attribute); //Q
        console.log(championsArray[2].abilities.E[0].effects[0].leveling[0].attribute); //E
        console.log(championsArray[2].abilities.R[0].effects[2].leveling[1].attribute); //R 맥시멈데미지

        console.log(championsArray[3].name);
        console.log(championsArray[3].abilities.Q[0].effects[0].leveling[0].attribute); //Q
        console.log(championsArray[3].abilities.E[0].effects[2].leveling[0].attribute); //E 1발당 데미지
        console.log(championsArray[3].abilities.R[0].effects[2].leveling[2].attribute); //R 풀뎀 다 맞았을경우 데미지

        //Alistar 알리스타
        console.log(championsArray[4].name);
        console.log(championsArray[4].abilities.Q[0].effects[0].leveling[0].attribute); //Q
        console.log(championsArray[4].abilities.W[0].effects[0].leveling[0].attribute); //W
        console.log(championsArray[4].abilities.E[0].effects[0].leveling[1].attribute); //E풀뎀 5초동안 맞았을때

        //Amumu 아무무
        console.log(championsArray[5].name);
        console.log(championsArray[5].abilities.Q[0].effects[0].leveling[0].attribute); //Q
        console.log(championsArray[5].abilities.W[0].effects[0].leveling[0].attribute); //W 데미지 공식 필요
        console.log(championsArray[5].abilities.E[0].effects[1].leveling[0].attribute); //E
        console.log(championsArray[5].abilities.R[0].effects[0].leveling[0].attribute); //R

        //Anivia 애니비아
        console.log(championsArray[6].name);
        console.log(championsArray[6].abilities.Q[0]); //Q

        console.log(championsArray[7].name);

        console.log(championsArray[8].name);

        console.log(championsArray[9].name);

        console.log(championsArray[10].name);

        console.log(championsArray[11].name);

        console.log(championsArray[12].name);

        console.log(championsArray[13].name);

        console.log(championsArray[14].name);

        console.log(championsArray[15].name);

        console.log(championsArray[16].name);

        console.log(championsArray[17].name);

        console.log(championsArray[18].name);

        console.log(championsArray[19].name);

        console.log(championsArray[20].name);

        console.log(championsArray[21].name);

        console.log(championsArray[22].name);

        console.log(championsArray[23].name);

        console.log(championsArray[24].name);

        console.log(championsArray[25].name);

        console.log(championsArray[26].name);

        console.log(championsArray[27].name);

        console.log(championsArray[28].name);

        console.log(championsArray[29].name);

        console.log(championsArray[30].name);

        console.log(championsArray[31].name);

        console.log(championsArray[32].name);

        console.log(championsArray[33].name);

        console.log(championsArray[34].name);

        console.log(championsArray[35].name);

        console.log(championsArray[36].name);

        console.log(championsArray[37].name);

        console.log(championsArray[38].name);

        console.log(championsArray[39].name);

        console.log(championsArray[40].name);

        console.log(championsArray[41].name);

        console.log(championsArray[42].name);

        console.log(championsArray[43].name);

        console.log(championsArray[44].name);

        console.log(championsArray[45].name);

        console.log(championsArray[46].name);

        console.log(championsArray[47].name);

        console.log(championsArray[48].name);

        console.log(championsArray[49].name);

        console.log(championsArray[50].name);

        console.log(championsArray[51].name);

        console.log(championsArray[52].name);

        console.log(championsArray[53].name);

        console.log(championsArray[54].name);

        console.log(championsArray[55].name);

        console.log(championsArray[56].name);

        console.log(championsArray[57].name);

        console.log(championsArray[58].name);

        console.log(championsArray[59].name);

        console.log(championsArray[60].name);

        console.log(championsArray[61].name);

        console.log(championsArray[62].name);

        console.log(championsArray[63].name);

        console.log(championsArray[64].name);

        console.log(championsArray[65].name);

        console.log(championsArray[66].name);

        console.log(championsArray[67].name);

        console.log(championsArray[68].name);

        console.log(championsArray[69].name);

        console.log(championsArray[70].name);

        console.log(championsArray[71].name);

        console.log(championsArray[72].name);

        console.log(championsArray[73].name);

        //Lux 럭스
        console.log(championsArray[74].name);
        console.log(championsArray[74].abilities.Q[0].effects[0].leveling[0].attribute);// Q
        console.log(championsArray[74].abilities.E[0].effects[2].leveling[0].attribute);// E
        console.log(championsArray[74].abilities.R[0].effects[0].leveling[0].attribute);// Q

        console.log(championsArray[75].name);

        console.log(championsArray[76].name);

        console.log(championsArray[77].name);

        console.log(championsArray[78].name);

        console.log(championsArray[79].name);

        console.log(championsArray[80].name);

        console.log(championsArray[81].name);

        console.log(championsArray[82].name);

        console.log(championsArray[83].name);

        console.log(championsArray[84].name);

        console.log(championsArray[85].name);

        console.log(championsArray[86].name);

        console.log(championsArray[87].name);

        console.log(championsArray[88].name);

        console.log(championsArray[89].name);

        console.log(championsArray[90].name);

        console.log(championsArray[91].name);

        console.log(championsArray[92].name);

        console.log(championsArray[93].name);

        console.log(championsArray[94].name);

        console.log(championsArray[95].name);

        console.log(championsArray[96].name);

        console.log(championsArray[97].name);

        console.log(championsArray[98].name);

        console.log(championsArray[99].name);

        console.log(championsArray[100].name);

        console.log(championsArray[101].name);

        console.log(championsArray[102].name);

        console.log(championsArray[103].name);

        console.log(championsArray[104].name);

        console.log(championsArray[105].name);

        console.log(championsArray[106].name);

        console.log(championsArray[107].name);

        console.log(championsArray[108].name);

        console.log(championsArray[109].name);

        console.log(championsArray[110].name);

        console.log(championsArray[111].name);

        console.log(championsArray[112].name);

        console.log(championsArray[113].name);

        console.log(championsArray[114].name);

        console.log(championsArray[115].name);

        console.log(championsArray[116].name);

        console.log(championsArray[117].name);

        console.log(championsArray[118].name);

        console.log(championsArray[119].name);

        console.log(championsArray[120].name);

        console.log(championsArray[121].name);

        console.log(championsArray[122].name);

        console.log(championsArray[123].name);

        console.log(championsArray[124].name);

        console.log(championsArray[125].name);

        console.log(championsArray[126].name);

        console.log(championsArray[127].name);

        console.log(championsArray[128].name);

        console.log(championsArray[129].name);

        console.log(championsArray[130].name);

        console.log(championsArray[131].name);

        console.log(championsArray[132].name);

        console.log(championsArray[133].name);

        console.log(championsArray[134].name);

        console.log(championsArray[135].name);

        console.log(championsArray[136].name);

        console.log(championsArray[137].name);

        console.log(championsArray[138].name);

        console.log(championsArray[139].name);

        console.log(championsArray[140].name);

        console.log(championsArray[141].name);

        console.log(championsArray[142].name);

        console.log(championsArray[143].name);

        console.log(championsArray[144].name);

        console.log(championsArray[145].name);

        console.log(championsArray[146].name);

        console.log(championsArray[147].name);

        console.log(championsArray[148].name);

        console.log(championsArray[149].name);

        console.log(championsArray[150].name);

        console.log(championsArray[151].name);

        console.log(championsArray[152].name);

        console.log(championsArray[153].name);

        console.log(championsArray[154].name);

        console.log(championsArray[155].name);

        console.log(championsArray[156].name);

        console.log(championsArray[157].name);

        console.log(championsArray[158].name);

        console.log(championsArray[159].name);

        console.log(championsArray[160].name);

        console.log(championsArray[161].name);

        console.log(championsArray[162].name);

        console.log(championsArray[163].name);

        console.log(championsArray[164].name);

        console.log(championsArray[165].name);
    }
});
