import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Modal, Form, Select, Table, Tag, Space, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useFirestore } from '../../../hooks/useFirestore';
import { useCollectionCount } from '../../../hooks/useCollectionCount';
import PageHeader from '../../../components/PageHeader';
import StatsCard from '../../../components/StatsCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyState from '../../../components/EmptyState';
import { formatDate } from '../../../utils/helpers';
import { COLLECTIONS } from '../../../utils/constants';

const { Search } = Input;
const { Option } = Select;

const Student = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  
  const { data: students, loading, addDocument, updateDocument, deleteDocument } = useFirestore(COLLECTIONS.STUDENTS);
  const { data: courses } = useFirestore(COLLECTIONS.COURSES);
  const { count: totalStudents } = useCollectionCount(COLLECTIONS.STUDENTS);
  const { count: activeStudents } = useCollectionCount(COLLECTIONS.STUDENTS, [
    { field: 'status', operator: '==', value: 'active' },
  ]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    form.setFieldsValue(student);
    setIsModalVisible(true);
  };

  const handleDeleteStudent = async (id) => {
    await deleteDocument(id);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const studentData = {
        ...values,
        status: values.status || 'active',
      };

      if (editingStudent) {
        await updateDocument(editingStudent.id, studentData);
      } else {
        await addDocument({
          ...studentData,
          id: new Date().getTime().toString(),
        });
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id) => <span className="font-mono text-xs">{id.substring(0, 8)}...</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <UserOutlined className="text-blue-600" />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <span className="text-gray-600">
          <MailOutlined className="mr-1" />
          {email}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <span className="text-gray-600">
          <PhoneOutlined className="mr-1" />
          {phone}
        </span>
      ),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      filters: courses.map((course) => ({ text: course.name, value: course.name })),
      onFilter: (value, record) => record.course === value,
      render: (course) => (
        <Tag color="blue" className="rounded-full">
          {course}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'} className="rounded-full">
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Enrolled Date',
      dataIndex: 'enrolledDate',
      key: 'enrolledDate',
      sorter: (a, b) => new Date(a.enrolledDate) - new Date(b.enrolledDate),
      render: (date) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditStudent(record)}
            className="text-blue-600 hover:text-blue-700"
          />
          <Popconfirm
            title="Delete Student"
            description="Are you sure you want to delete this student?"
            onConfirm={() => handleDeleteStudent(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              className="hover:text-red-700"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (loading) {
    return <LoadingSpinner text="Loading students..." />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Student Management"
        subtitle={`Manage and track all student information`}
        breadcrumbs={['Home', 'Students']}
        actions={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddStudent}
            size="large"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Add Student
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={UserOutlined}
          color="blue"
        />
        <StatsCard
          title="Active Students"
          value={activeStudents}
          icon={UserOutlined}
          color="green"
        />
        <StatsCard
          title="Inactive Students"
          value={totalStudents - activeStudents}
          icon={UserOutlined}
          color="red"
        />
      </div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white p-6 shadow-soft"
      >
        {/* Search Bar */}
        <div className="mb-6">
          <Search
            placeholder="Search students by name, email, course..."
            allowClear
            size="large"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Table */}
        {filteredStudents.length === 0 && !loading ? (
          <EmptyState
            icon={UserOutlined}
            title="No Students Found"
            description={searchText ? "No students match your search criteria. Try adjusting your search." : "Get started by adding your first student to the system."}
            action={
              !searchText && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddStudent}
                  size="large"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Add First Student
                </Button>
              )
            }
          />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredStudents}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} students`,
            }}
            className="custom-table"
          />
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText={editingStudent ? 'Update' : 'Add'}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter student name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="john@example.com" size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="+1 234 567 8900" size="large" />
          </Form.Item>

          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: 'Please select a course' }]}
          >
            <Select placeholder="Select a course" size="large">
              {courses.map((course) => (
                <Option key={course.id} value={course.name}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="active">
            <Select size="large">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item name="enrolledDate" label="Enrolled Date">
            <Input type="date" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Student;
