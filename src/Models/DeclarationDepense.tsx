export class DeclarationDepense 
{
    constructor(date:Date,tag:string,montant:number) {
        this.Date=date;
        this.Montant=montant
        this.Tag=tag
        this.Confirmation=false
    }
          Date: Date ;
          Montant: number;
          Tag: string;
          Confirmation: boolean;
}