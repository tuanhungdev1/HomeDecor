import { Brand } from "@/services/brandService";
import { Button, Flex, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
interface ModalBrandProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (val: Brand) => void;
  brand?: Brand | null;
}

const ModalEditBrand: React.FC<ModalBrandProps> = ({
  onClose,
  onSubmit,
  visible,
  brand,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  const handleCancelEditing = () => {
    setIsEdit(false);
    // Reset form về giá trị ban đầu
    form.setFieldsValue(brand);
  };
  return (
    <Modal
      title="Update Brand"
      open={visible}
      onCancel={() => {
        onClose();
        setIsEdit(false);
      }}
      footer={
        isEdit ? (
          <Flex gap={8} justify="end">
            <Button onClick={handleCancelEditing}>Close</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
          </Flex>
        ) : (
          <Flex gap={8} justify="end">
            <Button onClick={() => setIsEdit(false)}>Close</Button>
            <Button type="primary" onClick={() => setIsEdit(true)}>
              Update Brand
            </Button>
          </Flex>
        )
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={brand || {}}
      >
        <Form.Item
          name="name"
          label="Brand Name"
          rules={[{ required: true, message: "Please input brand name!" }]}
        >
          <Input disabled={!isEdit} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea disabled={!isEdit} />
        </Form.Item>

        <Form.Item name="logoUrl" label="Logo URL">
          <Input disabled={!isEdit} />
        </Form.Item>

        <Form.Item name="isActive" label="Status">
          <Select disabled={!isEdit}>
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="createdAt" label="Created At">
          <Input
            disabled={true}
            value={
              brand?.createdAt
                ? dayjs(brand.createdAt).format("DD-MM-YYYY")
                : "-"
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditBrand;
