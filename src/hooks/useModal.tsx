import { useState } from "react";

export const useModal = (initialState = false) => {
  const [isModalVisble, setIsModalVisible] = useState(initialState);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return { isModalVisble, showModal, handleCancel };
};
