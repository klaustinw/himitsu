export interface ErrorKind {
  notFound: string | null,
  wrongPassphrase: string | null,
  tooManyRequests: string | null,
  serverError: string | null,
  clientError: string | null,
  handled?: "",
}

interface UserActionInfo {
  genericDelete: string | null,
  genericSave: string | null,
}

// alert can either be error or notification from response
export type Alert = ErrorKind & UserActionInfo

type RustDateTime = {
  "nanos_since_epoch": number,
  "secs_since_epoch": number,
}

export type RawNote = {
  "content": string,
  "created_at": RustDateTime,
  "updated_at": RustDateTime,
  "backend_encryption": boolean,
  "frontend_encryption": boolean,
  "expires_at": RustDateTime | null,
  "id": string,
  "title": string,
}

export interface Note {
  id: string,
  title: string,
  content: string,
  decrypted: boolean,
  encryption: EncryptionMethod,
  expiryTime: string,
  creationTime: string,
  lastUpdateTime: string,
  passphrase: string | null,
  raw?: RawNote,
}

export interface NoteInfo {
  frontend_encryption: boolean,
  backend_encryption: boolean,
  created_at: RustDateTime,
  updated_at: RustDateTime,
  expires_at: RustDateTime | null,
  id: string,
  title: string
}

export enum EncryptionMethod {
  NoEncryption,
  FrontendEncryption,
  BackendEncryption,
}

export enum AppThemeSetting {
  // System = "system default",
  Normal,
  Black,
  // Light = "light",
}

export type AppSetting = {
  app_theme: AppThemeSetting,
  encryption: EncryptionMethod,
  history: boolean,
}

/** bootstrap-icon 1.8.3 */
export type BootstrapIcon = "arrow-up-left-square-fill" | "dice-3-fill" | "share-fill" | "heartbreak" | "bicycle" | "front" | "dribbble" | "suit-spade" | "mouse2-fill" | "align-end" | "eraser" | "clipboard-data-fill" | "chevron-bar-up" | "hourglass-bottom" | "heart-pulse-fill" | "calendar4-event" | "check-square" | "slash-square-fill" | "ui-radios-grid" | "plugin" | "badge-4k-fill" | "play-circle" | "circle" | "cloud-sleet-fill" | "ui-checks-grid" | "bookmark-plus-fill" | "briefcase" | "filter-circle" | "skip-backward-circle" | "bank2" | "chat-fill" | "arrow-90deg-right" | "reception-3" | "sort-alpha-down" | "credit-card" | "filetype-cs" | "lock" | "signpost" | "cart-dash-fill" | "basket2-fill" | "earbuds" | "box-arrow-right" | "filetype-php" | "pause-fill" | "diagram-3" | "chat-heart" | "printer" | "card-heading" | "filetype-ttf" | "trash" | "type-italic" | "archive" | "heart" | "arrow-down-square" | "menu-down" | "pause-circle" | "filter-square-fill" | "file-play" | "type-h3" | "asterisk" | "file-earmark-binary-fill" | "calendar2-event-fill" | "exclamation-triangle" | "envelope-paper-heart-fill" | "emoji-dizzy" | "gem" | "pentagon-half" | "heart-half" | "award-fill" | "smartwatch" | "person-x" | "forward-fill" | "pentagon" | "clipboard-plus-fill" | "nut" | "arrow-up-right" | "filetype-pdf" | "exclamation" | "umbrella-fill" | "x" | "mic-fill" | "ticket-perforated" | "dash-square-fill" | "fingerprint" | "thermometer" | "camera-video" | "badge-8k" | "file-break-fill" | "arrow-return-left" | "brightness-alt-high" | "arrow-left-square-fill" | "display" | "filetype-otf" | "cloud-lightning-rain" | "hurricane" | "code-slash" | "lightning" | "archive-fill" | "calendar" | "collection-play-fill" | "badge-ar" | "gpu-card" | "telegram" | "truck-flatbed" | "rulers" | "file-music-fill" | "text-indent-right" | "arrow-up-square" | "arrow-left-square" | "image-fill" | "file-person" | "symmetry-vertical" | "arrow-down-right-square-fill" | "backspace-fill" | "calendar-check" | "cloud-lightning-rain-fill" | "apple" | "bounding-box-circles" | "basket2" | "folder-x" | "cart2" | "question-square" | "cloud-plus" | "journal-arrow-up" | "building" | "collection-play" | "controller" | "filetype-mdx" | "brightness-alt-high-fill" | "skip-start-fill" | "badge-wc-fill" | "dash" | "calendar2-minus-fill" | "check-all" | "calendar2-week" | "chat-right-heart-fill" | "skip-start-btn-fill" | "laptop-fill" | "cloud-arrow-down-fill" | "postcard-fill" | "layout-sidebar-inset-reverse" | "list-nested" | "person-rolodex" | "shop" | "file-spreadsheet-fill" | "calendar3-event-fill" | "receipt-cutoff" | "sort-numeric-down" | "film" | "bag-check" | "file-earmark-slides" | "triangle-half" | "envelope" | "tablet-landscape-fill" | "file-excel-fill" | "file" | "toggles" | "credit-card-2-back-fill" | "funnel" | "postage-heart" | "menu-app-fill" | "stop-btn" | "file-lock2" | "headset-vr" | "pinterest" | "file-code-fill" | "layout-sidebar-reverse" | "map-fill" | "menu-button-fill" | "file-earmark-richtext-fill" | "file-ppt-fill" | "patch-check" | "filetype-xlsx" | "balloon-heart" | "fullscreen-exit" | "bookmark-x" | "exclamation-circle" | "gender-ambiguous" | "dot" | "kanban" | "arrow-up-right-circle-fill" | "briefcase-fill" | "layout-text-sidebar-reverse" | "ticket-fill" | "arrow-90deg-down" | "journal-plus" | "calendar-minus" | "thunderbolt" | "emoji-wink" | "arrow-return-right" | "inboxes" | "badge-sd" | "tags" | "filetype-exe" | "heptagon" | "gender-female" | "file-earmark-check-fill" | "align-middle" | "badge-3d" | "eraser-fill" | "emoji-smile-fill" | "file-earmark-post-fill" | "pc" | "chat-left-fill" | "plus" | "person-circle" | "calendar2-date" | "phone-flip" | "badge-cc-fill" | "droplet" | "moon-stars-fill" | "explicit-fill" | "geo-alt" | "emoji-dizzy-fill" | "card-text" | "dice-5" | "badge-wc" | "arrow-through-heart-fill" | "kanban-fill" | "journal-x" | "bug" | "file-earmark-code-fill" | "pen-fill" | "puzzle" | "file-earmark-code" | "skip-backward-fill" | "three-dots" | "menu-button-wide" | "usb-micro" | "badge-vr" | "bag-plus-fill" | "tag" | "cart4" | "dice-4" | "bounding-box" | "calendar3-event" | "folder" | "dash-square" | "steam" | "x-lg" | "slack" | "cloud-lightning" | "terminal-split" | "arrow-up-right-square" | "collection-fill" | "arrow-right-circle" | "badge-vo" | "x-circle-fill" | "cursor" | "bookmark-dash-fill" | "link-45deg" | "bag-dash" | "play-fill" | "boombox-fill" | "fonts" | "file-earmark-lock2-fill" | "usb-plug" | "people" | "suit-diamond" | "slash-circle" | "shield-check" | "alt" | "chevron-left" | "filetype-json" | "receipt" | "patch-minus" | "arrow-down-right-circle" | "mouse3" | "calendar-date" | "file-spreadsheet" | "layout-three-columns" | "shield-plus" | "sort-numeric-up-alt" | "telephone-x-fill" | "backspace-reverse-fill" | "check2-circle" | "person-fill" | "record-btn-fill" | "chat-right-text-fill" | "translate" | "mouse2" | "record2" | "hypnotize" | "usb" | "slash-lg" | "border-right" | "plus-slash-minus" | "emoji-frown" | "hourglass" | "caret-down-square-fill" | "git" | "filetype-md" | "calendar-day-fill" | "file-music" | "send" | "chat-square-fill" | "save" | "clouds-fill" | "optical-audio-fill" | "valentine2" | "chevron-up" | "plus-square-fill" | "volume-off-fill" | "exclamation-square" | "badge-ar-fill" | "caret-left-fill" | "menu-button" | "filter" | "credit-card-2-front-fill" | "projector" | "hdmi-fill" | "arrow-up" | "arrow-right" | "menu-app" | "chat-left-quote-fill" | "grid-3x2-gap-fill" | "grid-fill" | "caret-up" | "box2" | "file-earmark-medical" | "filetype-tiff" | "envelope-paper-fill" | "arrows-collapse" | "file-arrow-up-fill" | "speaker" | "patch-plus-fill" | "clipboard-minus" | "arrow-down-right-circle-fill" | "file-earmark-font-fill" | "filetype-xml" | "patch-minus-fill" | "emoji-expressionless" | "telephone-forward" | "filetype-jsx" | "shift-fill" | "thermometer-high" | "octagon" | "circle-square" | "calendar-week-fill" | "cloud-check" | "handbag-fill" | "send-exclamation" | "sort-numeric-up" | "cone" | "filetype-java" | "stoplights-fill" | "x-diamond" | "send-check" | "envelope-heart" | "reception-0" | "battery" | "file-word-fill" | "bag-heart" | "geo-alt-fill" | "stop-fill" | "shield" | "phone" | "sunset-fill" | "chat-square-heart-fill" | "arrow-down-circle-fill" | "play-btn" | "calendar2-day-fill" | "person-bounding-box" | "share" | "pin-angle" | "file-earmark-word-fill" | "filetype-png" | "file-earmark-minus-fill" | "moon" | "file-pdf-fill" | "windows" | "robot" | "bag" | "file-x-fill" | "envelope-fill" | "file-earmark-arrow-down" | "cloud-hail" | "blockquote-right" | "clipboard-x-fill" | "tsunami" | "cloud-sun" | "bell-fill" | "quote" | "egg" | "hand-thumbs-down" | "pin-fill" | "text-center" | "arrow-bar-up" | "envelope-plus" | "hdd-network-fill" | "file-medical-fill" | "command" | "toggle2-off" | "magnet" | "play-btn-fill" | "x-octagon" | "file-post" | "clipboard2-pulse" | "filetype-gif" | "postcard" | "microsoft" | "phone-vibrate" | "pause" | "envelope-exclamation" | "chat-text-fill" | "dash-lg" | "lightbulb-fill" | "type-strikethrough" | "menu-button-wide-fill" | "bootstrap-reboot" | "envelope-open-heart-fill" | "behance" | "volume-up" | "toggle-on" | "file-image" | "chevron-double-up" | "clipboard2-data-fill" | "envelope-exclamation-fill" | "calendar2-range-fill" | "info-lg" | "arrow-90deg-up" | "eyeglasses" | "bezier2" | "cloud" | "pip-fill" | "hand-index-thumb-fill" | "badge-tm" | "file-earmark-image" | "ear-fill" | "lightning-charge" | "bag-dash-fill" | "at" | "suit-spade-fill" | "bar-chart-steps" | "window-x" | "broadcast" | "spotify" | "hdd-stack" | "file-code" | "pin-map-fill" | "emoji-heart-eyes-fill" | "magnet-fill" | "upload" | "chat-quote-fill" | "cloud-upload-fill" | "binoculars" | "skip-end" | "reply-all" | "file-earmark-arrow-down-fill" | "send-exclamation-fill" | "border-middle" | "paint-bucket" | "chat-left-text-fill" | "hourglass-top" | "shield-x" | "safe-fill" | "exclamation-square-fill" | "badge-sd-fill" | "file-earmark-ppt" | "caret-right-square-fill" | "question-square-fill" | "trash2-fill" | "reply" | "paperclip" | "file-earmark-bar-graph" | "brightness-high-fill" | "file-earmark-music-fill" | "graph-up" | "power" | "calendar-date-fill" | "layout-text-window-reverse" | "filetype-rb" | "playstation" | "battery-half" | "filetype-doc" | "person-plus-fill" | "cloud-fog2" | "file-play-fill" | "suit-heart-fill" | "unlock" | "file-diff" | "dice-2-fill" | "sort-down-alt" | "cast" | "arrow-right-short" | "volume-down" | "filetype-psd" | "music-note-beamed" | "calendar-month-fill" | "hdd-network" | "boxes" | "type" | "grid-3x3-gap" | "reddit" | "envelope-slash-fill" | "layer-forward" | "file-binary-fill" | "bookmark-star" | "file-earmark-spreadsheet-fill" | "heart-pulse" | "headset" | "stopwatch" | "lightbulb-off-fill" | "hand-thumbs-down-fill" | "check2-square" | "arrow-down-right" | "record2-fill" | "toggle2-on" | "yin-yang" | "cloud-fill" | "justify-right" | "bag-x" | "trash3" | "phone-fill" | "pencil" | "three-dots-vertical" | "safe" | "wifi-2" | "pause-btn-fill" | "filetype-js" | "file-pdf" | "clipboard2-plus-fill" | "bag-check-fill" | "check2" | "emoji-sunglasses-fill" | "envelope-plus-fill" | "server" | "stopwatch-fill" | "bell-slash-fill" | "capslock" | "chat-left-heart-fill" | "cloudy-fill" | "calendar4" | "diamond" | "check2-all" | "keyboard" | "box-arrow-in-up-right" | "file-binary" | "border-outer" | "octagon-fill" | "box-arrow-down-left" | "box2-heart" | "box" | "filetype-ppt" | "clipboard-pulse" | "list-ol" | "motherboard-fill" | "clipboard2-check" | "reception-4" | "envelope-heart-fill" | "patch-question" | "easel-fill" | "sliders2-vertical" | "usb-symbol" | "chat-left-dots-fill" | "calendar2-month-fill" | "shop-window" | "chat-right-heart" | "file-earmark-lock" | "sunset" | "terminal-plus" | "filetype-mov" | "aspect-ratio" | "folder-symlink-fill" | "dice-4-fill" | "skip-backward" | "file-slides" | "caret-down-square" | "filetype-pptx" | "chat-right-quote-fill" | "suit-heart" | "record-circle" | "align-bottom" | "folder-fill" | "cloud-drizzle" | "suit-diamond-fill" | "skip-end-circle-fill" | "window-fullscreen" | "bell-slash" | "emoji-neutral" | "person-dash" | "caret-left" | "crop" | "cloud-plus-fill" | "house-door" | "chat-left-dots" | "plus-square-dotted" | "filetype-scss" | "cloud-moon-fill" | "filetype-xls" | "emoji-heart-eyes" | "x-square" | "google" | "clipboard2" | "sort-alpha-up-alt" | "volume-off" | "chat-square-text-fill" | "shield-fill" | "file-arrow-up" | "star" | "arrow-right-square-fill" | "star-half" | "shield-lock-fill" | "arrow-up-left-circle-fill" | "grid-1x2-fill" | "file-earmark-break" | "xbox" | "usb-mini-fill" | "image" | "file-earmark-zip" | "box-arrow-up-right" | "mouse-fill" | "vr" | "border-inner" | "badge-3d-fill" | "puzzle-fill" | "body-text" | "clock-history" | "cart-plus-fill" | "file-plus-fill" | "percent" | "snow3" | "pin-angle-fill" | "umbrella" | "envelope-check-fill" | "ladder" | "cloud-sleet" | "zoom-in" | "currency-dollar" | "calendar-heart" | "cursor-text" | "brightness-low-fill" | "slash-circle-fill" | "calculator" | "stop-circle" | "pci-card" | "layout-text-window" | "sd-card" | "palette2" | "chat-quote" | "modem-fill" | "bar-chart-fill" | "calendar-event-fill" | "subtract" | "pentagon-fill" | "table" | "wifi-1" | "file-arrow-down" | "heart-arrow" | "align-start" | "capslock-fill" | "diagram-2" | "calendar2-heart-fill" | "qr-code" | "activity" | "badge-4k" | "palette" | "easel3-fill" | "clipboard2-minus-fill" | "water" | "map" | "pause-circle-fill" | "envelope-paper" | "cloud-haze" | "inbox-fill" | "wallet" | "calendar-fill" | "calendar-check-fill" | "sim-fill" | "file-richtext-fill" | "file-earmark-plus" | "file-earmark-excel" | "flag-fill" | "tv" | "clipboard2-pulse-fill" | "exclamation-lg" | "clipboard-check-fill" | "cloud-haze-fill" | "grid-3x3" | "whatsapp" | "calendar2-day" | "suit-club" | "meta" | "circle-fill" | "chevron-compact-up" | "stack-overflow" | "bucket" | "cash" | "123" | "filetype-jpg" | "house-heart" | "arrow-down-left-circle" | "device-hdd" | "file-earmark-arrow-up-fill" | "file-earmark-text-fill" | "chevron-compact-left" | "pause-btn" | "card-checklist" | "pen" | "cart-check" | "calendar2-range" | "cloud-drizzle-fill" | "camera-video-fill" | "file-earmark-zip-fill" | "calendar-month" | "nut-fill" | "calendar-week" | "cloud-slash-fill" | "save2" | "flower1" | "credit-card-2-back" | "window-dash" | "arrows-angle-expand" | "fullscreen" | "compass-fill" | "plus-circle-fill" | "file-check-fill" | "type-bold" | "send-dash-fill" | "brightness-alt-low-fill" | "sticky" | "window-split" | "ui-checks" | "dash-square-dotted" | "person-dash-fill" | "paragraph" | "type-underline" | "bezier" | "camera" | "badge-hd-fill" | "calendar-range" | "dpad-fill" | "skip-start-circle-fill" | "graph-down-arrow" | "basket-fill" | "envelope-x" | "stop-circle-fill" | "radioactive" | "speaker-fill" | "hdd-rack-fill" | "clock-fill" | "snapchat" | "cart3" | "arrow-left" | "plus-lg" | "skip-forward-circle-fill" | "envelope-slash" | "calendar-minus-fill" | "emoji-laughing-fill" | "bug-fill" | "record" | "journal" | "flower3" | "grid-3x2" | "pin-map" | "eye-slash" | "laptop" | "envelope-dash-fill" | "dice-1-fill" | "ticket-detailed" | "megaphone-fill" | "file-earmark-ruled-fill" | "person-hearts" | "bag-plus" | "upc" | "dash-circle-dotted" | "cloud-fog-fill" | "mic-mute-fill" | "snow" | "view-stacked" | "sort-up" | "box-arrow-in-up" | "arrow-down-up" | "layers-fill" | "skip-backward-circle-fill" | "caret-left-square-fill" | "lock-fill" | "emoji-neutral-fill" | "filetype-docx" | "bullseye" | "bootstrap-fill" | "box-arrow-in-right" | "volume-mute" | "question-diamond" | "box-arrow-down-right" | "square" | "disc-fill" | "envelope-open" | "segmented-nav" | "file-earmark-play" | "cloud-hail-fill" | "sliders" | "usb-plug-fill" | "bell" | "shield-fill-check" | "alarm-fill" | "calendar2-week-fill" | "filetype-wav" | "clipboard2-x-fill" | "border-width" | "hdd-rack" | "envelope-check" | "suit-club-fill" | "upc-scan" | "journal-text" | "filter-square" | "telephone-x" | "bricks" | "skype" | "soundwave" | "bluetooth" | "lamp" | "file-person-fill" | "telephone-outbound-fill" | "journal-code" | "file-earmark-binary" | "bootstrap" | "rainbow" | "bookmark-heart" | "calendar3-week-fill" | "cloud-arrow-up" | "person" | "quora" | "shift" | "battery-charging" | "door-open-fill" | "tropical-storm" | "filetype-key" | "currency-exchange" | "arrow-left-circle" | "snow2" | "rss-fill" | "newspaper" | "signpost-2" | "file-font" | "globe" | "cpu-fill" | "file-check" | "youtube" | "file-earmark-minus" | "arrow-up-circle-fill" | "file-earmark-ppt-fill" | "grip-horizontal" | "layout-wtf" | "textarea" | "filter-right" | "image-alt" | "stars" | "postcard-heart" | "disc" | "file-ruled" | "file-text" | "filetype-m4p" | "filetype-yml" | "megaphone" | "person-plus" | "cash-stack" | "phone-vibrate-fill" | "text-paragraph" | "gear-wide-connected" | "flag" | "input-cursor" | "node-minus" | "credit-card-fill" | "scissors" | "calendar2-date-fill" | "webcam-fill" | "file-earmark-diff-fill" | "lamp-fill" | "skip-backward-btn-fill" | "skip-end-btn-fill" | "chat-square-heart" | "journal-check" | "symmetry-horizontal" | "journal-arrow-down" | "chevron-bar-left" | "chat-left-text" | "geo" | "arrow-left-right" | "cloud-fog2-fill" | "search-heart" | "tornado" | "exclamation-triangle-fill" | "emoji-expressionless-fill" | "menu-up" | "file-diff-fill" | "cloud-minus" | "chevron-double-left" | "play" | "send-plus" | "emoji-kiss" | "eye" | "union" | "folder2-open" | "cup-straw" | "cone-striped" | "calendar2-heart" | "mask" | "hearts" | "wrench-adjustable" | "columns" | "clipboard-x" | "brightness-high" | "lightbulb" | "calendar-x-fill" | "back" | "music-note" | "reply-all-fill" | "wrench" | "chat-dots-fill" | "arrow-left-short" | "square-half" | "file-earmark-image-fill" | "sort-numeric-down-alt" | "webcam" | "calendar2-plus-fill" | "file-richtext" | "filetype-sass" | "journal-bookmark-fill" | "caret-up-fill" | "reply-fill" | "emoji-kiss-fill" | "file-earmark-diff" | "thermometer-snow" | "messenger" | "github" | "hash" | "arrows-move" | "border-center" | "patch-plus" | "easel2-fill" | "pc-display" | "record-circle-fill" | "people-fill" | "border-all" | "music-note-list" | "graph-up-arrow" | "file-earmark-bar-graph-fill" | "send-x" | "chevron-bar-right" | "file-bar-graph-fill" | "file-fill" | "patch-question-fill" | "hdd" | "piggy-bank-fill" | "shield-fill-plus" | "emoji-smile-upside-down-fill" | "tablet-fill" | "chevron-bar-contract" | "calendar2-event" | "stickies-fill" | "arrow-down-left-square-fill" | "diamond-half" | "octagon-half" | "clipboard-heart" | "balloon" | "plug-fill" | "currency-bitcoin" | "dice-2" | "cloud-arrow-down" | "arrow-right-square" | "calendar2" | "bookmark-fill" | "file-earmark-lock-fill" | "door-open" | "thermometer-sun" | "cash-coin" | "chevron-down" | "clipboard2-x" | "printer-fill" | "layout-split" | "skip-end-circle" | "record-fill" | "box-arrow-in-down-right" | "collection" | "clipboard" | "bookmarks-fill" | "hdd-stack-fill" | "play-circle-fill" | "bookmark-check" | "gift" | "envelope-open-fill" | "clipboard2-fill" | "emoji-wink-fill" | "device-ssd-fill" | "calendar3" | "arrow-bar-down" | "slash-square" | "strava" | "caret-left-square" | "app" | "calendar-plus" | "envelope-x-fill" | "cloud-arrow-up-fill" | "dpad" | "intersect" | "signpost-fill" | "dice-6-fill" | "terminal-dash" | "tiktok" | "chat-right" | "volume-up-fill" | "bookmarks" | "file-earmark-check" | "arrow-up-left-circle" | "patch-exclamation" | "sort-alpha-up" | "plus-square" | "file-earmark-fill" | "arrow-up-right-circle" | "cloud-fog" | "bookmark-x-fill" | "hourglass-split" | "file-break" | "telephone-plus-fill" | "file-medical" | "sliders2" | "skip-forward" | "card-image" | "bookshelf" | "calendar-plus-fill" | "postcard-heart-fill" | "arrow-90deg-left" | "folder-check" | "justify-left" | "telephone-plus" | "telephone-minus-fill" | "book-half" | "shield-fill-exclamation" | "router-fill" | "clipboard2-minus" | "broadcast-pin" | "cloud-download-fill" | "layers" | "box-arrow-up" | "caret-right" | "border-bottom" | "cup-fill" | "skip-start" | "dice-6" | "heart-fill" | "shield-minus" | "balloon-fill" | "send-slash-fill" | "folder2" | "braces" | "patch-check-fill" | "ticket-perforated-fill" | "chat-heart-fill" | "hexagon-half" | "cloud-slash" | "telephone-inbound" | "eject-fill" | "clipboard-data" | "send-slash" | "skip-end-btn" | "cloud-haze2" | "arrow-bar-right" | "clipboard2-heart-fill" | "calendar4-week" | "camera-fill" | "file-lock-fill" | "memory" | "pie-chart" | "hand-thumbs-up" | "skip-forward-btn-fill" | "safe2-fill" | "window-dock" | "reception-2" | "vector-pen" | "hr" | "file-earmark-word" | "sunrise" | "chevron-bar-down" | "easel2" | "instagram" | "file-excel" | "file-earmark-arrow-up" | "badge-ad-fill" | "aspect-ratio-fill" | "wind" | "skip-backward-btn" | "info-square" | "person-heart" | "box-arrow-in-left" | "displayport-fill" | "folder-minus" | "box-arrow-in-down-left" | "box-arrow-down" | "thunderbolt-fill" | "shield-lock" | "incognito" | "calendar2-month" | "mic" | "bookmark-plus" | "send-plus-fill" | "house-heart-fill" | "exclamation-octagon-fill" | "filetype-svg" | "valentine" | "tablet-landscape" | "arrows-fullscreen" | "box-arrow-up-left" | "type-h1" | "trophy" | "binoculars-fill" | "phone-landscape-fill" | "usb-c-fill" | "markdown-fill" | "border-left" | "speedometer2" | "exclamation-circle-fill" | "person-workspace" | "gender-male" | "heptagon-fill" | "file-plus" | "file-earmark-font" | "calendar3-range" | "twitter" | "envelope-open-heart" | "file-earmark" | "calendar-heart-fill" | "mic-mute" | "cursor-fill" | "palette-fill" | "moon-stars" | "stickies" | "arrow-through-heart" | "file-bar-graph" | "signpost-split" | "device-hdd-fill" | "images" | "calendar-day" | "gear-wide" | "journal-album" | "badge-vr-fill" | "filetype-aac" | "explicit" | "pencil-fill" | "send-check-fill" | "diamond-fill" | "arrow-up-left" | "dash-circle-fill" | "calendar3-week" | "gender-trans" | "arrow-down-short" | "cloud-rain-heavy" | "cloud-snow-fill" | "clipboard2-plus" | "cpu" | "journal-medical" | "cup" | "stop" | "arrow-up-square-fill" | "info" | "bar-chart-line" | "terminal-fill" | "question-octagon" | "usb-fill" | "compass" | "arrow-up-circle" | "camera2" | "mailbox" | "calendar2-x" | "hdd-fill" | "eyedropper" | "skip-end-fill" | "list-ul" | "thermometer-half" | "filetype-heic" | "file-earmark-ruled" | "filetype-bmp" | "info-circle" | "box-arrow-left" | "x-octagon-fill" | "hospital-fill" | "bookmark-dash" | "line" | "recycle" | "calendar-event" | "clipboard-check" | "chat-right-fill" | "brush-fill" | "file-earmark-text" | "save-fill" | "folder-plus" | "file-earmark-post" | "ui-radios" | "mastodon" | "globe2" | "calendar2-check" | "chat-left" | "save2-fill" | "file-earmark-person-fill" | "truck" | "grid-3x2-gap" | "type-h2" | "textarea-t" | "shield-fill-x" | "clipboard-fill" | "volume-down-fill" | "postage" | "chevron-right" | "x-circle" | "window-desktop" | "file-zip-fill" | "filetype-mp3" | "file-minus" | "person-video3" | "envelope-dash" | "camera-video-off" | "discord" | "pip" | "calendar2-x-fill" | "layer-backward" | "lightning-fill" | "option" | "chevron-compact-down" | "file-lock" | "plus-circle" | "arrow-down-left" | "infinity" | "trash-fill" | "heptagon-half" | "inboxes-fill" | "emoji-laughing" | "chevron-compact-right" | "exclamation-diamond" | "clouds" | "clipboard2-check-fill" | "backspace" | "cloud-sun-fill" | "projector-fill" | "code" | "calendar2-check-fill" | "diagram-2-fill" | "clipboard-plus" | "file-earmark-pdf" | "filetype-woff" | "stoplights" | "magic" | "cloud-rain-fill" | "border" | "markdown" | "sort-up-alt" | "info-circle-fill" | "key-fill" | "music-player" | "file-earmark-lock2" | "badge-cc" | "filetype-sh" | "voicemail" | "hdmi" | "caret-down-fill" | "clock" | "camera-reels-fill" | "fan" | "pie-chart-fill" | "telephone-outbound" | "window" | "person-badge" | "grip-vertical" | "qr-code-scan" | "calendar4-range" | "medium" | "window-stack" | "filetype-css" | "balloon-heart-fill" | "bag-heart-fill" | "exclamation-diamond-fill" | "send-x-fill" | "spellcheck" | "caret-up-square" | "distribute-vertical" | "bandaid" | "chat-right-quote" | "tablet" | "file-earmark-slides-fill" | "key" | "linkedin" | "emoji-sunglasses" | "download" | "file-word" | "dice-1" | "border-style" | "shield-slash-fill" | "handbag" | "wifi-off" | "exclude" | "arrows-expand" | "chat-left-heart" | "tree-fill" | "file-lock2-fill" | "triangle-fill" | "mailbox2" | "currency-euro" | "emoji-angry-fill" | "chevron-contract" | "tags-fill" | "graph-down" | "optical-audio" | "hexagon-fill" | "check-circle-fill" | "chat-square-dots-fill" | "person-video" | "skip-start-btn" | "moisture" | "caret-right-fill" | "emoji-frown-fill" | "usb-mini" | "sort-alpha-down-alt" | "file-earmark-excel-fill" | "vinyl" | "cloud-check-fill" | "layout-sidebar" | "brightness-low" | "bookmark-star-fill" | "shield-shaded" | "arrow-counterclockwise" | "filetype-html" | "emoji-smile-upside-down" | "file-earmark-person" | "stop-btn-fill" | "filetype-csv" | "forward" | "shield-fill-minus" | "file-ppt" | "file-font-fill" | "clipboard-minus-fill" | "arrow-up-short" | "facebook" | "chat" | "filter-left" | "device-ssd" | "box-seam" | "layout-text-sidebar" | "house-door-fill" | "reception-1" | "exclamation-octagon" | "cloud-rain" | "volume-mute-fill" | "file-image-fill" | "twitch" | "send-fill" | "keyboard-fill" | "file-easel-fill" | "wifi" | "usb-drive-fill" | "question-circle" | "chevron-double-down" | "credit-card-2-front" | "telephone-inbound-fill" | "journal-richtext" | "easel3" | "sunglasses" | "cart" | "ticket" | "arrow-up-right-square-fill" | "signpost-split-fill" | "telephone-fill" | "brightness-alt-low" | "bookmark" | "triangle" | "chevron-bar-expand" | "emoji-smile" | "hammer" | "brush" | "columns-gap" | "egg-fried" | "signpost-2-fill" | "arrow-right-circle-fill" | "file-x" | "record-btn" | "moon-fill" | "telephone-forward-fill" | "file-post-fill" | "file-earmark-music" | "calendar2-fill" | "pc-display-horizontal" | "dice-5-fill" | "code-square" | "eject" | "flower2" | "chat-right-text" | "droplet-fill" | "arrow-down-circle" | "cart-fill" | "cloud-lightning-fill" | "usb-c" | "calendar3-fill" | "eye-fill" | "terminal-x" | "router" | "nintendo-switch" | "circle-half" | "box-arrow-in-down" | "chat-right-dots" | "file-earmark-x-fill" | "mortarboard-fill" | "journal-minus" | "slash" | "vimeo" | "question-lg" | "paypal" | "send-dash" | "plug" | "tv-fill" | "calendar-range-fill" | "plus-circle-dotted" | "grid" | "cart-dash" | "distribute-horizontal" | "clipboard2-heart" | "filetype-tsx" | "square-fill" | "file-earmark-plus-fill" | "filter-circle-fill" | "chat-square" | "view-list" | "toggles2" | "trophy-fill" | "wrench-adjustable-circle" | "tools" | "wallet-fill" | "dice-3" | "skip-start-circle" | "watch" | "arrow-bar-left" | "arrows-angle-contract" | "align-top" | "basket3" | "toggle-off" | "input-cursor-text" | "file-text-fill" | "usb-micro-fill" | "bookmark-check-fill" | "hand-index-thumb" | "person-check-fill" | "minecart-loaded" | "cart-x" | "list-stars" | "basket3-fill" | "star-fill" | "cart-plus" | "geo-fill" | "minecart" | "hospital" | "sun-fill" | "speedometer" | "person-check" | "sort-down" | "peace-fill" | "phone-landscape" | "chat-dots" | "book-fill" | "grid-1x2" | "bar-chart" | "motherboard" | "skip-forward-fill" | "cloud-haze2-fill" | "filetype-txt" | "skip-forward-circle" | "chat-square-dots" | "funnel-fill" | "cloud-minus-fill" | "gear-fill" | "heartbreak-fill" | "award" | "filetype-ai" | "filetype-py" | "filetype-raw" | "chevron-expand" | "postage-heart-fill" | "droplet-half" | "list-columns" | "gift-fill" | "chat-square-text" | "telephone" | "wrench-adjustable-circle-fill" | "telephone-minus" | "signal" | "question-octagon-fill" | "list-task" | "text-right" | "stack" | "chat-left-quote" | "file-ruled-fill" | "chevron-double-right" | "align-center" | "files-alt" | "arrow-down-square-fill" | "cart-x-fill" | "pc-horizontal" | "shuffle" | "bank" | "door-closed-fill" | "calendar-x" | "shield-exclamation" | "person-square" | "journal-bookmark" | "calendar2-minus" | "postage-fill" | "arrow-down-left-square" | "box2-fill" | "ear" | "hexagon" | "easel" | "text-indent-left" | "caret-up-square-fill" | "house" | "mortarboard" | "window-sidebar" | "card-list" | "outlet" | "terminal" | "eye-slash-fill" | "textarea-resize" | "diagram-3-fill" | "clipboard-heart-fill" | "joystick" | "question-diamond-fill" | "wordpress" | "trash2" | "folder-symlink" | "grid-3x3-gap-fill" | "pencil-square" | "camera-video-off-fill" | "hand-index-fill" | "envelope-paper-heart" | "person-video2" | "x-square-fill" | "display-fill" | "book" | "badge-hd" | "files" | "bookmark-heart-fill" | "battery-full" | "life-preserver" | "cloud-upload" | "coin" | "badge-vo-fill" | "person-badge-fill" | "border-top" | "displayport" | "file-earmark-easel-fill" | "lightning-charge-fill" | "file-minus-fill" | "list-check" | "file-earmark-pdf-fill" | "cloud-rain-heavy-fill" | "backspace-reverse" | "vinyl-fill" | "badge-ad" | "basket" | "x-diamond-fill" | "tree" | "search-heart-fill" | "rss" | "journals" | "caret-down" | "arrow-down" | "file-zip" | "list-columns-reverse" | "sun" | "boombox" | "lightbulb-off" | "file-earmark-spreadsheet" | "layout-sidebar-inset" | "peace" | "bucket-fill" | "tag-fill" | "cloud-snow" | "badge-tm-fill" | "file-slides-fill" | "question-circle-fill" | "dash-circle" | "calculator-fill" | "file-easel" | "node-plus-fill" | "check-square-fill" | "mouse3-fill" | "currency-pound" | "list" | "unlock-fill" | "emoji-angry" | "justify" | "box-arrow-in-up-left" | "check-circle" | "arrow-repeat" | "arrow-down-right-square" | "blockquote-left" | "person-x-fill" | "file-earmark-richtext" | "bag-fill" | "layers-half" | "braces-asterisk" | "modem" | "person-lines-fill" | "chat-right-dots-fill" | "wallet2" | "arrow-left-circle-fill" | "ethernet" | "gear" | "badge-8k-fill" | "safe2" | "filetype-mp4" | "arrow-down-left-circle-fill" | "sticky-fill" | "cloud-moon" | "node-plus" | "file-earmark-play-fill" | "pin" | "chat-square-quote" | "file-arrow-down-fill" | "egg-fill" | "link" | "chat-square-quote-fill" | "sim" | "patch-exclamation-fill" | "app-indicator" | "text-left" | "box2-heart-fill" | "house-fill" | "calendar3-range-fill" | "skip-forward-btn" | "currency-yen" | "camera-reels" | "cloud-download" | "music-player-fill" | "bag-x-fill" | "headphones" | "check" | "bandaid-fill" | "arrow-clockwise" | "sunrise-fill" | "cart-check-fill" | "bar-chart-line-fill" | "alarm" | "window-plus" | "door-closed" | "hand-thumbs-up-fill" | "sd-card-fill" | "info-square-fill" | "file-earmark-x" | "clipboard2-data" | "arrow-up-left-square" | "search" | "shield-slash" | "usb-drive" | "trash3-fill" | "ticket-detailed-fill" | "caret-right-square" | "node-minus-fill" | "piggy-bank" | "file-earmark-medical-fill" | "chat-text" | "hand-index" | "thermometer-low" | "inbox" | "file-earmark-easel" | "question" | "cloudy" | "mouse" | "screwdriver" | "calendar2-plus" | "file-earmark-break-fill" | "zoom-out" | "check-lg"
