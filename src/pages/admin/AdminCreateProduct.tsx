/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminHeaderLayout from "@/layouts/AdminHeaderLayout";
import {
  Button,
  DatePicker,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Spin,
  Switch,
  Upload,
} from "antd";
import { Link } from "react-router-dom";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import {
  ProductDetailsForCreate,
  ProductForCreate,
  ProductImageForCreate,
  ProductVariantForCreate,
} from "@/types/product.type";
import { RiImageAddLine } from "react-icons/ri";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect, useState } from "react";
import { UploadProps } from "antd/es/upload";
import { ProductStatus } from "@/types/Enums";
import { generateSKU } from "@/utils/utils";
import { UploadFile } from "antd/lib/upload";
import dayjs from "dayjs";
import { productServices } from "@/services/productService";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AdminCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [createProductForm] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [variantImages, setVariantImages] = useState<{
    [key: number]: UploadFile[];
  }>({});

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }

      return false;
    },
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleVariantImagesChange = (variantIndex: number, info: any) => {
    const { fileList } = info;

    setVariantImages((prev) => ({
      ...prev,
      [variantIndex]: fileList,
    }));
  };

  const handleGenerateBaseSKU = useCallback(() => {
    const newSku = generateSKU();
    createProductForm.setFieldsValue({
      baseSku: newSku,
    });
  }, [createProductForm]);

  const handleGenerateVariantSKU = (fieldName: number) => {
    const currentBaseSku = createProductForm.getFieldValue("baseSku");
    const variantSku = generateSKU(`${currentBaseSku}-V`);

    createProductForm.setFields([
      {
        name: ["variants", fieldName, "sku"],
        value: variantSku,
      },
    ]);
  };

  useEffect(() => {
    handleGenerateBaseSKU();
  }, [handleGenerateBaseSKU]);

  const handleCreateProductSubmit = async (values: any) => {
    try {
      const productVariants = values.variants?.map(
        (variant: any, index: number) => {
          const variantFileList = variantImages[index] || [];

          return {
            color: variant.color,
            sku: variant.sku,
            isMainVariant: variant.isMainVariant ?? true,
            originalPrice: variant.originalPrice,
            discountPercentage: variant.discountPercentage,
            discountStartDate: variant.discountDates?.[0]
              ? dayjs(variant.discountDates?.[0]).format("YYYY-MM-DDTHH:mm:ss")
              : undefined,
            discountEndDate: variant.discountDates?.[1]
              ? dayjs(variant.discountDates?.[1]).format("YYYY-MM-DDTHH:mm:ss")
              : undefined,

            stockQuantity: variant.stockQuantity,
            isActive: variant.isActive ?? true,
            images: variantFileList.map(
              (file: UploadFile, fileIndex: number) => ({
                fileImage: file.originFileObj,
                isMainImage: fileIndex === 0,
              })
            ),
          };
        }
      );

      const productDetails: ProductDetailsForCreate = {
        measurements: values.detailMeasurements,
        roomType: values.roomType,
        weight: values.weight,
        height: values.height,
        material: values.material,
        features: values.features,
        careInStructions: values.careInStructions,
        warrantyInfo: values.warrantyInfo,
        maintenanceInstructions: values.maintenanceInstructions,
        recommemdedCleaningProducts: values.recommemdedCleaningProducts,
      };

      const productData: ProductForCreate = {
        name: values.name,
        shortDescription: values.shortDescription,
        baseSku: values.baseSku,
        measurements: values.measurements,
        status: values.status,
        isPublished: values.isPublished,
        categoryId: values.categoryId,
        brandId: values.brandId,
        supplierId: values.supplierId,
        productDetails: productDetails,
        productVariants: productVariants,
      };
      console.log("Formatted product data:", productData);
      // Tạo FormData
      const formData = new FormData();

      // Thêm thông tin cơ bản của sản phẩm
      formData.append("name", productData.name);
      formData.append("shortDescription", productData.shortDescription ?? "");
      formData.append("baseSku", productData.baseSku ?? "");
      formData.append("measurements", productData.measurements ?? "");
      formData.append("status", productData.status ?? "");
      formData.append("isPublished", String(productData.isPublished ?? ""));
      formData.append("categoryId", String(productData.categoryId ?? ""));
      formData.append("brandId", String(productData.brandId ?? ""));
      formData.append("supplierId", String(productData.supplierId ?? ""));

      // Thêm thông tin chi tiết sản phẩm
      Object.entries(productDetails).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(`details.${key}`, value.toString());
        }
      });

      // Thêm thông tin variants và hình ảnh
      productVariants?.forEach(
        (variant: ProductVariantForCreate, index: number) => {
          formData.append(`variants[${index}].color`, variant.color);
          formData.append(`variants[${index}].sku`, variant.sku);
          formData.append(
            `variants[${index}].isMainVariant`,
            variant.isMainVariant.toString()
          );
          formData.append(
            `variants[${index}].originalPrice`,
            variant.originalPrice.toString()
          );

          if (variant.discountPercentage) {
            formData.append(
              `variants[${index}].discountPercentage`,
              variant.discountPercentage.toString()
            );
          }

          if (variant.discountStartDate) {
            formData.append(
              `variants[${index}].discountStartDate`,
              String(variant.discountStartDate ?? "")
            );
          }

          if (variant.discountEndDate) {
            formData.append(
              `variants[${index}].discountEndDate`,
              String(variant.discountEndDate ?? "")
            );
          }

          formData.append(
            `variants[${index}].stockQuantity`,
            variant.stockQuantity.toString()
          );
          formData.append(
            `variants[${index}].isActive`,
            variant.isActive.toString()
          );

          // Thêm hình ảnh cho variant
          variant.images?.forEach(
            (image: ProductImageForCreate, imageIndex: number) => {
              formData.append(
                `variants[${index}].images[${imageIndex}].fileImage`,
                image.fileImage
              );
              formData.append(
                `variants[${index}].images[${imageIndex}].isMainImage`,
                image.isMainImage.toString()
              );
            }
          );
        }
      );
      setLoading(true);
      const response = await productServices.createProduct(formData);
      console.log(response);
      if (response && response.data.statusCode === 201) {
        message.success("Chúc mừng bạn đã tạo một sản phẩm mới thành công!");
        setLoading(false);
      } else {
        throw new Error("Tạo sản phẩm không thành công.");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      message.error(`Có lỗi sảy ra khi tạo sản phẩm Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const productStatusOptions = Object.values(ProductStatus).map((status) => ({
    label: status,
    value: status,
  }));
  return (
    <Spin spinning={loading} delay={500}>
      <main className="w-full px-10 pb-10 bg-white">
        <div className="w-full">
          <AdminHeaderLayout
            title="Create Product"
            rightSide={
              <Button
                variant="solid"
                color="primary"
                size="large"
                className="h-12 w-[200px] text-lg flex items-center"
              >
                <FiPlus size={24} />
                Add Product
              </Button>
            }
            items={[
              {
                title: <Link to={"/admin/dashboard"}>Dashboard</Link>,
              },
              {
                title: <Link to={"/admin/manage-product"}>Products</Link>,
              },
              {
                title: <Link to={"/admin/create-product"}>Create</Link>,
              },
            ]}
          />
        </div>
        <Form
          form={createProductForm}
          layout="vertical"
          onFinish={handleCreateProductSubmit}
          className="w-full p-6 mx-auto mt-6 bg-white rounded-lg shadow"
          initialValues={{
            ["baseSku"]: handleGenerateBaseSKU(),
          }}
        >
          {/* Basic Product Information */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Thông tin cơ bản</h2>
            <div className="grid items-start grid-cols-2 gap-x-6">
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                  { min: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự" },
                  {
                    max: 200,
                    message: "Tên sản phẩm không được vượt quá 200 ký tự",
                  },
                ]}
              >
                <Input allowClear placeholder="Tên sản phẩm" size="large" />
              </Form.Item>
              <div className="flex items-center gap-2">
                <Form.Item
                  label="Mã định danh"
                  name="baseSku"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã định danh" },
                    {
                      pattern: /^[A-Za-z0-9-_]+$/,
                      message:
                        "Mã định danh chỉ được chứa chữ, số, gạch ngang và gạch dưới",
                    },
                    { min: 3, message: "Mã định danh phải có ít nhất 3 ký tự" },
                    {
                      max: 50,
                      message: "Mã định danh không được vượt quá 50 ký tự",
                    },
                  ]}
                >
                  <Input
                    allowClear
                    placeholder="Mã định danh sản phẩm"
                    size="large"
                    style={{ width: "300px" }}
                    disabled
                    readOnly
                  />
                </Form.Item>
                <Button
                  icon={<FiRefreshCw />}
                  onClick={handleGenerateBaseSKU}
                  size="large"
                  type="default"
                  title="Tạo mã định danh ngẫu nhiên"
                ></Button>
              </div>
              <Form.Item
                label="Mô tả ngắn"
                name="shortDescription"
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả ngắn" },
                  { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
                  { max: 300, message: "Mô tả không được vượt quá 300 ký tự" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Mô tả ngắn cho sản phẩm"
                  allowClear
                  size="large"
                />
              </Form.Item>

              <Space>
                <Form.Item label="Danh Mục" name="categoryId">
                  <Select
                    style={{ width: 250 }}
                    size="large"
                    placeholder="Chọn danh mục"
                    allowClear
                  >
                    {/* Add your categories here */}
                  </Select>
                </Form.Item>

                <Form.Item label="Thương Hiệu" name="brandId">
                  <Select
                    style={{ width: 250 }}
                    size="large"
                    placeholder="Chọn thương hiệu"
                    allowClear
                  >
                    {/* Add your brands here */}
                  </Select>
                </Form.Item>

                <Form.Item label="Nhà Cung Cấp" name="supplierId">
                  <Select
                    style={{ width: 250 }}
                    size="large"
                    placeholder="Chọn nhà cung cấp"
                    allowClear
                  >
                    {/* Add your suppliers here */}
                  </Select>
                </Form.Item>
              </Space>
              <Form.Item label="Thông số" name="measurements">
                <Input
                  allowClear
                  placeholder="Thông số của sản phẩm"
                  size="large"
                />
              </Form.Item>
              <Space>
                <Form.Item label="Chế độ hiển thị" name="isPublished">
                  <Select
                    style={{ width: 250 }}
                    placeholder="Chế độ hiển thị"
                    size="large"
                    allowClear
                  >
                    <Select.Option value={true}>Công khai</Select.Option>
                    <Select.Option value={false}>Không công khai</Select.Option>

                    {/* Add more room types */}
                  </Select>
                </Form.Item>
                <Form.Item label="Trạng thái sản phẩm" name="status">
                  <Select
                    size="large"
                    allowClear
                    style={{ width: 250 }}
                    placeholder="Trạng thái"
                    options={productStatusOptions}
                  ></Select>
                </Form.Item>
              </Space>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Thông tin chi tiết</h2>
            <div className="grid grid-cols-2 gap-x-6">
              <Form.Item label="Thông số chi tiết" name="detailMeasurements">
                <Input.TextArea
                  rows={5}
                  className="Thông số chi tiết của sản phẩm"
                  size="large"
                />
              </Form.Item>

              <div className="">
                <Space>
                  <Form.Item label="Loại phòng" name="roomType">
                    <Select
                      style={{ width: 200 }}
                      placeholder="Chọn loại phòng"
                      size="large"
                    >
                      <Select.Option value="living">Living Room</Select.Option>
                      <Select.Option value="bedroom">Bedroom</Select.Option>
                      <Select.Option value="dining">Dining Room</Select.Option>
                      {/* Add more room types */}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Cân nặng (kg)"
                    name="weight"
                    rules={[
                      {
                        type: "number",
                        transform: (value) => Number(value),
                        message: "Vui lòng nhập số",
                      },
                      {
                        type: "number",
                        min: 0,
                        message: "Cân nặng không được âm",
                      },
                      {
                        type: "number",
                        max: 1000,
                        message: "Cân nặng không được vượt quá 1000kg",
                      },
                    ]}
                  >
                    <InputNumber size="large" placeholder="0" />
                  </Form.Item>

                  <Form.Item
                    label="Chiều Cao (cm)"
                    name="height"
                    rules={[
                      {
                        type: "number",
                        transform: (value) => Number(value),
                        message: "Vui lòng nhập số",
                      },
                      {
                        type: "number",
                        min: 0,
                        message: "Chiều cao không được âm",
                      },
                      {
                        type: "number",
                        max: 1000,
                        message: "Chiều cao không được vượt quá 1000kg",
                      },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      placeholder="0"
                      min={0}
                      max={1000}
                    />
                  </Form.Item>
                </Space>
                <Form.Item label="Vật liệu" name="material">
                  <Input allowClear placeholder="Nhập vật liệu" size="large" />
                </Form.Item>
              </div>
            </div>

            <Form.Item label="Tính năng" name="features">
              <TextArea
                rows={4}
                allowClear
                placeholder="Nhập thông tin về tính năng của sản phẩm"
                size="large"
              />
            </Form.Item>

            <Form.Item label="Hướng dẫn sử dụng" name="careInStructions">
              <TextArea
                rows={4}
                allowClear
                placeholder="Nhập thông tin hướng dẫn sử dụng"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Hướng dẫn vệ sinh"
              name="recommemdedCleaningProducts"
            >
              <TextArea
                rows={4}
                allowClear
                placeholder="Nhập cách vệ sinh sản phẩm đúng cách"
                size="large"
              />
            </Form.Item>

            <Form.Item label="Hướng dẫn bảo trì" name="maintenanceInstructions">
              <TextArea
                rows={4}
                allowClear
                placeholder="Nhập thông tin hướng dẫn cách bảo trì đúng cách"
                size="large"
              />
            </Form.Item>
            <Form.Item label="Thông tin bảo hành" name="warrantyInfo">
              <TextArea
                rows={4}
                allowClear
                placeholder="Nhập thông tin bảo hành"
                size="large"
              />
            </Form.Item>
          </div>

          {/* Product Variants */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Loại sản phẩm</h2>

            <Form.List name="variants">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} className="p-4 mb-4 border rounded">
                      <h3 className="mb-4 text-xl font-medium">
                        Loại {index + 1}
                      </h3>

                      <div className="flex items-center justify-between">
                        <Form.Item
                          label="Loại màu"
                          name={[field.name, "color"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập loại màu",
                            },
                            {
                              min: 2,
                              message: "Tên màu phải có ít nhất 2 ký tự",
                            },
                            {
                              max: 50,
                              message: "Tên màu không được vượt quá 50 ký tự",
                            },
                          ]}
                        >
                          <Input
                            allowClear
                            placeholder="Nhập loại màu"
                            size="large"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Giá chính thức ($)"
                          name={[field.name, "originalPrice"]}
                          rules={[
                            {
                              type: "number",
                              transform: (value) => Number(value),
                              message: "Vui lòng nhập số",
                            },
                            {
                              required: true,
                              message: "Vui lòng nhập giá sản phẩm",
                            },
                            { type: "number", message: "Vui lòng nhập số" },
                            {
                              type: "number",
                              min: 0,
                              message: "Giá không được âm",
                            },
                            {
                              type: "number",
                              max: 1000000,
                              message: "Giá không được vượt quá 1,000,000$",
                            },
                          ]}
                        >
                          <InputNumber
                            min={0}
                            width={200}
                            placeholder="0$"
                            size="large"
                            style={{ width: 200 }}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Số lượng sản phẩm"
                          name={[field.name, "stockQuantity"]}
                          rules={[
                            {
                              type: "number",
                              transform: (value) => Number(value),
                              message: "Vui lòng nhập số",
                            },
                            {
                              required: true,
                              message: "Vui lòng nhập số lượng sản phẩm",
                            },
                            { type: "number", message: "Vui lòng nhập số" },
                            {
                              type: "number",
                              min: 0,
                              message: "Số lượng không được âm",
                            },
                            {
                              type: "number",
                              max: 10000,
                              message: "Số lượng không được vượt quá 10,000",
                            },
                          ]}
                        >
                          <InputNumber
                            min={0}
                            placeholder="0"
                            size="large"
                            style={{ width: 200 }}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Phần trăm giảm giá"
                          name={[field.name, "discountPercentage"]}
                          rules={[
                            {
                              type: "number",
                              transform: (value) => Number(value),
                              message: "Vui lòng nhập số",
                            },

                            { type: "number", message: "Vui lòng nhập số" },
                            {
                              type: "number",
                              min: 0,
                              message: "Phần trăm không được âm",
                            },
                            {
                              type: "number",
                              max: 10000,
                              message: "Phần trăm không được vượt quá 100",
                            },
                          ]}
                        >
                          <InputNumber
                            min={0}
                            max={100}
                            placeholder="0%"
                            size="large"
                            style={{ width: 200 }}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Thời gian giảm giá"
                          name={[field.name, "discountDates"]}
                        >
                          <DatePicker.RangePicker
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            size="large"
                          />
                        </Form.Item>
                      </div>
                      <div className="flex gap-6">
                        <Form.Item
                          label="Thể loại chính"
                          name={[field.name, "isMainVariant"]}
                          valuePropName="checked"
                          initialValue={true}
                        >
                          <Switch defaultChecked />
                        </Form.Item>

                        <Form.Item
                          label="Trạng thái"
                          name={[field.name, "isActive"]}
                          valuePropName="checked"
                          initialValue={true}
                        >
                          <Switch defaultChecked />
                        </Form.Item>
                        <div className="flex items-center gap-2">
                          <Form.Item
                            label="Mã định danh loại màu"
                            name={[field.name, "sku"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập mã định danh loại màu",
                              },
                              {
                                pattern: /^[A-Za-z0-9-_]+$/,
                                message:
                                  "Mã định danh chỉ được chứa chữ, số, gạch ngang và gạch dưới",
                              },
                              {
                                min: 3,
                                message: "Mã định danh phải có ít nhất 3 ký tự",
                              },
                              {
                                max: 50,
                                message:
                                  "Mã định danh không được vượt quá 50 ký tự",
                              },
                            ]}
                          >
                            <Input
                              allowClear
                              placeholder="Mã loại màu"
                              size="large"
                              style={{ width: "300px" }}
                              readOnly // Thêm readonly
                              disabled
                            />
                          </Form.Item>
                          <Button
                            icon={<FiRefreshCw />}
                            onClick={() => handleGenerateVariantSKU(field.name)}
                            size="large"
                            type="default"
                            title="Tạo mã định danh ngẫu nhiên cho biến thể"
                          ></Button>
                        </div>
                      </div>

                      <div>
                        <Form.Item
                          label="Hình ảnh sản phẩm"
                          name={[field.name, "images"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng tải lên ít nhất một hình ảnh",
                              validator: async () => {
                                if (
                                  !variantImages[index] ||
                                  variantImages[index].length === 0
                                ) {
                                  throw new Error(
                                    "Vui lòng tải lên ít nhất một hình ảnh"
                                  );
                                }
                              },
                            },
                          ]}
                        >
                          {previewImage && (
                            <Image
                              wrapperStyle={{ display: "none" }}
                              preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) =>
                                  setPreviewOpen(visible),
                                afterOpenChange: (visible) =>
                                  !visible && setPreviewImage(""),
                              }}
                              src={previewImage}
                            />
                          )}
                          <Upload
                            listType="picture-card"
                            multiple
                            {...uploadProps}
                            fileList={variantImages[index] || []}
                            onPreview={handlePreview}
                            onChange={(info) =>
                              handleVariantImagesChange(index, info)
                            }
                          >
                            {(variantImages[index]?.length || 0) >= 8 ? null : (
                              <div className="flex flex-col items-center justify-center">
                                <RiImageAddLine size={30} />

                                <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                            )}
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="flex items-center justify-end">
                        {" "}
                        {fields.length > 1 && (
                          <Button
                            type="primary"
                            danger
                            onClick={() => {
                              const handleRemoveVariant = (index: number) => {
                                setVariantImages((prev) => {
                                  const newImages = { ...prev };
                                  delete newImages[index];
                                  return newImages;
                                });
                                remove(index);
                              };

                              handleRemoveVariant(index);
                            }}
                            size="large"
                          >
                            Delete Variant
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button
                    type="default"
                    onClick={() => add()}
                    icon={<FiPlus />}
                    className="w-full"
                    size="large"
                  >
                    Add Variant
                  </Button>
                </>
              )}
            </Form.List>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button type="default" htmlType="button" size="large">
              Cancel
            </Button>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Create Product
            </Button>
          </div>
        </Form>
      </main>
    </Spin>
  );
};

export default AdminCreateProduct;
