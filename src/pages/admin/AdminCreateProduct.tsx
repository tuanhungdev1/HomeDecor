/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminHeaderLayout from "@/layouts/AdminHeaderLayout";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import {
  ProductForCreate,
  ProductImageForCreate,
  ProductVariantForCreate,
} from "@/types/product.type";
import { RiImageAddLine } from "react-icons/ri";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { RcFile } from "antd/es/upload";
import { ProductStatus } from "@/types/Enums";

const AdminCreateProduct = () => {
  const [createProductForm] = Form.useForm();
  const [variantForms, setVariantForms] = useState<number[]>([0]);

  const handleCreateProductSubmit = async (values: any) => {
    try {
      // Transform the form values to match ProductForCreate interface
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
        productDetails: {
          measurements: values.detailMeasurements,
          roomType: values.roomType,
          weight: values.weight,
          height: values.height,
          material: values.material,
          features: values.features,
          caseInStruction: values.caseInStruction,
          warrantyInfo: values.warrantyInfo,
          maintenanceInstructions: values.maintenanceInstructions,
          recommemdedCleaningProducts: values.recommemdedCleaningProducts,
        },
        productVariants: values.variants?.map(
          (variant: any): ProductVariantForCreate => ({
            color: variant.color,
            sku: variant.sku,
            isMainVariant: variant.isMainVariant,
            originalPrice: variant.originalPrice,
            discountPercentage: variant.discountPercentage,
            discountPrice: variant.discountPrice,
            discountStartDate: variant.discountDates?.[0],
            discountEndDate: variant.discountDates?.[1],
            stockQuantity: variant.stockQuantity,
            isNewStartDate: variant.newDates?.[0],
            isNewEndDate: variant.newDates?.[1],
            isActive: variant.isActive,
            images: variant.images?.fileList.map(
              (file: any): ProductImageForCreate => ({
                fileImage: file.originFileObj,
                isMainImage: file.isMainImage,
                productVariantId: 0, // This will be set after variant creation
              })
            ),
          })
        ),
      };

      console.log("Formatted product data:", productData);
      // Here you would typically make an API call to create the product
      // await createProduct(productData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const addVariant = () => {
    setVariantForms([...variantForms, variantForms.length]);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.error("You can only upload JPG/PNG files!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error("Image must smaller than 2MB!");
      return false;
    }
    return true;
  };

  const productStatusOptions = Object.values(ProductStatus).map((status) => ({
    label: status,
    value: status,
  }));
  return (
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
      >
        {/* Basic Product Information */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Thông tin cơ bản</h2>
          <div className="grid items-start grid-cols-2 gap-x-6">
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: "Please input product name!" },
              ]}
            >
              <Input allowClear placeholder="Tên sản phẩm" size="large" />
            </Form.Item>
            <Form.Item label="Mã định danh" name="baseSku">
              <Input
                allowClear
                placeholder="Mã định danh sản phẩm"
                size="large"
              />
            </Form.Item>
            <Form.Item label="Mô tả ngắn" name="shortDescription">
              <TextArea
                rows={4}
                placeholder="Mô tả ngắn cho sản phẩm"
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

                <Form.Item label="Cân nặng (kg)" name="weight" className="ml-6">
                  <InputNumber min={0} size="large" placeholder="0" />
                </Form.Item>

                <Form.Item label="Chiều Cao (cm)" name="height">
                  <InputNumber min={0} size="large" placeholder="0" />
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

          <Form.Item label="Hướng dẫn sử dụng" name="caseInStruction">
            <TextArea
              rows={4}
              allowClear
              placeholder="Nhập thông tin hướng dẫn sử dụng"
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
                        {...field}
                        label="Loại màu"
                        name={[field.name, "color"]}
                        rules={[
                          { required: true, message: "Color is required" },
                        ]}
                      >
                        <Input
                          allowClear
                          placeholder="Nhập loại màu"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Mã định danh loại màu"
                        name={[field.name, "sku"]}
                        rules={[{ required: true, message: "SKU is required" }]}
                      >
                        <Input
                          allowClear
                          placeholder="Mã loại màu"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Giá chính thức ( $ )"
                        name={[field.name, "originalPrice"]}
                        rules={[
                          { required: true, message: "Price is required" },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          width={200}
                          placeholder="0$"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Số lượng sản phẩm"
                        name={[field.name, "stockQuantity"]}
                        rules={[
                          {
                            required: true,
                            message: "Stock quantity is required",
                          },
                        ]}
                      >
                        <InputNumber min={0} placeholder="0" size="large" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Phần trăm giảm giá"
                        name={[field.name, "discountPercentage"]}
                      >
                        <InputNumber
                          min={0}
                          max={100}
                          placeholder="0%"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Thời gian giảm giá"
                        name={[field.name, "discountDates"]}
                      >
                        <DatePicker.RangePicker
                          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                          size="large"
                        />
                      </Form.Item>
                    </div>
                    <Space>
                      <Form.Item
                        {...field}
                        label="Thể loại chính"
                        name={[field.name, "isMainVariant"]}
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Trạng thái"
                        name={[field.name, "isActive"]}
                        valuePropName="checked"
                      >
                        <Switch defaultChecked />
                      </Form.Item>
                    </Space>

                    <div>
                      <Form.Item
                        {...field}
                        label="Hình ảnh hiển thị"
                        name={[field.name, "images"]}
                      >
                        <Upload
                          beforeUpload={beforeUpload}
                          listType="picture-card"
                        >
                          <RiImageAddLine size={30} />
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Hình ảnh khác"
                        name={[field.name, "images"]}
                      >
                        <Upload
                          beforeUpload={beforeUpload}
                          listType="picture-card"
                          multiple
                        >
                          <RiImageAddLine size={30} />
                        </Upload>
                      </Form.Item>
                    </div>

                    <div className="flex items-center justify-end">
                      {" "}
                      {fields.length > 1 && (
                        <Button
                          type="primary"
                          danger
                          onClick={() => remove(field.name)}
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
          <Button size="large" type="primary" htmlType="submit">
            Create Product
          </Button>
        </div>
      </Form>
    </main>
  );
};

export default AdminCreateProduct;
