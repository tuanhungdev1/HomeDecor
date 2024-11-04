import { BrandForCreate } from "@/services/brandService";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { RcFile } from "antd/lib/upload";
import { PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

interface ModalCreateProps {
  visible: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const ModalCreateSupplier: React.FC<ModalCreateProps> = ({
  onClose,
  onSubmit,
  visible,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  // Handle image preview
  const handlePreview = (file: RcFile) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageUrl(reader.result as string);
  };

  // Handle image removal
  const handleRemoveImage = () => setImageUrl(null);

  const handleSubmit = (values: BrandForCreate) => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("logoFile", selectedFile);
    }
    formData.append("name", values.name);
    formData.append("description", values.description ?? "");
    formData.append("isActive", values.isActive?.toString() ?? "");

    onSubmit(formData);
  };

  return (
    <>
      <Modal
        title="Create Brand"
        open={visible}
        className="select-none"
        onCancel={() => {
          onClose();
          form.resetFields();
          handleRemoveImage();
          setImageUrl(null);
        }}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button
              onClick={() => {
                onClose();
                setImageUrl(null);
              }}
            >
              Close
            </Button>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
              loading={isLoading}
            >
              Create Brand
            </Button>
          </div>
        }
      >
        <Spin spinning={isLoading} delay={500}>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              handleSubmit(values);
            }}
          >
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

            <Form.Item
              name="name"
              label="Brand Name"
              hasFeedback
              rules={[
                { required: true, message: "Please input brand name!" },
                {
                  min: 3,
                  message: "Tên Brand phải hơn hơn 3 kí tự!",
                },
                {
                  max: 100,
                  message: "Tên Brand phải trong khoảng 3 đến 100 kí tự!",
                },
              ]}
            >
              <Input placeholder="Brand Name" maxLength={100} minLength={5} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              hasFeedback
              rules={[
                { required: true, message: "Please input description!" },
                {
                  min: 3,
                  message: "Mô tả phải hơn hơn 5 kí tự!",
                },
                {
                  max: 300,
                  message: "Mô tả phải trong khoảng 3 đến 300 kí tự!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Brand Description"
                maxLength={300}
                minLength={5}
              />
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Status"
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Select allowClear placeholder="Selected Status">
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default ModalCreateSupplier;
