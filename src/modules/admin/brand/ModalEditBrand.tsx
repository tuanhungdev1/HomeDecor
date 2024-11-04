import { Brand, BrandForUpdate } from "@/services/brandService";
import { Button, Flex, Form, Input, message, Modal, Select, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Upload, { RcFile } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { IoClose } from "react-icons/io5";
interface ModalBrandProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (val: FormData) => void;
  brand?: Brand | null;
  isLoading: boolean;
}

const ModalEditBrand: React.FC<ModalBrandProps> = ({
  onClose,
  onSubmit,
  visible,
  brand,
  isLoading,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteImage, setIsDeleteImage] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(
    brand?.logoUrl ?? null
  );
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  // Handle image preview
  const handlePreview = (file: RcFile) => {
    setSelectedFile(file);
    setIsDeleteImage(false);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageUrl(reader.result as string);
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImageUrl(null);
    setIsDeleteImage(true);
    setSelectedFile(null);
  };

  const handleSubmit = (values: BrandForUpdate) => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("logoFile", selectedFile);
      formData.append("isDeleteImage", "false");
    } else if (isDeleteImage) {
      formData.append("isDeleteImage", "true");
    } else {
      formData.append("isDeleteImage", "false");
    }

    formData.append("name", values.name);
    formData.append("description", values.description ?? "");
    formData.append("isActive", values.isActive?.toString() ?? "");

    onSubmit(formData);
  };

  useEffect(() => {
    if (brand) {
      form.setFieldsValue({
        ...brand,
        createdAt: brand.createdAt
          ? dayjs(brand.createdAt).format("DD-MM-YYYY")
          : "-",
      });

      setImageUrl(brand.logoUrl ?? null);
      setSelectedFile(null);
      setIsDeleteImage(false);
      setIsEdit(false);
    }
  }, [brand, form]);

  const handleCancelEditing = () => {
    setIsEdit(false);
    // Reset form về giá trị của brand hiện tại
    if (brand) {
      form.setFieldsValue({
        Name: brand.name,
        Description: brand.description,
        IsActive: brand.isActive,
      });
      setImageUrl(brand.logoUrl ?? null);
      setIsDeleteImage(false);
      setSelectedFile(null);
    }
  };

  const handleClose = () => {
    setIsEdit(false);
    setImageUrl(brand?.logoUrl ?? null);
    setSelectedFile(null);
    setIsDeleteImage(false);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Update Brand"
      open={visible}
      onCancel={handleClose}
      confirmLoading={isLoading}
      footer={
        isEdit ? (
          <Flex gap={8} justify="end">
            <Button onClick={handleCancelEditing}>Close</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={isLoading}
            >
              Submit
            </Button>
          </Flex>
        ) : (
          <Flex gap={8} justify="end">
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
            <Button type="primary" onClick={() => setIsEdit(true)}>
              Update Brand
            </Button>
          </Flex>
        )
      }
    >
      <Spin spinning={isLoading} delay={500}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            ...brand,
            isDeleteImage,
            createdAt: brand?.createdAt
              ? dayjs(brand.createdAt).format("DD-MM-YYYY")
              : "-",
          }}
        >
          <Form.Item name="logoUrl">
            <div className="flex items-center justify-center gap-5 pt-4">
              <Form.Item
                name="logoFile"
                valuePropName="file"
                style={{ display: "flex" }}
              >
                {imageUrl ? (
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: `url(${imageUrl}) center center / cover no-repeat`,
                      position: "relative",
                    }}
                  >
                    <div className="absolute z-50 flex items-center justify-center w-full h-full group hover:bg-opacity-50 hover:bg-black">
                      <IoClose
                        size={30}
                        className="hidden text-base text-white transition-all duration-200 cursor-pointer group-hover:block group-hover:text-white"
                        onClick={handleRemoveImage}
                      />
                    </div>
                  </div>
                ) : (
                  <Upload
                    listType="picture-circle"
                    showUploadList={false}
                    style={{ borderRadius: "50%" }}
                    beforeUpload={(file) => {
                      const isJpgOrPng =
                        file.type === "image/jpeg" || file.type === "image/png";
                      if (!isJpgOrPng) {
                        message.error("You can only upload JPG/PNG file!");
                      }
                      const isLt2M = file.size / 1024 / 1024 < 2;
                      if (!isLt2M) {
                        message.error("Image must be smaller than 2MB!");
                      }
                      if (isJpgOrPng && isLt2M) {
                        handlePreview(file);
                      }
                      return false;
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                )}
              </Form.Item>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                Drag and drop{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => uploadInputRef.current?.click()}
                >
                  or browse
                </span>{" "}
                to upload
                <br />
                <span style={{ opacity: 0.55 }}>PNG, JPG, JPEG up to 2MB</span>
              </div>
              <input
                ref={uploadInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePreview(file as RcFile);
                }}
              />
            </div>
          </Form.Item>

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

          <Form.Item name="isActive" label="Status">
            <Select disabled={!isEdit}>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Created At">
            <Input
              value={
                brand?.createdAt
                  ? dayjs(brand.createdAt).format("DD-MM-YYYY")
                  : "-"
              }
              disabled={true}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalEditBrand;
