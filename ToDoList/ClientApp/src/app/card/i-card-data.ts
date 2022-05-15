export interface ICardData {
  id: number;
  label: string;
  description: string;

  clone(): ICardData;
}

export class CardData implements ICardData{
  description: string;
  id: number;
  label: string;

  constructor(from: ICardData) {
    this.id = from.id;
    this.label = from.label;
    this.description = from.description;
  }

  clone(): ICardData {
    return new CardData(this) ;
  }

}
