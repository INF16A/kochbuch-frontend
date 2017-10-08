export interface RezeptListItem {
  id: string
  name: string,
  beschreibung: string,
  aufwandmin: number,
  schwierigkeit: number,
  bewertung: number,
  creator: string,
  creatorDate: string,
  img: string,
  forpersons: number,
  tags: string[]
}
