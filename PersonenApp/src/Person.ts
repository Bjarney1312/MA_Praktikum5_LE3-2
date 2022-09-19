import moment from "moment";

export default class Person {
    public geburtsdatum: Date = new Date();
    public vorname: string = " ";
    public nachname: string = " ";
    public id: string = "";

    constructor(id: string, vorname: string, nachname: string, geburtsdatum: Date = new Date()) {
        this.id = id;
        this.vorname = vorname;
        this.nachname = nachname;
        this.geburtsdatum = geburtsdatum;
     }
  
    public get initialen(): string {
        if (this.vorname != null && this.nachname != null) {
            return this.vorname[0] + this.nachname[0];            
        } else if (this.vorname != null) {
            return this.vorname[0];
        }
        return "";
    }

    public get formattedGB(): string {
        return moment(this.geburtsdatum).format("DD.MM.YYYY");
    }
    


  } 