import { ErrorKind } from "../utils/types";
import delete_note from "./delete_note";
import get_note from "./get_note";
import get_note_info from "./get_note_info";
import post_note from "./post_note";
export {
    delete_note,
    get_note,
    get_note_info,
    post_note,
};

export interface Result<T> {
    is_ok: boolean, // might delete since tis not really needed 
    data: T,
    // change this to errorkind
    error: ErrorKind, // oh yes big brain time
}
