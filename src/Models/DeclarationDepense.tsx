export class DeclarationDepense 
{
    constructor(date:Date,tag:string,montant:number) {
        this.Date=date;
        this.Montant=montant
        this.Tag=tag
        this.saveData();
    }
          Date: Date ;
          Montant: number;
          Tag: string;

          saveData(){
            // console.log(this.Montant+"€ sauvegardé au "+this.Date.toLocaleDateString()+" pour "+this.Tag)
            //TODO implementer systeme sauvegarde
          }
        }