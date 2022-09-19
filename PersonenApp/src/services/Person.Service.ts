import {singleton} from "tsyringe";
import Api from "./Api";
import Person from "@/Person";

@singleton()
export default class PersonService extends Api {

    private static convertJSON(response: Person[]): Person[] {
        const ret: Person[] = new Array<Person>();
        for (const p of response) {
            ret.push(new Person(p.id, p.vorname, p.nachname, p.geburtsdatum));
        }
        return ret;
    }

    public async getPersonen(): Promise<Person[]> {
        const response = await this.get<Person[]>('/personenListe');
        if (response === undefined) {
            throw new Error("Communication error");
        }
        return PersonService.convertJSON(response);
    }


    public async loeschePerson(p: Person): Promise<void> {
        const response = await this.delete<void>('/person/' + p.id);
    }

    public async erzeugePerson(): Promise<Person[]> {
        const response = await this.post<Person[]>('/person');
        if (response === undefined) {
            throw new Error("Communication error");
        }
        return PersonService.convertJSON(response);
    }
}