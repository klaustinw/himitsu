import { Result } from ".";
import { BASE_URL } from "../utils/constants";
import { EncryptionMethod, NoteInfo as ResponseData } from "../utils/types";
import CryptoJS from "crypto-js";
import { into_readable_datetime } from "../utils/functions";

// remind to change return type to be note info instead
// let the caller handle all the data instead
interface CurrentNoteInfoReturnType {
    id: number,
    expiryTime: string,
}

interface Note {
    title: string,
    encryption: EncryptionMethod,
    content: string,
    passphrase: string,
    lifetime_in_secs: number,
}

interface Request {
    title: string,
    is_currently_encrypted: boolean,
    content: string,
    passphrase: string | null,
    lifetime_in_secs: number | null,
}

export default async function post_note({
    title,
    passphrase,
    encryption,
    content,
    lifetime_in_secs
}: Note): Promise<Result<CurrentNoteInfoReturnType>> {
    let url = BASE_URL + "/notes";
    let request: Request;

    switch (encryption) {
        case EncryptionMethod.NoEncryption:
            request = {
                title,
                content,
                passphrase: null,
                is_currently_encrypted: false,
                lifetime_in_secs: lifetime_in_secs || null
            };
            break;
        case EncryptionMethod.BackendEncryption:
            request = {
                title,
                content,
                passphrase: passphrase,
                is_currently_encrypted: false,
                lifetime_in_secs: lifetime_in_secs || null
            };
            break;
        case EncryptionMethod.FrontendEncryption:
            let encrypted_content = CryptoJS.AES.encrypt(content, passphrase).toString();
            request = {
                title,
                content: encrypted_content,
                passphrase: null,
                is_currently_encrypted: true,
                lifetime_in_secs: lifetime_in_secs || null
            };
            break;
    }

    const result = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    if (result.ok) {
        const data: ResponseData = await result.json();
        const readableDateTime = data.expired_at !== null
            ? into_readable_datetime(data.expired_at.secs_since_epoch)
            : "Never"
        return {
            data: {
                expiryTime: readableDateTime,
                id: data.id,
            },
        };
    } else {
        return {
            data: {
                expiryTime: "",
                id: 0
            },
            error: "clientError",
        }
    }
}
