import { Button, Flex, Form, Input, message, Modal, Select, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Upload, { RcFile } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { IoClose } from "react-icons/io5";
import { Supplier, SupplierForUpdate } from "@/services/supplierServices";
interface ModalSupplierProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (val: FormData) => void;
  supplier?: Supplier | null;
  isLoading: boolean;
}

const ModalEditSupplier: React.FC<ModalSupplierProps> = ({
  onClose,
  onSubmit,
  visible,
  supplier,
  isLoading,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteImage, setIsDeleteImage] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(
    supplier?.logoUrl ?? null
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

  const handleSubmit = (values: SupplierForUpdate) => {
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
    formData.append("contactPerson", values.contactPerson);
    formData.append("phone", values.phone);
    formData.append("address", values.address ?? "");
    formData.append("city", values.city ?? "");
    formData.append("email", values.email);
    formData.append("country", values.country ?? "");
    formData.append("description", values.description ?? "");
    formData.append("isActive", values.isActive?.toString() ?? "");

    onSubmit(formData);
  };

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue({
        ...supplier,
        createdAt: supplier.createdAt
          ? dayjs(supplier.createdAt).format("DD-MM-YYYY")
          : "-",
      });

      setImageUrl(supplier.logoUrl ?? null);
      setSelectedFile(null);
      setIsDeleteImage(false);
      setIsEdit(false);
    }
  }, [supplier, form]);

  const handleCancelEditing = () => {
    setIsEdit(false);
    // Reset form về giá trị của supplier hiện tại
    if (supplier) {
      form.setFieldsValue({
        Name: supplier.name,
        Description: supplier.description,
        IsActive: supplier.isActive,
      });
      setImageUrl(supplier.logoUrl ?? null);
      setIsDeleteImage(false);
      setSelectedFile(null);
    }
  };

  const handleClose = () => {
    setIsEdit(false);
    setImageUrl(supplier?.logoUrl ?? null);
    setSelectedFile(null);
    setIsDeleteImage(false);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Update Supplier"
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
              Update Supplier
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
            ...supplier,
            isDeleteImage,
            createdAt: supplier?.createdAt
              ? dayjs(supplier.createdAt).format("DD-MM-YYYY")
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
            hasFeedback
            name="name"
            label="Supplier Name"
            rules={[
              { required: true, message: "Please input supplier name!" },
              {
                min: 3,
                message: "Tên nhà cung cấp phải lớn hơn 3 kí tự!",
              },
              { max: 100, message: "Tên nhà cung cấp phải nhỏ hơn 100 kí tự" },
            ]}
          >
            <Input disabled={!isEdit} />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="contactPerson"
            label="Contact Person"
            rules={[
              { required: true, message: "Please input Contact Person!" },
              {
                min: 3,
                message: "Contact person phải lớn hơn 3 kí tự!",
              },
              { max: 100, message: "Contact person phải nhỏ hơn 100 kí tự!" },
            ]}
          >
            <Input disabled={!isEdit} allowClear />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input Email!" },
              {
                min: 3,
                message: "Emai phải lớn hơn 3 kí tự!",
              },
              { max: 300, message: "Email phải nhỏ hơn 100 kí tự!" },
              {
                type: "email",
                message: "Email bạn nhận không đúng định dạng!",
              },
            ]}
          >
            <Input.TextArea disabled={!isEdit} allowClear />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input Phone!" },
              {
                min: 8,
                message: "Phone phải lớn hơn 8 số!",
              },
              { max: 15, message: "Phone phải nhỏ hơn 15 số!" },
              {
                pattern: /^[0-9]+$/,
                message: "Phone chỉ được chứa các chữ số!",
              },
            ]}
          >
            <Input.TextArea disabled={!isEdit} allowClear />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="address"
            label="Address"
            rules={[
              {
                min: 3,
                message: "Address phải lớn hơn 3 kí tự!",
              },
              { max: 100, message: "Address phải nhỏ hơn 100 kí tự!" },
            ]}
          >
            <Input.TextArea disabled={!isEdit} allowClear />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="city"
            label="City"
            rules={[
              {
                min: 3,
                message: "City phải lớn hơn 3 kí tự!",
              },
              { max: 100, message: "City phải nhỏ hơn 100 kí tự!" },
            ]}
          >
            <Input.TextArea disabled={!isEdit} allowClear />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="country"
            label="Country"
            rules={[
              {
                min: 3,
                message: "Country phải lớn hơn 3 kí tự!",
              },
              { max: 100, message: "Country phải nhỏ hơn 100 kí tự!" },
            ]}
          >
            <Input.TextArea disabled={!isEdit} allowClear />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input Description!" },
              {
                min: 3,
                message: "Description phải lớn hơn 3 kí tự!",
              },
              { max: 300, message: "Description phải nhỏ hơn 100 kí tự!" },
            ]}
          >
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
                supplier?.createdAt
                  ? dayjs(supplier.createdAt).format("DD-MM-YYYY")
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

export default ModalEditSupplier;
