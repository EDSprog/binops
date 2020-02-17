import MTProto from 'telegram-mtproto';
import { ApiManager } from 'telegram-mtproto';
import config from 'config';
import MTStorage from './storage/storage.service';

export default class TelegramAuth {
    private storage: MTStorage;
    private client: ApiManager;

    constructor() {
        this.storage = new MTStorage(config.get('telegram.storage'));
    }

    public async check(): Promise<boolean> {
        return await this.storage.get('signedin');
    }

    public async login(): Promise<any> {
        if (!await this.check()) {
            const { phone_code_hash } = await client('auth.sendCode', {
                phone_number  : phone.num,
                sms_type: 5,
                current_number: true,
                api_id        : config.api_id,
                api_hash      : config.api_hash
            });

            const phone_code = await askForCode();
            console.log(`Your code: ${phone_code}`);

            const { user } = await client('auth.signIn', {
                phone_number   : phone.num,
                phone_code_hash: phone_code_hash,
                phone_code     : phone_code
            });

            console.log('signed as ', user)
        }
    }
}
