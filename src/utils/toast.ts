import toast, { ToastOptions } from "react-hot-toast";

type ToaseType = "success" | "error" | "info" | "warning";

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: "top-center",
};

export const showToast = (
  message: string,
  type: ToaseType = "info",
  options: ToastOptions = defaultOptions
) => {
  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      return toast.success(message, mergedOptions);
    case "error":
      return toast.error(message, mergedOptions);
    case "warning":
      return toast(message, { ...mergedOptions, icon: "⚠️" });
    case "info":
    default:
      return toast(message, mergedOptions);
  }
};

// Hàm tiện ích để xử lý toast cho promises
export const toastPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  },
  options: ToastOptions = {}
) => {
  return toast.promise(promise, messages, { ...defaultOptions, ...options });
};

// VD
// import { showToast, toastPromise } from "./toastUtils";

// Sử dụng showToast
// showToast("Thao tác thành công!", "success");
// showToast("Có lỗi xảy ra", "error", { duration: 5000 });

// Sử dụng toastPromise
// const fetchData = async () => {
//   // ... logic fetching data
// };

// toastPromise(fetchData(), {
//   loading: 'Đang tải dữ liệu...',
//   success: 'Tải dữ liệu thành công!',
//   error: 'Không thể tải dữ liệu'
// });
