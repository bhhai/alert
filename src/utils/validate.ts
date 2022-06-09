import * as Yup from 'yup';

export const departmentSchema = Yup.object().shape({
  code: Yup.string()
    .required("Mã phòng không được để trống")
    .matches(/^[A-Z0-9_.-]*$/, "Mã phòng chỉ được phép nhập sỗ và chữ hoa")
    .max(20, "Mã phòng không được quá 20 ký tự"),
  name: Yup.string().required("Tên phòng không được để trống").max(256, "Tên phòng không được quá 255 ký tự"),
});


/**
 * Kiểm tra text undefined, chuỗi rỗng thì trả về true
 * @param {*} str
 */
const validateIsEmpty = (str: string) => {
  if (str === undefined || str === null) {
    return true;
  }

  str = str.trim();
  return !str;
};

/**
 * Kiểm tra độ dài tối thiểu của text
 * @param {*} str Text cần kiểm tra
 * @param {*} min Độ dài tối thiểu cần vượt qua
 */
const validateMinLength = (str: string, min: number) => {
  if (validateIsEmpty(str)) {
    return min === 0;
  }

  str = str.trim();
  return str.length >= min;
};

const Validate = {
  validateIsEmpty,
  validateMinLength,

  /**
   * Kiểm tra số điện thoại có đúng định dạng mobile phone
   * (+84|84|0)[\d]{9}
   * @param {*} phone
   */
  validatePhoneVN: (phone: string) => {
    if (validateIsEmpty(phone)) {
      return false;
    }

    phone = phone.trim();
    const re = /^(\+84|84|0)\d{9}$/;
    return re.test(phone);
  },

  /**
   * Kiểm tra địa chỉ email có hợp lệ không
   * @param {*} email
   */
  validateEmail: (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  /**
   * Trả về true nếu text có độ dài thỏa mãn (nhỏ hơn max)
   * @param {*} text Text cần vượt qua
   * @param {*} max Độ dài tối đa được phép
   */
  validateMaxLength: (text: string, max: number) => {
    if (validateIsEmpty(text)) {
      return max >= 0;
    }

    text = text.trim();
    return text.length <= max;
  },

  /**
   * Kiểm tra tính hợp lệ của mật khẩu
   * Có chứa ít nhất một kí tự số, ít nhất một kí tự hoa, ít nhất một kí tự thường và một kí tự đặc biệt
   * @param {*} password
   * @param {*} minLength
   * @param {*} maxLength
   */
  validatePassword: (password, minLength = 6, maxLength = 9) => {
    if (!validateMinLength(password, minLength)) {
      return false;
    }
    const length = password.length;
    if (length >= maxLength) {
      return true;
    }

    password = password.trim();
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;
    return re.test(password);
  },

  /**
   * Kiểm tra đầu vào có đúng định dạng link không
   * re lấy từ https://www.regextester.com/96928
   * @param {*} link
   */
  validateURL: (link: string) => {
    if (validateIsEmpty(link)) {
      return false;
    }

    const re =
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
    return re.test(link);
  },

  /**
   * Kiểm tra đầu vào có đúng định dạng ngày của người Việt dd/mm/yyyy hoặc dd-mm-yyyy hoặc dd.mm.yyyy
   * @param {*} date
   */
  validateDateFormatVn: (date: string) => {
    if (validateIsEmpty(date)) {
      return false;
    }

    const re =
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return re.test(date);
  },

  /**
   * Kiểm tra thời gian (giờ:phút)
   * @param {*} time
   */
  validateTime: (time: string) => {
    if (validateIsEmpty(time)) {
      return false;
    }
    const re = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;
    return re.test(time);
  },
};
export default Validate;
