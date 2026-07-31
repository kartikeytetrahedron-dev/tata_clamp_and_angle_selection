export interface BracketItem {
  id: string
  label: string
  image: any
  degree: number
}

export interface DegreeItem {
  id: string
  value: number
}

export const bracketItems: BracketItem[] = [
  {
    id: "1",
    label: "Image1",
    image: require("@/assets/images/clamps/clamp1.png"),
    degree: 60
  },
  {
    id: "2",
    label: "Image2",
    image: require("@/assets/images/clamps/clamp2.png"),
    degree: 30
  },
  {
    id: "3",
    label: "Image3",
    image: require("@/assets/images/clamps/clamp3.png"),
    degree: 90
  },
  {
    id: "4",
    label: "Image4",
    image: require("@/assets/images/clamps/clamp4.png"),
    degree: 60
  }
]

export const degreeItems: DegreeItem[] = [
  { id: "d1", value: 60 },
  { id: "d2", value: 30 },
  { id: "d3", value: 90 },
  { id: "d4", value: 60 },
  { id: "d5", value: 30 }
]