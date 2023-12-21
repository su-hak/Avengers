// let test = {};

console.log("testtest진입",);

test.test = function (){
    test.level = test.getSelectedLevel();
    console.log("testtest속 level :: ", test.level);
}
function findDamage(jsonData) {
    // JSON 데이터를 파싱하여 객체로 변환
    const data = JSON.parse(jsonData);

    // 대소문자 구분 없이 "damage"를 찾기 위해 모든 키를 소문자로 변환
    const lowercaseData = Object.keys(data).reduce((obj, key) => {
        obj[key.toLowerCase()] = data[key];
        return obj;
    }, {});

    // "damage" 키로 값을 찾아 반환
    if ("damage" in lowercaseData) {
        return lowercaseData["damage"];
    } else {
        return null;
    }
}

// 예시로 제공해주신 JSON 데이터
const jsonData = `{
  "name": "Leap Strike",
  "icon": "https://cdn.communitydragon.org/latest/champion/Jax/ability-icon/q",
  "effects": [
    {
      "description": "Active: Jax dashes to the target unit's location.",
      "leveling": []
    },
    {
      "description": "If the target is an enemy and they are in range upon arrival, Jax deals them physical damage.",
      "leveling": [
        {
          "attribute": "Physical Damage",
          "modifiers": [
            {
              "values": [
                65,
                105,
                145,
                185,
                225
              ],
              "units": [
                "",
                "",
                "",
                "",
                ""
              ]
            },
            {
              "values": [
                100,
                100,
                100,
                100,
                100
              ],
              "units": [
                "% bonus AD",
                "% bonus AD",
                "% bonus AD",
                "% bonus AD",
                "% bonus AD"
              ]
            }
          ]
        }
      ]
    },
    {
      "description": "Jax can cast any of his abilities during the dash.",
      "leveling": []
    }
  ],
  "cost": {
    "modifiers": [
      {
        "values": [
          65,
          65,
          65,
          65,
          65
        ],
        "units": [
          "",
          "",
          "",
          "",
          ""
        ]
      }
    ]
  },
  "cooldown": {
    "modifiers": [
      {
        "values": [
          8,
          7.5,
          7,
          6.5,
          6
        ],
        "units": [
          "",
          "",
          "",
          "",
          ""
        ]
      }
    ],
    "affectedByCdr": true
  }}`;

// "damage"를 찾아 출력
const damage = findDamage(jsonData);
console.log(damage);

