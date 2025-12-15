import React from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { TeamOutlined, ApartmentOutlined, TrophyOutlined, RiseOutlined, LineChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { useCollectionCount } from '../../hooks/useCollectionCount';
import { useDynamicChartData } from '../../hooks/useDynamicChartData';
import StatsCard from '../../components/StatsCard';
import PageHeader from '../../components/PageHeader';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { MONTH_LABELS, COURSE_STATUS_LABELS } from '../../utils/constants';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const { count: studentCount, loading: studentsLoading } = useCollectionCount('students');
  const { count: courseCount } = useCollectionCount('courses');
  const { count: activeStudents } = useCollectionCount('students', [
    { field: 'status', operator: '==', value: 'active' },
  ]);
  
  // Use dynamic chart data from Firebase
  const { studentEnrollmentData, courseStatusData, loading: chartLoading } = useDynamicChartData();

  const lineChartData = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'Students Enrolled',
        data: studentEnrollmentData,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: [COURSE_STATUS_LABELS.IN_PROGRESS, COURSE_STATUS_LABELS.COMPLETED, COURSE_STATUS_LABELS.UPCOMING],
    datasets: [
      {
        label: 'Courses',
        data: [
          courseStatusData.inProgress,
          courseStatusData.completed,
          courseStatusData.upcoming,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderColor: ['rgb(59, 130, 246)', 'rgb(34, 197, 94)', 'rgb(249, 115, 22)'],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening with your institution."
        breadcrumbs={['Home', 'Dashboard']}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {studentsLoading ? (
          <SkeletonLoader type="card" count={2} />
        ) : (
          <>
            <StatsCard
              title="Total Students"
              value={studentCount}
              icon={TeamOutlined}
              link="/student"
              color="blue"
              trend={12}
            />
            <StatsCard
              title="Total Courses"
              value={courseCount}
              icon={ApartmentOutlined}
              link="/course"
              color="purple"
              trend={8}
            />
          </>
        )}
        <StatsCard
          title="Active Students"
          value={activeStudents}
          icon={RiseOutlined}
          color="green"
          loading={studentsLoading}
        />
        <StatsCard
          title="In Progress Courses"
          value={courseStatusData.inProgress}
          icon={TrophyOutlined}
          color="orange"
          loading={chartLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Enrollment Trends</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                2024
              </span>
            </div>
            <div className="h-80">
              {chartLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-gray-500">Loading chart data...</div>
                </div>
              ) : studentCount === 0 ? (
                <EmptyState
                  icon={LineChartOutlined}
                  title="No Enrollment Data"
                  description="Add students to see enrollment trends over time."
                  className="h-full"
                />
              ) : (
                <Line data={lineChartData} options={chartOptions} />
              )}
            </div>
          </div>
        </motion.div>

        {/* Doughnut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Course Status</h3>
              <p className="text-sm text-gray-600">Distribution by status</p>
            </div>
            <div className="flex h-80 items-center justify-center">
              {chartLoading ? (
                <div className="text-gray-500">Loading chart data...</div>
              ) : courseCount === 0 ? (
                <EmptyState
                  icon={PieChartOutlined}
                  title="No Course Data"
                  description="Add courses to see status distribution."
                  className="h-full"
                />
              ) : (
                <Doughnut data={doughnutData} options={{ ...chartOptions, maintainAspectRatio: true }} />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: 'New student registered',
                time: '2 hours ago',
                color: 'blue',
              },
              {
                action: 'Course updated: Web Development',
                time: '5 hours ago',
                color: 'purple',
              },
              {
                action: 'Student completed course',
                time: '1 day ago',
                color: 'green',
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className={`h-10 w-10 rounded-full bg-${activity.color}-50 flex items-center justify-center`}>
                  <div className={`h-3 w-3 rounded-full bg-${activity.color}-500`}></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
