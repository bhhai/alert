import React from "react";
import IconXmark from "assets/icons/icon-xmark.svg";
import IconBell from "assets/icons/icon-bell.svg";
import IconBook from "assets/icons/icon-book.svg";
import IconCalendar from "assets/icons/icon-calendar.svg";
import IconCaretDown from "assets/icons/icon-caret-down.svg";
import IconCaretLeft from "assets/icons/icon-caret-left.svg";
import IconCaretRight from "assets/icons/icon-caret-right.svg";
import IconCaretUp from "assets/icons/icon-caret-up.svg";
import IconChat from "assets/icons/icon-chat.svg";
import IconChevronDown from "assets/icons/icon-chevron-down.svg";
import IconChevronUp from "assets/icons/icon-chevron-up.svg";
import IconChevronLeft from "assets/icons/icon-chevron-left.svg";
import IconChevronRight from "assets/icons/icon-chevron-right.svg";
import IconChevronDoubleDown from "assets/icons/icon-chevron-double-down.svg";
import IconChevronDoubleUp from "assets/icons/icon-chevron-double-up.svg";
import IconChevronDoubleLeft from "assets/icons/icon-chevron-double-left.svg";
import IconChevronDoubleRight from "assets/icons/icon-chevron-double-right.svg";
import IconClock from "assets/icons/icon-clock.svg";
import IconCopy from "assets/icons/icon-copy.svg";
import IconCreditCard from "assets/icons/icon-credit-card.svg";
import IconDownload from "assets/icons/icon-download.svg";
import IconFingerTouch from "assets/icons/icon-finger-touch.svg";
import IconFullscreen from "assets/icons/icon-fullscreen.svg";
import IconHome from "assets/icons/icon-home.svg";
import IconLike from "assets/icons/icon-thumbs-up.svg";
import IconComment from "assets/icons/icon-message-square.svg";
import IconShare from "assets/icons/icon-share-2.svg";
import IconLock from "assets/icons/icon-lock.svg";
import IconLogin from "assets/icons/icon-login.svg";
import IconLogout from "assets/icons/icon-logout.svg";
import IconMail from "assets/icons/icon-mail.svg";
import IconPaperClipboard from "assets/icons/icon-paper-clipboard.svg";
import IconPhone from "assets/icons/icon-phone.svg";
import IconPlay from "assets/icons/icon-play.svg";
import IconPlusCircle from "assets/icons/icon-plus-circle.svg";
import IconPlusCircleFill from "assets/icons/icon-plus-circle-fill.svg";
import IconReport from "assets/icons/icon-report.svg";
import IconReturns from "assets/icons/icon-returns.svg";
import IconSaleDrug from "assets/icons/icon-sale-drug.svg";
import IconSearch from "assets/icons/icon-search.svg";
import IconSettings from "assets/icons/icon-settings.svg";
import IconSortby from "assets/icons/icon-sortby.svg";
import IconTimes from "assets/icons/icon-times.svg";
import IconUpload from "assets/icons/icon-upload.svg";
import IconUser from "assets/icons/icon-user.svg";
import IconUserAdd from "assets/icons/icon-user-add.svg";
import IconUserCircle from "assets/icons/icon-user-circle.svg";
import IconEye from "assets/icons/icon-eye.svg";
import IconEyeSlash from "assets/icons/icon-eye-slash.svg";
import IconLoading from "assets/icons/icon-loading.svg";
import IconIncrease from "assets/icons/icon-increase.svg";
import IconDecrease from "assets/icons/icon-decrease.svg";
import IconNews from "assets/icons/icon-news.svg";
import IconPromotion from "assets/icons/icon-promotion.svg";
import IconOrder from "assets/icons/icon-order.svg";
import IconChecked from "assets/icons/icon-checked.svg";
import IconMinus from "assets/icons/icon-minus.svg";
import IocnThreeDots from "assets/icons/icon-three-dots.svg";
import IconLink from "assets/icons/icon-link.svg";
import IconEdit from "assets/icons/icon-edit.svg";
import IconEditWhite from "assets/icons/icon-edit-white.svg";
import IconSave from "assets/icons/icon-save.svg";
import IconEyeBlue from "assets/icons/icon-eye-blue.svg";
import IconRefresh from "assets/icons/icon-refresh.svg";
import IconPlus from "assets/icons/icon-plus.svg";
import IconLogo from "assets/icons/icon-logo.svg";
import IconCircleHelp from "assets/icons/icon-circle-help.svg";
import IconCaretUpGreen from "assets/icons/icon-caret-up-green.svg";
import IconCaretDownRed from "assets/icons/icon-caret-down-red.svg";
import IconSortbySmall from "assets/icons/icon-sortby-small.svg";
import IconShort from "assets/icons/icon-short.svg";
import IconMenu from "assets/icons/icon-menu.svg";
import IconNewsTotal from "assets/icons/icon-newstotal.svg";
import IconNewsNegative from "assets/icons/icon-newsNegative.svg";
import IconDelete from "assets/icons/icon-delete.svg";
import IconUserGroup from "assets/icons/icon-user-group.svg";
import IconSource from "assets/icons/icon-source.svg";
import IconAnalyzer from "assets/icons/icon-analyzer.svg";
import IconProxy from "assets/icons/icon-proxy.svg";
import IconBot from "assets/icons/icon-bot.svg";
const iconTypes = {
  UserGroup: IconUserGroup,
  Source: IconSource,
  Analyzer: IconAnalyzer,
  Proxy: IconProxy,
  IconBot: IconBot,
  Delete: IconDelete,
  NewsTotal: IconNewsTotal,
  NewsNegative: IconNewsNegative,
  Short: IconShort,
  Logo: IconLogo,
  Plus: IconPlus,
  Xmark: IconXmark,
  Checked: IconChecked,
  Minus: IconMinus,
  Bell: IconBell,
  Book: IconBook,
  Calendar: IconCalendar,
  CaretDown: IconCaretDown,
  CaretLeft: IconCaretLeft,
  CaretRight: IconCaretRight,
  CaretUpGreen: IconCaretUpGreen,
  CaretDownRed: IconCaretDownRed,
  CaretUp: IconCaretUp,
  Chat: IconChat,
  ChevronDown: IconChevronDown,
  ChevronUp: IconChevronUp,
  ChevronLeft: IconChevronLeft,
  ChevronRight: IconChevronRight,
  ChevronDoubleDown: IconChevronDoubleDown,
  ChevronDoubleUp: IconChevronDoubleUp,
  ChevronDoubleLeft: IconChevronDoubleLeft,
  ChevronDoubleRight: IconChevronDoubleRight,
  Clock: IconClock,
  Edit: IconEdit,
  EditWhite: IconEditWhite,
  EyeBlue: IconEyeBlue,
  Comment: IconComment,
  Share: IconShare,
  Copy: IconCopy,
  CreditCard: IconCreditCard,
  Download: IconDownload,
  FingerTouch: IconFingerTouch,
  Fullscreen: IconFullscreen,
  Home: IconHome,
  Like: IconLike,
  Link: IconLink,
  Lock: IconLock,
  Login: IconLogin,
  Logout: IconLogout,
  Mail: IconMail,
  PaperClipboard: IconPaperClipboard,
  Phone: IconPhone,
  Play: IconPlay,
  PlusCircle: IconPlusCircle,
  PlusCircleFill: IconPlusCircleFill,
  Refresh: IconRefresh,
  Report: IconReport,
  Returns: IconReturns,
  SaleDrug: IconSaleDrug,
  Save: IconSave,
  Search: IconSearch,
  Settings: IconSettings,
  Sortby: IconSortby,
  SortbySmall: IconSortbySmall,
  Times: IconTimes,
  ThreeDots: IocnThreeDots,
  Upload: IconUpload,
  User: IconUser,
  UserAdd: IconUserAdd,
  UserCircle: IconUserCircle,
  Eye: IconEye,
  EyeSlash: IconEyeSlash,
  Loading: IconLoading,
  Increase: IconIncrease,
  Decrease: IconDecrease,
  News: IconNews,
  Promtion: IconPromotion,
  Order: IconOrder,
  CircleHelp: IconCircleHelp,
  Menu: IconMenu,
};

export default function Icon(props) {
  const Icon = iconTypes[props.name];
  if (Icon) {
    return <Icon {...props} />;
  } else {
    return null;
  }
}
