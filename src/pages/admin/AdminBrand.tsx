/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Flex,
  Input,
  Space,
  Tag,
  Modal,
  Form,
  message,
  DatePicker,
  Select,
  Drawer,
  Spin,
} from "antd";
import { useState } from "react";
import Table, { ColumnProps } from "antd/es/table";
import { LuFileEdit, LuListFilter } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import Title from "antd/es/typography/Title";
import useTable from "@/hooks/useTable";
import * as XLSX from "xlsx";
import { useModal } from "@/hooks/useModal";
import dayjs from "dayjs";
import { Brand, BrandForUpdate } from "@/services/brandService";
import useFetch from "@/hooks/useFetch";
import { API_ENDPOINTS } from "@/constants";
import { RequestParams } from "@/types/type";

const { RangePicker } = DatePicker;

interface FilterValues {
  isActive?: boolean;
  dateRange?: [string, string];
  name?: string;
  orderBy?: "asc" | "desc";
  sortKey?: "id" | "name" | "description" | "createdAt";
}

const dateFormat = "DD/MM/YYYY";

interface BrandRequestParams extends RequestParams {
  name?: string;
}

const AdminBrand = () => {
  // Modal states
  const {
    isModalVisble: isDeleteModalOpen,
    showModal: showDeleteModal,
    handleCancel: cancelDeleteModal,
  } = useModal();

  const {
    isModalVisble: isEditModalOpen,
    showModal: showEditModal,
    handleCancel: cancelEditModal,
  } = useModal();

  // Filter drawer state
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [params, setParams] = useState<BrandRequestParams>();
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const [isEditing, setIsEditing] = useState(false);
  const {
    pageSize,
    pageNumber,
    searchTerm,
    setPageNumber,
    setPageSize,
    setSearchTerm,
    setSortKey,
    setSortOrder,
  } = useTable<Brand>();

  const {
    loading,
    data: brands,
    pagination,
    fetchData,
  } = useFetch<Brand[]>(API_ENDPOINTS.BRAND.GET_ALL_BRAND, {
    params: {
      ...params,
      pageSize,
      pageNumber,
    },
  });

  // Xử lý create brand
  // const handleCreateBrand = async (brandForCreate: BrandForCreate) => {
  //   await fetchData({
  //     method: "POST",
  //     data: brandForCreate,
  //   });
  // };

  // Xử lý update brand
  const handleUpdateBrand = async (
    id: number,
    brandForUpdates: BrandForUpdate
  ) => {
    await fetchData({
      method: "PUT",
      url: API_ENDPOINTS.BRAND.UPDATE_BRAND(id),
      data: brandForUpdates,
    });
  };

  // Xử lý delete brand
  // const handleDeleteBrand = async (id: number) => {
  //   await fetchData({
  //     method: "DELETE",
  //     url: API_ENDPOINTS.BRAND.DELETE_BRAND_BY_ID(id),
  //   });
  // };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    // Reset form về giá trị ban đầu
    form.setFieldsValue(selectedBrand);
  };

  // Handle filter submit
  const handleFilterSubmit = async (values: FilterValues) => {
    const { dateRange, ...restValues } = values;

    const filterParams: BrandRequestParams = {
      ...restValues,
      startDate: dateRange?.[0]
        ? dayjs(dateRange[0]).format("DD-MM-YYYY")
        : undefined,
      endDate: dateRange?.[1]
        ? dayjs(dateRange[1]).format("DD-MM-YYYY")
        : undefined,
    };
    setParams(filterParams);
    setFilterValues(values);
    setIsFilterDrawerOpen(false);

    try {
      // Here you would make an API call with the filter values
      // await fetchBrands({
      //   ...values,
      //   page: currentPage,
      //   pageSize,
      //   searchTerm,
      //   sortKey,
      //   sortOrder
      // });
      message.success("Filters applied successfully");
      setFilterValues({});
    } catch (error) {
      message.error("Failed to apply filters");
    }
  };

  const handleResetFilters = () => {
    filterForm.resetFields();
    setFilterValues({});
    handleFetchData();
  };

  const columns: ColumnProps<Brand>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Logo URL",
      dataIndex: "logoUrl",
      key: "logoUrl",
    },
    {
      title: "Brand Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",

      render: (date: string) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<LuFileEdit />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<AiOutlineDelete />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Brand) => {
    setSelectedBrand(record);
    form.setFieldsValue(record);
    setIsEditing(false);
    showEditModal();
  };

  const handleEditSubmit = async (values: BrandForUpdate) => {
    try {
      if (selectedBrand) {
        await handleUpdateBrand(selectedBrand.id, values);
        message.success("Brand updated successfully");
        setIsEditing(false);
        cancelEditModal();
        handleFetchData();
      }
    } catch (error) {
      message.error("Failed to update brand");
    }
  };

  const handleDelete = (record: Brand) => {
    setSelectedBrand(record);
    showDeleteModal();
  };

  const handleDeleteConfirm = async () => {
    try {
      // await deleteBrand(selectedBrand?.id);
      message.success("Brand deleted successfully");
      cancelDeleteModal();
      handleFetchData();
    } catch (error) {
      message.error("Failed to delete brand");
    }
  };

  const handleFetchData = async () => {
    try {
      // Implement API call here
      // const response = await fetchBrands({
      //   page: currentPage,
      //   pageSize,
      //   searchTerm,
      //   sortKey,
      //   sortOrder,
      //   ...filterValues
      // });
    } catch (error) {
      message.error("Failed to fetch brands");
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(brands ?? []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Brands");
    XLSX.writeFile(wb, "brands.xlsx");
  };

  return (
    <Spin spinning={loading} delay={500}>
      <div className="w-full h-full px-6 py-5 bg-white">
        <Flex align="center" justify="space-between">
          <Title level={2}>Brands</Title>
          <Flex align="center" gap={12}>
            <Input
              placeholder="Search"
              value={searchTerm}
              size="large"
              allowClear
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              size="large"
              icon={<LuListFilter size={24} />}
              onClick={() => setIsFilterDrawerOpen(true)}
              type={
                Object.keys(filterValues).length > 0 ? "primary" : "default"
              }
            >
              Filters
            </Button>
            <Button size="large" onClick={handleDownload}>
              Download all
            </Button>
          </Flex>
        </Flex>

        <Table
          dataSource={brands || []}
          className="mt-4"
          columns={columns}
          pagination={{
            current: pageNumber,
            pageSize: pageSize,
            total: pagination?.totalCount,
            pageSizeOptions: [5, 10, 15],
            onChange: (page) => setPageNumber(page),
            showSizeChanger: true,
            onShowSizeChange: (_, size) => {
              setPageSize(size);
              setPageNumber(1);
            },
          }}
          onChange={(_pagination, _filters, sorter: any) => {
            if (sorter.field) {
              setSortKey(sorter.field);
              setSortOrder(sorter.order);
            }
          }}
        />

        {/* Filter Drawer */}
        <Drawer
          title="Filter Brands"
          placement="right"
          onClose={() => setIsFilterDrawerOpen(false)}
          open={isFilterDrawerOpen}
          width={400}
        >
          <Form
            form={filterForm}
            layout="vertical"
            onFinish={handleFilterSubmit}
            initialValues={filterValues}
          >
            <Form.Item name="isActive" label="Status">
              <Select allowClear placeholder="Selected Status">
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>InActive</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="dateRange" label="Created Date Range">
              <RangePicker format={dateFormat} className="w-full" />
            </Form.Item>

            <Form.Item name="name" label="Brand Name">
              <Input placeholder="Filter by brand name" />
            </Form.Item>

            <Form.Item name="orderBy" label="Order By">
              <Select allowClear placeholder="Select Order By">
                <Select.Option value="asc">Asc</Select.Option>
                <Select.Option value="desc">Desc</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="sortKey" label="Sort Key">
              <Select allowClear placeholder="Select Sort Key">
                <Select.Option value="id">ID</Select.Option>
                <Select.Option value="name">Name</Select.Option>
                <Select.Option value="description">Description</Select.Option>
                <Select.Option value="createdAt">Created At</Select.Option>
              </Select>
            </Form.Item>

            <Flex gap={8}>
              <Button type="primary" htmlType="submit">
                Apply Filters
              </Button>
              <Button onClick={handleResetFilters}>Reset</Button>
            </Flex>
          </Form>
        </Drawer>

        {/* Edit Modal */}
        <Modal
          title="Edit Brand"
          open={isEditModalOpen}
          onCancel={() => {
            cancelEditModal();
            setIsEditing(false);
          }}
          footer={
            isEditing ? (
              <Flex gap={8} justify="end">
                <Button onClick={handleCancelEditing}>Close</Button>
                <Button type="primary" onClick={() => form.submit()}>
                  Submit
                </Button>
              </Flex>
            ) : (
              <Flex gap={8} justify="end">
                <Button onClick={cancelEditModal}>Close</Button>
                <Button type="primary" onClick={handleStartEditing}>
                  Update Brand
                </Button>
              </Flex>
            )
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEditSubmit}
            initialValues={selectedBrand || {}}
          >
            <Form.Item
              name="name"
              label="Brand Name"
              rules={[{ required: true, message: "Please input brand name!" }]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea disabled={!isEditing} />
            </Form.Item>

            <Form.Item name="logoUrl" label="Logo URL">
              <Input disabled={!isEditing} />
            </Form.Item>

            <Form.Item name="isActive" label="Status">
              <Select disabled={!isEditing}>
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="createdAt" label="Created At">
              <Input
                disabled={true}
                value={
                  selectedBrand?.createdAt
                    ? dayjs(selectedBrand.createdAt).format("DD-MM-YYYY")
                    : "-"
                }
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="⚠️ Delete Brand"
          open={isDeleteModalOpen}
          onOk={handleDeleteConfirm}
          onCancel={cancelDeleteModal}
          footer={
            <>
              <Button onClick={cancelDeleteModal}>Cancel</Button>
              <Button danger type="primary" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </>
          }
        >
          <p>Are you sure you want to delete this brand?</p>
        </Modal>
      </div>
    </Spin>
  );
};

export default AdminBrand;
