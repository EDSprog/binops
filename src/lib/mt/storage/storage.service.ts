import { AsyncStorage } from "telegram-mtproto";
import * as fs from 'fs';

export default class MTStorage implements AsyncStorage {
    private readonly storage: string;

    constructor(storage: string) {
        this.storage = storage;
    }

    public async get(key: string): Promise<any> {
        try {
            const file = fs.readFileSync(this.storage);
            if (file) {
                const json = JSON.parse(file.toString());
                return json[key];
            }
        } catch (error) {
            throw new Error(`[Storage.get]: Storage dose not exist when try to get ${key} from ${this.storage}`);
        }
    }

    public async set(key: string, val: any): Promise<void> {
        try {
            const file = fs.readFileSync(this.storage);
            if (file) {
                const json = JSON.parse(file.toString());
                json[key] = val;
                fs.writeFileSync(this.storage, JSON.stringify(json));
            }
        } catch (error) {
            throw new Error(`[Storage.set]: Storage dose not exist when try to get ${key} from ${this.storage}`);
        }
    };

    public async remove(): Promise<any> {};
    public async clear(): Promise<any> {};
}
