import express from 'express';
import { Request, Response } from 'express';

const server = express();

export default class Person {
    public id: string = Person.createId();
    private geburtsdatum: Date = new Date();
    private vorname: string = " ";
    private nachname: string = " ";


    constructor(vorname: string, nachname: string, geburtsdatum: Date = new Date()) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.geburtsdatum = geburtsdatum;
    }

    private static TOKENS = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static createId(): string {
        let sb = "";
        const now = new Date();
        sb += Person.TOKENS.charAt(now.getFullYear() & 0x1F);
        sb += Person.TOKENS.charAt(now.getMonth() & 0x0F);
        sb += Person.TOKENS.charAt(now.getDay() & 0x1F);
        sb += Person.TOKENS.charAt(now.getMinutes() & 0x1F);

        for (let i = 0; i < 8; i++) {
            sb += Person.TOKENS.charAt(Math.random() * Person.TOKENS.length);
        }
        return sb;
    }
}

const { PORT = 3000,
} = process.env;

const personenListe: Person[] = new Array<Person>();
for (let i = 0; i < 10; i++) {
    personenListe.push(new Person("Ivonne " + i, "Kneissig", new Date()));
}

server.get('/api/personenListe', async (req: Request, res: Response) => {
    console.log("GET /api/personenListe");
    res.send(personenListe);
});

server.delete('/api/person/:personId', async (req: Request, res: Response) => {
    console.log("DELETE /api/person/:personId " + req.params.personId);

    const index = personenListe.findIndex(e => e.id == req.params.personId);
    if (index >= 0) {
        personenListe.splice(index, 1);
    }
});

server.post('/api/person', async (req: Request, res: Response) => {
    console.log("POST /api/person/ " + req.params.personId);

    personenListe.push(new Person("Ivonne " + (new Date()).getMilliseconds(), "Kneissig", new Date()));
    res.send(personenListe);
});


server.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
});
