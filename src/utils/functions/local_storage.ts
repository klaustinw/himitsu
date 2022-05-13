import { AppSetting, NoteInfo } from "../types";
import toast from "react-hot-toast";
import { is_note, is_settings, unsafe_is_note, unsafe_is_settings } from "./is";

// pikachu dies from confusion
// please see this for updates on conditional return in typescript
// https://github.com/Microsoft/TypeScript/issues/24929
// enum for easier changes on update
// enum KeysEnum { 
//     Notes = "notes", 
//     Settings = "settings",
//     NoteModalForLastNote = "last_saved_note",
//  }
// type LocalStorageItemKeysEnums = LSItemKeys.Notes | LSItemKeys.Settings | LSItemKeys.NoteModalForLastNote;
// types for easier use overall, but more work to update on changes
type NotesKey = "notes";
type AppSettingsKey = "settings";
type LastSavedNoteKey = "last_saved_note";
type LocalStorageItemKeys = NotesKey | AppSettingsKey | LastSavedNoteKey;
type LocalStorageitems = AppSetting | NoteInfo[] | NoteInfo | null;
function get(key: NotesKey): NoteInfo[] | null;
function get(key: AppSettingsKey): AppSetting | null;
function get(key: LastSavedNoteKey): NoteInfo | null;
function get(key: LocalStorageItemKeys): LocalStorageitems {
    const saved_item = localStorage.getItem(key);
    if (!saved_item) {
        return null;
    }

    try {
        let item = JSON.parse(saved_item);

        let invalid_error = new Error(`${key} has invalid property, did you do this? <(｀^´)>`);
        switch (key) {
            case "settings":
                if (is_settings(item)) {
                    return item;
                }

                throw invalid_error;
            case "notes":
                if (Array.isArray(item)) {
                    let valid_arr_of_notes = item.map(data => {
                        if (is_note(data)) {
                            return data;
                        }

                        throw invalid_error;
                    });

                    return valid_arr_of_notes;
                }

                throw invalid_error;
            case "last_saved_note":
                if (is_note(item)) {
                    return item;
                }

                throw invalid_error;
        }
    } catch (error) {
        console.error(error);
        toast.error(`Invalid item in ${key}`);
    }

    return null;
};

function set(item: AppSetting | NoteInfo[] | NoteInfo) {
    const save = (key: LocalStorageItemKeys, item: AppSetting | NoteInfo[] | NoteInfo) => {
        try {
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error(error);
            toast(`Failed to save item of ${key}`);
        }
    };
    let key: LocalStorageItemKeys;

    if (unsafe_is_note(item)) {
        key = "last_saved_note";
        save(key, item);
    } else if (unsafe_is_settings(item)) {
        key = "settings";
        save(key, item);
    } else {
        key = "notes";
        save(key, item);
    }
}

function remove(key: LocalStorageItemKeys) {
    localStorage.remove(key);
}

const local_storage = {
    get,
    set,
    remove,
}

export default local_storage;

// class SafeLocalStorage {
//     private readonly kind: Save;
//     constructor(kind: Save) {
//         this.kind = kind;
//     }

//     get(): NoteInfo;
//     get(): AppSetting;
//     get() {
//         switch (this.kind) {
//             case Save.Note:
//                 let item: NoteInfo = {
//                     id: 0,
//                     backend_encryption: false,
//                     created_at: { nanos_since_epoch: 0, secs_since_epoch: 0 },
//                     expired_at: { nanos_since_epoch: 0, secs_since_epoch: 0 },
//                     frontend_encryption: false,
//                     title: ""
//                 };
//                 return item;

//             case Save.Settings:
//                 return DefaultValue.settings;
//         }
//     }
// }

// let k = new SafeLocalStorage(Save.Note).get();

// enum LocalStorageItems {
//     Note,
//     NotesHistory,
//     Settings,
//     Theme,
// }
// type LocalStorageItems = {
//     notes_history: NoteInfo[],
//     settings: AppSetting,
//     last_saved_note: NoteInfo,
// };
// type KeyOfType<LocalStorageItems, V> = keyof {
//     [P in keyof LocalStorageItems as LocalStorageItems[P] extends V? P: never]: any
// }
