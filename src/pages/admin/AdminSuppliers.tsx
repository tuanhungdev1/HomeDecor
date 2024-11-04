/* eslint-disable react-hooks/exhaustive-deps */
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
  Alert,
  Avatar,
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
import { Brand } from "@/services/brandService";
import useFetch from "@/hooks/useFetch";
import { API_ENDPOINTS } from "@/constants";
import { RequestParams } from "@/types/type";
import AdminHeaderLayout from "@/layouts/AdminHeaderLayout";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { UserOutlined } from "@ant-design/icons";
import { Supplier } from "@/services/supplierServices";
import {
  ModalCreateSupplier,
  ModalEditSupplier,
} from "@/modules/admin/supplier";

const { RangePicker } = DatePicker;

interface FilterValues {
  isActive?: boolean;
  dateRange?: [string, string];
  name?: string;
  orderBy?: "asc" | "desc";
  sortKey?: "id" | "name" | "description" | "createdAt";
}

const dateFormat = "DD/MM/YYYY";

interface SupplierRequestParams extends RequestParams {
  name?: string;
}

const AdminSuppliers = () => {
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

  const {
    isModalVisble: isCreateModalOpen,
    showModal: showCreateModal,
    handleCancel: cancelCreateModal,
  } = useModal();
  const [searchTemp, setSearchTemp] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [params, setParams] = useState<SupplierRequestParams>({});
  const [filterForm] = Form.useForm();
  const {
    pageSize,
    pageNumber,
    searchTerm,
    name,
    sortKey,
    orderBy,
    setPageNumber,
    handleTableChange,
    resetTable,
  } = useTable<Brand>({
    initialPageSize: 10,
    defaultSortKey: "id",
    onParamsChange: (tableParams) => {
      setParams((prev) => ({
        ...prev,
        pageSize: tableParams.pageSize,
        pageNumber: tableParams.pageNumber,
        searchTerm: tableParams.searchTerm,
        name: tableParams.name,
        sortKey: tableParams.sortKey,
        sortOrder: tableParams.orderBy,
      }));
    },
  });

  const {
    loading,
    data: suppliers,
    pagination,
    error,
    fetchData,
  } = useFetch<Supplier[]>(
    API_ENDPOINTS.SUPPLIER.GET_ALL_SUPPLIER,
    {
      params: {
        ...params,
      },
    },
    false
  );

  const handleSearch = () => {
    setParams((prev) => ({
      ...prev,
      searchTerm: searchTemp,
    }));
  };

  // CRUD Operations
  const handleCreateSupplier = async (supplierForCreate: FormData) => {
    try {
      await fetchData({
        method: "POST",
        data: supplierForCreate,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Supplier created successfully");
      cancelCreateModal();
      fetchData();
    } catch (error) {
      message.error("Failed to create supplier");
    }
  };

  // Xử lý update brand
  const handleUpdateSupplier = async (supplierForUpdates: FormData) => {
    try {
      if (!selectedSupplier) return;

      await fetchData({
        method: "PUT",
        url: API_ENDPOINTS.SUPPLIER.UPDATE_SUPPLIER(selectedSupplier.id),
        data: supplierForUpdates,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Brand updated successfully");
      cancelEditModal();
      fetchData();
    } catch (error) {
      message.error("Failed to update brand");
    }
  };

  // Xử lý delete brand
  const handleDeleteBrandConfirm = async () => {
    try {
      if (!selectedSupplier) return;

      await fetchData({
        method: "DELETE",
        url: API_ENDPOINTS.SUPPLIER.DELETE_SUPPLIER_BY_ID(selectedSupplier.id),
      });
      message.success("Supplier deleted successfully");
      cancelDeleteModal();
      fetchData();
    } catch (error) {
      message.error("Failed to delete Supplier");
    }
  };

  // Handle filter submit
  const handleFilterSubmit = async (values: FilterValues) => {
    const { dateRange, ...restValues } = values;

    const filterParams: SupplierRequestParams = {
      ...restValues,
      startDate: dateRange?.[0]
        ? dayjs(dateRange[0]).format("DD-MM-YYYY")
        : undefined,
      endDate: dateRange?.[1]
        ? dayjs(dateRange[1]).format("DD-MM-YYYY")
        : undefined,
    };
    setParams(filterParams);
    setIsFilterDrawerOpen(false);
  };

  const handleClearFillters = () => {
    filterForm.resetFields();
  };

  const handleResetFilters = () => {
    filterForm.resetFields();
    setFilterValues({});
    resetTable();
    setParams({});
    setSearchTemp("");
  };

  const columns: ColumnProps<Supplier>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Logo URL",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (logoUrl: string) =>
        logoUrl ? (
          <Avatar size={50} src={<img src={logoUrl} />} />
        ) : (
          <Avatar size={50} icon={<UserOutlined />} />
        ),
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          <Button
            icon={<LuFileEdit />}
            onClick={() => {
              setSelectedSupplier(record);
              showEditModal();
            }}
          />
          <Button
            danger
            icon={<AiOutlineDelete />}
            onClick={() => {
              setSelectedSupplier(record);
              showDeleteModal();
            }}
          />
        </Space>
      ),
    },
  ];

  const handleDownload = () => {
    if (!suppliers?.length) {
      message.warning("No data to dowload");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(suppliers ?? []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Suppliers");
    XLSX.writeFile(wb, `brands_${dayjs().format("DD-MM-YYYY")}.xlsx`);
  };

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <main className="px-10">
      <AdminHeaderLayout
        title="Suppliers Manager"
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
            title: <Link to={"/admin/suppliers"}>Manager</Link>,
          },
          {
            title: <Link to={"/admin/suppliers"}>Suppliers</Link>,
          },
        ]}
      />
      <Spin spinning={loading} delay={500}>
        <div className="w-full h-full mt-8 bg-white">
          <Flex align="center" justify="space-between">
            <Title level={2}>Suppliers</Title>
            <Flex align="center" gap={12}>
              <div className="flex items-center gap-3" onClick={handleSearch}>
                <Input
                  placeholder="Search"
                  value={searchTemp}
                  size="large"
                  allowClear
                  onChange={(e) => setSearchTemp(e.target.value)}
                />
                <div className="border rounded-full h-[40px] w-[50px] flex items-center hover:border-blue-500 transition-all hover:text-blue-500 justify-center cursor-pointer">
                  <LuSearch size={18} />
                </div>
              </div>
              <Button
                size="large"
                onClick={handleResetFilters}
                type={"primary"}
              >
                Reset
              </Button>
              <Button size="large" onClick={showCreateModal} type={"primary"}>
                Create Supplier
              </Button>
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
            dataSource={Array.isArray(suppliers) ? suppliers : []}
            className="mt-4"
            columns={columns}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: pagination?.totalCount,
              pageSizeOptions: [5, 10, 15],
              onChange: (page) => setPageNumber(page),
              showSizeChanger: true,
              onShowSizeChange: (_current, _size) => {
                setPageNumber(1);
              },
            }}
            onChange={(_pagination, _filters, sorter: any) => {
              handleTableChange(_pagination, _filters, sorter);

              setParams((prev) => ({
                ...prev,
                name: name,
                pageSize: pageSize,
                pageNumber: pageNumber,
                searchTerm: searchTerm,
                sortKey: sortKey,
                sortOrder: orderBy,
              }));
            }}
            rowKey={"id"}
          />

          {/* Filter Drawer */}
          <Drawer
            title="Filter Suppliers"
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

              <Form.Item name="name" label="Supplier Name">
                <Input placeholder="Filter by supplier name" />
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
                  <Select.Option value="email">Email</Select.Option>
                  <Select.Option value="contactPerson">
                    Contact Person
                  </Select.Option>
                  <Select.Option value="phone">Phone</Select.Option>
                  <Select.Option value="address">Adress</Select.Option>
                  <Select.Option value="description">Description</Select.Option>
                  <Select.Option value="createdAt">Created At</Select.Option>
                </Select>
              </Form.Item>

              <Flex gap={8}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Apply Filters
                </Button>
                <Button onClick={handleClearFillters} loading={loading}>
                  Reset
                </Button>
              </Flex>
            </Form>
          </Drawer>

          {/* Edit Modal */}
          <ModalEditSupplier
            visible={isEditModalOpen}
            onClose={cancelEditModal}
            supplier={selectedSupplier}
            onSubmit={handleUpdateSupplier}
            isLoading={loading}
          />

          <ModalCreateSupplier
            visible={isCreateModalOpen}
            onClose={cancelCreateModal}
            onSubmit={handleCreateSupplier}
            isLoading={loading}
          />
          {/* Delete Confirmation Modal */}
          <Modal
            title="⚠️ Delete Supplier"
            open={isDeleteModalOpen}
            onOk={handleDeleteBrandConfirm}
            onCancel={cancelDeleteModal}
            okButtonProps={{ danger: true }}
            okText="Delete"
            confirmLoading={loading}
          >
            <Spin delay={500} spinning={loading}>
              <p>Are you sure you want to delete this Supplier?</p>
            </Spin>
          </Modal>
        </div>
      </Spin>
    </main>
  );
};

export default AdminSuppliers;
