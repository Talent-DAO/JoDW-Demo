import { notification } from "antd";

const onError = (error: any) => {
  notification.open({
    message: error?.data?.message ?? error?.message ?? "Something went wrong!",
    description: error?.data?.details ?? error?.message?.details ?? error?.details ?? "An unknown error occurred.",
    icon: "⚠️",
  });
};

export default onError;