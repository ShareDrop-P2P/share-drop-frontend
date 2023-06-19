import addUserIcon from "~/components/icons/AddUserIcon"
import bellIcon from "~/components/icons/BellIcon"
import blankFileIcon from "~/components/icons/BlankFileIcon"
import chatIcon from "~/components/icons/ChatIcon"
import checkIcon from "~/components/icons/CheckIcon"
import chevronDoubleDownIcon from "~/components/icons/ChevronDoubleDownIcon"
import chevronDoubleUpIcon from "~/components/icons/ChevronDoubleUpIcon"
import closeIcon from "~/components/icons/CloseIcon"
import coffeeIcon from "~/components/icons/CoffeeIcon"
import copyIcon from "~/components/icons/CopyIcon"
import copyrightIcon from "~/components/icons/CopyrightIcon"
import dotIcon from "~/components/icons/DotIcon"
import dropDownIcon from "~/components/icons/DropDownIcon"
import editIcon from "~/components/icons/EditIcon"
import emailIcon from "~/components/icons/EmailIcon"
import errorIcon from "~/components/icons/ErrorIcon"
import eyeCloseIcon from "~/components/icons/EyeCloseIcon"
import eyeOpenIcon from "~/components/icons/EyeOpenIcon"
import facebookIcon from "~/components/icons/FacebookIcon"
import fileDownload from "~/components/icons/FileDownloadIcon"
import gridAddIcon from "~/components/icons/GridAddIcon"
import infoIcon from "~/components/icons/InfoIcon"
import instagramIcon from "~/components/icons/InstagramIcon"
import linkedinIcon from "~/components/icons/LinkedinIcon"
import menuIcon from "~/components/icons/MenuIcon"
import messengerIcon from "~/components/icons/MessengerIcon"
import moonIcon from "~/components/icons/MoonIcon"
import musicIcon from "~/components/icons/MusicIcon"
import pinterestIcon from "~/components/icons/PinterestIcon"
import redditIcon from "~/components/icons/RedditIcon"
import reloadIcon from "~/components/icons/ReloadIcon"
import sendIcon from "~/components/icons/SendIcon"
import settingIcon from "~/components/icons/SettingIcon"
import skypeIcon from "~/components/icons/SkypeIcon"
import smsIcon from "~/components/icons/SmsIcon"
import starIcon from "~/components/icons/StarIcon"
import sunIcon from "~/components/icons/SunIcon"
import telegramIcon from "~/components/icons/TelegramIcon"
import trashIcon from "~/components/icons/TrashIcon"
import twitterIcon from "~/components/icons/TwitterIcon"
import videoIcon from "~/components/icons/VideoIcon"
import whatsappIcon from "~/components/icons/WhatsappIcon"
import youtubeIcon from "~/components/icons/YoutubeIcon"

// Custom Icons
const MY_ICONS = {
  'svg-menu': {
    component: menuIcon
  },
  'svg-sun': {
    component: sunIcon
  },
  'svg-info': {
    component: infoIcon
  },
  'svg-setting': {
    component: settingIcon
  },
  'svg-grid-add': {
    component: gridAddIcon
  },
  'svg-copyright': {
    component: copyrightIcon
  },
  'svg-facebook': {
    component: facebookIcon
  },
  'svg-twitter': {
    component: twitterIcon
  },
  'svg-youtube': {
    component: youtubeIcon
  },
  'svg-pinterest': {
    component: pinterestIcon
  },
  'svg-instagram': {
    component: instagramIcon
  },
  'svg-send': {
    component: sendIcon
  },
  'svg-chat': {
    component: chatIcon
  },
  'svg-dot': {
    component: dotIcon
  },
  'svg-copy': {
    component: copyIcon
  },
  'svg-linkedin': {
    component: linkedinIcon
  },
  'svg-reddit': {
    component: redditIcon
  },
  'svg-email': {
    component: emailIcon
  },
  'svg-sms': {
    component: smsIcon
  },
  'svg-messenger': {
    component: messengerIcon
  },
  'svg-whatsapp': {
    component: whatsappIcon
  },
  'svg-telegram': {
    component: telegramIcon
  },
  'svg-skype': {
    component: skypeIcon
  },
  'svg-close': {
    component: closeIcon
  },
  'svg-check': {
    component: checkIcon
  },
  'svg-coffee': {
    component: coffeeIcon
  },
  'svg-reload': {
    component: reloadIcon
  },
  'svg-edit': {
    component: editIcon
  },
  'svg-eye-close': {
    component: eyeCloseIcon
  },
  'svg-eye-open': {
    component: eyeOpenIcon
  },
  'svg-chevron-double-up': {
    component: chevronDoubleUpIcon
  },
  'svg-chevron-double-down': {
    component: chevronDoubleDownIcon
  },
  'svg-error': {
    component: errorIcon
  },
  'svg-bell': {
    component: bellIcon
  },
  'svg-trash': {
    component: trashIcon
  },
  'svg-star': {
    component: starIcon
  },
  'svg-blank-file': {
    component: blankFileIcon
  },
  'svg-video': {
    component: videoIcon
  },
  'svg-music': {
    component: musicIcon
  },
  'svg-file-download': {
    component: fileDownload
  },
  'svg-drop-down': {
    component: dropDownIcon
  },
  'svg-add-user': {
    component: addUserIcon
  },
  'svg-moon': {
    component: moonIcon
  }
}

// Dark mode
// Set local storage for check user already use dark mode or not
const theme = localStorage.getItem('useDarkTheme')
let useDarkTheme = false

if (theme) {
  if (theme === 'true') {
    useDarkTheme = true
  } else {
    useDarkTheme = false
  }
}

export default {
  theme: {
    dark: useDarkTheme,
    themes: {
      light: {
        black: '#191B2A',
        'gray-light': '#F0F0F0',
        'icon--white': '#fff',
      },
      dark: {
        black: '#fff',
        white: '#191B2A',
        'gray-light': '#262834',
        'icon--white': '#fff',
      },
    }
  },
  icons: {
    values: MY_ICONS
  }
}