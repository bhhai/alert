import { toast } from "react-toastify";

/**
 * Loại bỏ html
 * @param {*} str
 */
const stripHtml = (str: string) => {
  return str.replace(/(<([^>]+)>)/gi, "");
};

const Common = {
  stripHtml,
  /**
   * Trim text theo só ký tự thêm dấu 3 chám
   * @param {*} str
   * @param {*} maxLength
   */
  trimContent: (str, maxLength = 20, isHtml = false, ellipsis = false) => {
    if (isHtml) {
      str = stripHtml(str);
    }
    let ellipsisText = "";
    if (ellipsis) {
      ellipsisText = str.length > maxLength ? "..." : "";
    }
    return str.slice(0, maxLength) + ellipsisText;
  },

  /**
   * Trim text theo số từ thêm dấu 3 chám
   * @param {*} str
   * @param {*} maxLength
   */
  trimContentByWord: (str, maxLength = 20, isHtml = false, ellipsis = false) => {
    if (isHtml) {
      str = str.replace(/(<([^>]+)>)/gi, "");
    }
    const array = str.trim().split(" ");
    let ellipsisText = "";
    if (ellipsis) {
      ellipsisText = array.length > maxLength ? "..." : "";
    }
    return array.slice(0, maxLength).join(" ") + ellipsisText;
  },

  /**
   * Xóa dấu
   * @param {*} str
   */
  removeAccents: (str: string) => {
    const AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
      const re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      const char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  },

  /**
   * Xóa các dấu space thừa
   * @param {*} str
   */
  ignoreSpaces(str: string) {
    return str.trim().replace(/\s+/g, " ");
  },

  /**
   * Format tiền tệ
   * @param {*} num
   * @param {*} suffixes
   * @param {*} positionSuffixes
   * @param {*} separate
   */
  formatCurrency: (num, suffixes = "", positionSuffixes = "right", separate = ",") => {
    if (num) {
      const s = num.toString();
      const regex = /\B(?=(\d{3})+(?!\d))/g;
      return positionSuffixes === "right" ? s.replace(regex, separate) + suffixes : suffixes + s.replace(regex, separate);
    } else {
      return 0;
    }
  },

  /**
   * Lấy về offsetHeight
   * @param {*} item
   */
   getOffsetHeight: (item: HTMLElement) => {
    if (!item) {
      return 0;
    }

    return item.offsetHeight ? item.offsetHeight : 0;
  },

  /**
   * Lấy về offsetTop của một item
   * @param {*} item
   */
  getOffsetTop: (item: HTMLElement) => {
    let offsetTop = 0;
    do {
      if (!isNaN(item.offsetTop)) {
        offsetTop += item.offsetTop;
      }
    } while ((item = item.offsetParent as HTMLElement));
    return offsetTop;
  },

  /**
   * Scroll to vị trí
   * @param to, duration
   */
  scrollTo: (to = 0, duration = 200) => {
    const element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          element.scrollTop = to;
        }
      };
    animateScroll();
  },
  getCookie: (name: string | number) => {
    for (let t, r = name + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
      for (t = u[i]; t.charAt(0) == " "; ) t = t.substring(1);
      if (t.indexOf(r) == 0) return t.substring(r.length, t.length);
    }
    return null;
  },
  params: (params) => {
    if (params) {
      const query = Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
      return `?${query}`;
    }
    return "";
  },
  showToast: (mgs: string, type: "error" | "success" | "warning") => {
    toast[type](mgs, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
  fadeIn: (element) => {
    element.style.display = "block";
    // element.style.opacity = 0;
    (function fade() {
      let val = parseFloat(element.style.opacity);
      const proceed = (val += 0.1) > 1 ? false : true;

      if (proceed) {
        element.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  },
  fadeOut: (element) => {
    // element.style.opacity = 1;
    (function fade() {
      let val = parseFloat(element.style.opacity);
      const proceed = (val -= 0.1) < 0 ? false : true;
      if (val - 0.1 <= 0) {
        element.style.display = "none";
      }
      if (proceed) {
        element.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  },
  handleize: (str: string) => {
    str = str.toLowerCase();
    const toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
    for (let i = 0; i < toReplace.length; ++i) {
      str = str.replace(toReplace[i], "");
    }
    str = str.replace(/\W+/g, "-");
    if (str.charAt(str.length - 1) === "-") {
      str = str.replace(/-+\z/, "");
    }
    if (str.charAt(0) === "-") {
      str = str.replace(/\A-+/, "");
    }
    return str;
  },
  getParentByClassName: (elem: any, cls: string) => {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.classList.contains(cls)) {
        return elem;
      }
    }
  },
 
};

export default Common;
