export interface ICardData {
  id: number;
  label: string;
  description: string;

  clone(): ICardData;
}

export class CardData implements ICardData {
  id: number;
  label: string;
  description: string;

  constructor();
  constructor(from: ICardData);
  constructor(from?: ICardData) {
    this.id = from?.id ?? -1;
    this.label = from?.label ?? '';
    this.description = from?.description ?? '';
  }

  clone(): ICardData {
    return new CardData(this);
  }

}
