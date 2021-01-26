const fieldMap = {
  AGE: "bcra_3",
  RACE: "bcra_4",
  RACE_SUB_ASIAN: "bcra_4a",
  RACE_SUB_US: "bcra_4b",
  HAD_BIOPSY: "bcra_5",
  BIOPSY_COUNT: "bcra_5a",
  HYPERPLASIA: "bcra_5b",
  MENSTRUATION: "bcra_6",
  FIRST_BIRTH: "bcra_7",
  RELATIVES: "bcra_8"
};

// const fieldValue = (fieldData) => fieldData.value;

const biopsyCount = {
  NO: "No",
  YES: "Yes",
  UNKNOWN: "Unknown",
  ONE: "One",
  TWO_PLUS: "Two or more"
};

const bcra5Map = {
  [biopsyCount.NO]: 0,
  [biopsyCount.UNKNOWN]: 0
};

const bcra5aMap = {
  [biopsyCount.ONE]: 1,
  [biopsyCount.TWO_PLUS]: 2
};

const bcra6Map = {
  "7-11": 2,
  "12-13": 1,
  "14 or older": 0
};

const bcra7Map = {
  "No births": 2,
  "< 20": 0,
  "20-24": 1,
  "25-29": 2,
  "30 - or older": 3
};

const bcra8Map = {
  One: 1,
  "More than one": 2,
  None: 0,
  Unknown: 0
};

const raceGeneral = {
  WHITE: "White",
  AFRICAN_AMERICAN: "African American",
  HISPANIC: "Hispanic / Latina",
  ASIAN_AMERICAN: "Asian American",
  NATIVE: "American Indian / Alaskan Native",
  OTHER: "Other"
};

const raceAsian = {
  CHINESE: "Chinese",
  FILIPINO: "Filipino",
  HAWAIIAN: "Hawaiian",
  PACIFIC: "Pacific Islander",
  JAPANESE: "Japanese",
  OTHER: "Other Asian"
};

const birthplace = {
  NON_US: "Born outside of U.S.",
  US: "U.S. Born"
};

const bcra4Map = {
  [raceGeneral.WHITE]: 1,
  [raceGeneral.AFRICAN_AMERICAN]: 2,
  [raceGeneral.HISPANIC]: fieldMap.RACE_SUB_US, // more info needed
  [raceGeneral.ASIAN_AMERICAN]: fieldMap.RACE_SUB_ASIAN, // more info needed
  [raceGeneral.NATIVE]: 4, // ? 4=NA Other (Native American and unknown race)
  [raceGeneral.OTHER]: 4 // ? 4=NA Other (Native American and unknown race)
};

const bcra4aMap = {
  [raceAsian.CHINESE]: 6,
  [raceAsian.FILIPINO]: 8,
  [raceAsian.HAWAIIAN]: 9,
  [raceAsian.PACIFIC]: 10,
  [raceAsian.JAPANESE]: 7,
  [raceAsian.OTHER]: 11
};

const bcra4bMap = {
  [birthplace.NON_US]: 5,
  [birthplace.US]: 3
};

const transformRace = (d: any) => {
  let race = bcra4Map[d[fieldMap.RACE]];
  if (typeof race === "string") {
    const bcraMap = race === fieldMap.RACE_SUB_US ? bcra4bMap : bcra4aMap;
    race = bcraMap[d[race]];
  }
  return race;
};

const transformBiopsies = (d: any) => {
  return d[fieldMap.HAD_BIOPSY].value === biopsyCount.YES
    ? bcra5aMap[d[fieldMap.BIOPSY_COUNT]]
    : bcra5Map[d[fieldMap.HAD_BIOPSY]];
};

const transform = (d: any) => {
  const biopsies = transformBiopsies(d);

  const hyperplasia =
    biopsies === 0 || biopsies === 99
      ? 99
      : d[fieldMap.HYPERPLASIA] === "Yes"
      ? 1
      : 0;

  const menstruation = bcra6Map[d[fieldMap.MENSTRUATION]];

  const first_birth = bcra7Map[d[fieldMap.FIRST_BIRTH]];

  const relatives = bcra8Map[d[fieldMap.RELATIVES]];

  const race = transformRace(d);

  const transformed = {
    age: parseInt(d[fieldMap.AGE], 10),
    biopsies,
    hyperplasia,
    menstruation,
    first_birth,
    relatives,
    race,
    Raw_Ind: 0,
    Avg_White: 1
  };

  console.log(transformed);

  return transformed;
};

export default transform;
