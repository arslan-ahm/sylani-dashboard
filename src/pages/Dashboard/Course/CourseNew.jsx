import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Modal, Form, Table, Tag, Space, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
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
const { TextArea } = Input;

const Course = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const { data: courses, loading, addDocument, updateDocument, deleteDocument } = useFirestore(COLLECTIONS.COURSES);
  const { count: totalCourses } = useCollectionCount(COLLECTIONS.COURSES);

  const handleAddCourse = () => {
    setEditingCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    form.setFieldsValue(course);
    setIsModalVisible(true);
  };

  const handleDeleteCourse = async (id) => {
    await deleteDocument(id);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const courseData = {
        ...values,
        code: values.code || `COURSE-${Date.now()}`,
      };

      if (editingCourse) {
        await updateDocument(editingCourse.id, courseData);
      } else {
        await addDocument({
          ...courseData,
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
      title: 'Course Code',
      dataIndex: 'code',
      key: 'code',
      width: 130,
      render: (code) => (
        <Tag color="purple" className="rounded-full font-mono">
          {code}
        </Tag>
      ),
    },
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name?.localeCompare(b.name),
      render: (name) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
            <BookOutlined className="text-purple-600" />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (desc) => (
        <span className="text-sm text-gray-600">{desc || 'No description'}</span>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      render: (date) => (
        <span className="text-gray-600">
          <CalendarOutlined className="mr-1" />
          {formatDate(date)}
        </span>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => (
        <span className="text-gray-600">
          <CalendarOutlined className="mr-1" />
          {formatDate(date)}
        </span>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_, record) => {
        if (!record.startDate || !record.endDate) return 'N/A';
        const start = new Date(record.startDate);
        const end = new Date(record.endDate);
        const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
        return (
          <span className="text-gray-600">
            <ClockCircleOutlined className="mr-1" />
            {months} months
          </span>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        const now = new Date();
        const start = new Date(record.startDate);
        const end = new Date(record.endDate);
        
        let status = 'Upcoming';
        let color = 'orange';
        
        if (now >= start && now <= end) {
          status = 'In Progress';
          color = 'blue';
        } else if (now > end) {
          status = 'Completed';
          color = 'green';
        }
        
        return (
          <Tag color={color} className="rounded-full">
            {status}
          </Tag>
        );
      },
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
            onClick={() => handleEditCourse(record)}
            className="text-blue-600 hover:text-blue-700"
          />
          <Popconfirm
            title="Delete Course"
            description="Are you sure you want to delete this course?"
            onConfirm={() => handleDeleteCourse(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Calculate course statistics
  const now = new Date();
  const inProgressCourses = courses.filter((course) => {
    const start = new Date(course.startDate);
    const end = new Date(course.endDate);
    return now >= start && now <= end;
  }).length;

  const upcomingCourses = courses.filter((course) => {
    const start = new Date(course.startDate);
    return now < start;
  }).length;

  if (loading) {
    return <LoadingSpinner text="Loading courses..." />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Course Management"
        subtitle="Manage and track all course information"
        breadcrumbs={['Home', 'Courses']}
        actions={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddCourse}
            size="large"
            className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Add Course
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Courses"
          value={totalCourses}
          icon={BookOutlined}
          color="purple"
        />
        <StatsCard
          title="In Progress"
          value={inProgressCourses}
          icon={BookOutlined}
          color="blue"
        />
        <StatsCard
          title="Upcoming"
          value={upcomingCourses}
          icon={BookOutlined}
          color="orange"
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
            placeholder="Search courses by name, code, description..."
            allowClear
            size="large"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Table */}
        {filteredCourses.length === 0 && !loading ? (
          <EmptyState
            icon={BookOutlined}
            title="No Courses Found"
            description={searchText ? "No courses match your search criteria. Try adjusting your search." : "Get started by adding your first course to the system."}
            action={
              !searchText && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddCourse}
                  size="large"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Add First Course
                </Button>
              )
            }
          />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredCourses}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} courses`,
            }}
            className="custom-table"
          />
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText={editingCourse ? 'Update' : 'Add'}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="code"
            label="Course Code"
            rules={[{ required: true, message: 'Please enter course code' }]}
          >
            <Input placeholder="CS-101" size="large" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Course Name"
            rules={[{ required: true, message: 'Please enter course name' }]}
          >
            <Input prefix={<BookOutlined />} placeholder="Web Development" size="large" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea
              rows={4}
              placeholder="Enter course description..."
              maxLength={500}
              showCount
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: 'Please select start date' }]}
            >
              <Input type="date" size="large" />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: 'Please select end date' }]}
            >
              <Input type="date" size="large" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Course;
