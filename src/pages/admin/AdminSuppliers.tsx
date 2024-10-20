/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModal } from "@/hooks/useModal";
import { Button, Flex, Modal, Space, Tag, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useState } from "react";
import { LuEye, LuFileEdit, LuListFilter } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";

const { Title } = Typography;

export interface Supplier {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  status: "Active" | "Inactive";
  lastOrderDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSuppliers = () => {
  const { isModalVisble, handleCancel, showModal } = useModal();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleViewDetails = (supplier: Supplier) => {
    setLoading(true);
    showModal();

    setTimeout(() => {
      setSelectedSupplier(supplier);
      setLoading(false);
    }, 1000);
  };

  const handleOk = () => {
    handleCancel();
  };

  const columns: ColumnProps<Supplier>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
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
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<LuEye />} onClick={() => handleViewDetails(record)} />
          <Button icon={<LuFileEdit />} />
          <Button
            variant="outlined"
            color="danger"
            icon={<AiOutlineDelete />}
          />
        </Space>
      ),
    },
  ];

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

  return (
    <div className="">
      <Table
        dataSource={suppliersData}
        columns={columns}
        title={() => (
          <Flex align="center" justify="space-between">
            <Title level={2}>Suppliers</Title>
            <Flex align="center" gap={12}>
              <Button size="large" type="primary">
                Add Supplier
              </Button>
              <Button size="large" icon={<LuListFilter size={24} />}>
                Filters
              </Button>
              <Button size="large">Download all</Button>
            </Flex>
          </Flex>
        )}
      />

      <Modal
        loading={loading}
        title="Supplier Details"
        visible={isModalVisble}
        onCancel={handleCancel}
        footer={[
          <Button key="close" size="large" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="update" size="large" type="primary" onClick={handleOk}>
            Update
          </Button>,
        ]}
        width={800}
      >
        {" "}
        {selectedSupplier && (
          <div>
            <h3>{selectedSupplier.companyName}</h3>
            <p>
              <strong>Contact:</strong> {selectedSupplier.contactPerson}
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
              <strong>Last Order:</strong> {selectedSupplier.lastOrderDate}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminSuppliers;
