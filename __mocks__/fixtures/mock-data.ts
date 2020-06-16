import { IGeneratedSurvivor } from "../../src/models/responses.model"

export const dbdRandomiserKillers = [
  {
    upgradables: [
      { name: "\"Calm\" - Carter's Notes", icon: "assets/killer/addons/Doctor/iconAddon_calmCartersNotes.png", rank: 4 },
      { name: "\"Calm\" - Class I", icon: "assets/killer/addons/Doctor/iconAddon_calmClassI.png", rank: 1 },
    ],
    id: 7,
    name: "The Doctor",
    icon: "assets/killer/portrait/DO_charSelect_portrait.png",
    rank: 0
  },
  {
    "upgradables": [
      { "name": "Amanita Toxin", "icon": "assets/killer/addons/Huntress/iconAddon_amanitaToxin.png", "rank": 1 },
      { "name": "Bandaged Haft", "icon": "assets/killer/addons/Huntress/iconAddon_bandagedHaft.png", "rank": 1 },
    ],
    "id": 8,
    "name": "The Huntress",
    "icon": "assets/killer/portrait/BE_charSelect_portrait.png",
    "rank": 0
  },
]
export const dbdRandomiserPerksKiller = [
  { id: 1, name: "Agitation", icon: "assets/killer/perks/iconPerks_agitation.png", rank: 4 },
  { id: 2, name: "A Nurse's Calling", icon: "assets/killer/perks/iconPerks_aNursesCalling.png", rank: 4 },
  { id: 3, name: "Bamboozle", icon: "assets/killer/perks/iconPerks_bamboozle.png", rank: 3 },
  { id: 4, name: "Barbecue & Chilli", icon: "assets/killer/perks/iconPerks_BBQAndChili.png", rank: 4 },
]
export const dbdRandomiserPerksSurvivor = [
  { id: 1, name: "Ace in the Hole", icon: "assets/survivor/perks/iconPerks_aceInTheHole.png", rank: 4 },
  { id: 2, name: "Adrenaline", icon: "assets/survivor/perks/iconPerks_adrenaline.png", rank: 4 },
  { id: 3, name: "Aftercare", icon: "assets/survivor/perks/iconPerks_aftercare.png", rank: 4 },
  { id: 4, name: "Alert", icon: "assets/survivor/perks/iconPerks_alert.png", rank: 4 },
]
export const dbdRandomiserSurvivors = [
  { id: 1, name: "Dwight Fairfield", icon: "assets/survivor/portrait/DF_charSelect_portrait.png", rank: 0 },
  { id: 2, name: "Meg Thomas", icon: "assets/survivor/portrait/MT_charSelect_portrait.png", rank: 0 },
]
export const dbdRandomiserItems = [
  {
    upgradables: [
      { icon: 'assets/survivor/addons/key/iconAddon_bloodAmber.png', name: 'Blood Amber', rank: 4 },
      { icon: 'assets/survivor/addons/key/iconAddon_tokenErroded.png', name: 'Eroded Token', rank: 2 },
    ],
    id: 7,
    name: "Skeleton Key",
    icon: "assets/survivor/items/iconItems_key.png",
    rank: 5
  },
  {
    upgradables: [
      { icon: 'assets/survivor/addons/toolbox/iconAddon_brandNewPart.png', name: 'Brand New Part', rank: 5 },
      { icon: 'assets/survivor/addons/toolbox/iconAddon_cleanRag.png', name: 'Clean Rag', rank: 1 },
    ],
    id: 8,
    name: "Alex's Toolbox",
    icon: "assets/survivor/items/iconItems_toolboxAlexs.png",
    rank: 4
  }
]


export const killerLoadout = {
  name: dbdRandomiserKillers[0].name,
  icon: dbdRandomiserKillers[0].icon,
  addons: dbdRandomiserKillers[0].upgradables,
  perks: dbdRandomiserPerksKiller
}

export const survivorLoadout: IGeneratedSurvivor = {
  name: dbdRandomiserSurvivors[0].name,
  icon: dbdRandomiserSurvivors[0].icon,
  item: {
    name: dbdRandomiserItems[0].name,
    icon: dbdRandomiserItems[0].icon,
    addons: dbdRandomiserItems[0].upgradables,
    rank: dbdRandomiserItems[0].rank,
  },
  perks: dbdRandomiserPerksSurvivor
}
