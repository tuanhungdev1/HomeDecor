/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Input, Space, Tag, Modal, Form, message } from "antd";
import { useState } from "react";
import { Supplier } from "./AdminSuppliers";
import Table, { ColumnProps } from "antd/es/table";
import { LuEye, LuFileEdit, LuListFilter } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import Title from "antd/es/typography/Title";
import useTable from "@/hooks/useTable";
import * as XLSX from "xlsx";

const suppliersData: Supplier[] = [
  {
    id: 1,
    companyName: "ABC Supplies Co.",
    contactPerson: "John Doe",
    email: "johndoe@abc.com",
    phone: "123-456-7890",
    address: "123 Main St, Cityville",
    taxId: "ABC123456",
    status: "Active",
    lastOrderDate: "2024-10-01",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: 2,
    companyName: "XYZ Distributors",
    contactPerson: "Jane Smith",
    email: "janesmith@xyz.com",
    phone: "987-654-3210",
    address: "456 Broadway, Metropolis",
    taxId: "XYZ987654",
    status: "Inactive",
    lastOrderDate: "2023-08-10",
    createdAt: new Date("2022-06-25"),
    updatedAt: new Date("2023-09-05"),
  },
  {
    id: 3,
    companyName: "QuickShip Logistics",
    contactPerson: "Emily Davis",
    email: "emily@quickship.com",
    phone: "321-654-0987",
    address: "789 Commerce St, Industrial City",
    taxId: "QSL098765",
    status: "Active",
    lastOrderDate: "2024-05-15",
    createdAt: new Date("2021-12-01"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: 4,
    companyName: "Global Parts Inc.",
    contactPerson: "Michael Lee",
    email: "mikelee@globalparts.com",
    phone: "111-222-3333",
    address: "100 Industrial Ave, Tech Valley",
    taxId: "GPI112233",
    status: "Inactive",
    lastOrderDate: "2023-12-05",
    createdAt: new Date("2020-05-12"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: 5,
    companyName: "Premium Goods",
    contactPerson: "Sophia Brown",
    email: "sophiabrown@premiumgoods.com",
    phone: "444-555-6666",
    address: "250 Luxury Blvd, Uptown",
    taxId: "PG445566",
    status: "Active",
    lastOrderDate: "2024-09-20",
    createdAt: new Date("2022-09-30"),
    updatedAt: new Date("2024-09-15"),
  },
];

const AdminBrand = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [form] = Form.useForm();

  const {
    currentData,
    pageSize,
    currentPage,
    searchTerm,
    setCurrentPage,
    setPageSize,
    setSearchTerm,
    setSortKey,
    setSortOrder,
    totalPages,
  } = useTable<Supplier>({ data: suppliersData });

  // Xử lý xem chi tiết supplier
  const handleView = (record: Supplier) => {
    setSelectedSupplier(record);
    setIsViewModalOpen(true);
  };

  // Xử lý chỉnh sửa supplier
  const handleEdit = (record: Supplier) => {
    setSelectedSupplier(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  // Xử lý xóa supplier
  const handleDelete = (record: Supplier) => {
    setSelectedSupplier(record);
    setIsDeleteModalOpen(true);
  };

  // Xử lý submit form edit
  const handleEditSubmit = async () => {
    try {
      // Gọi API để update supplier
      // await updateSupplier(selectedSupplier?.id, values);
      message.success("Supplier updated successfully");
      setIsEditModalOpen(false);
      // Refresh data
      handleFetchData();
    } catch (error) {
      message.error("Failed to update supplier");
    }
  };

  // Xử lý xác nhận xóa
  const handleDeleteConfirm = async () => {
    try {
      // Gọi API để xóa supplier
      // await deleteSupplier(selectedSupplier?.id);
      message.success("Supplier deleted successfully");
      setIsDeleteModalOpen(false);
      // Refresh data
      handleFetchData();
    } catch (error) {
      message.error("Failed to delete supplier");
    }
  };

  // Xử lý download data
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(currentData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Suppliers");
    XLSX.writeFile(wb, "suppliers.xlsx");
  };

  const columns: ColumnProps<Supplier>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: true,
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Last Order",
      dataIndex: "lastOrderDate",
      key: "lastOrderDate",
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<LuEye />} onClick={() => handleView(record)} />
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

  const handleFetchData = async () => {
    try {
      // const response = await fetch('/api/suppliers', {
      //   method: 'GET',
      //   params: {
      //     page: currentPage,
      //     pageSize,
      //     searchTerm,
      //     sortKey,
      //     sortOrder
      //   }
      // });
      // const data = await response.json();
      // Xử lý data và cập nhật state
    } catch (error) {
      message.error("Failed to fetch suppliers");
    }
  };

  return (
    <div className="w-full h-full px-6 py-5 bg-white">
      <Flex align="center" justify="space-between">
        <Title level={2}>Brands</Title>
        <Flex align="center" gap={12}>
          <Input
            placeholder="Search"
            value={searchTerm}
            size="large"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button size="large" type="primary" onClick={handleFetchData}>
            Fetch Brands
          </Button>
          <Button size="large" icon={<LuListFilter size={24} />}>
            Filters
          </Button>
          <Button size="large" onClick={handleDownload}>
            Download all
          </Button>
        </Flex>
      </Flex>

      <Table
        dataSource={currentData}
        className="mt-4"
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalPages,
          pageSizeOptions: [2, 4, 20],
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: true,
          onShowSizeChange: (_, size) => {
            setPageSize(size);
            setCurrentPage(1);
          },
        }}
        onChange={(pagination, filters, sorter: any) => {
          console.log(pagination, filters, sorter, "Runnnn");
          if (sorter.field) {
            setSortKey(sorter.field);
            setSortOrder(sorter.order);
          }
        }}
      />

      {/* View Modal */}
      <Modal
        title="Supplier Details"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
      >
        {selectedSupplier && (
          <div>
            <p>
              <strong>Company Name:</strong> {selectedSupplier.companyName}
            </p>
            <p>
              <strong>Contact Person:</strong> {selectedSupplier.contactPerson}
            </p>
            <p>
              <strong>Email:</strong> {selectedSupplier.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedSupplier.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedSupplier.address}
            </p>
            <p>
              <strong>Tax ID:</strong> {selectedSupplier.taxId}
            </p>
            <p>
              <strong>Status:</strong> {selectedSupplier.status}
            </p>
            <p>
              <strong>Last Order Date:</strong> {selectedSupplier.lastOrderDate}
            </p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Supplier"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[{ required: true, message: "Please input company name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactPerson"
            label="Contact Person"
            rules={[
              { required: true, message: "Please input contact person!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please input valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input phone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="⚠️Delete Supplier!"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={
          <>
            <Button type="default" onClick={() => setIsDeleteModalOpen(false)}>
              Close
            </Button>
            <Button onClick={handleDeleteConfirm} variant="outlined" danger>
              Delete
            </Button>
          </>
        }
      >
        <p className="mt-4">Are you sure you want to delete this supplier?</p>
      </Modal>
    </div>
  );
};

export default AdminBrand;
