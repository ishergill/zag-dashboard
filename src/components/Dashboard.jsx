"use client"
// Dashboard.jsx
import { useState } from 'react';
import { Layout, Menu, Row, Col, Card, Progress, Input, Select, Table, Pagination } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from './Dashboard.module.scss'; // Make sure to import the SASS module
import Image from 'next/image';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('workspaces');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;

  // Data for the customers and their details
  const customersData = require('./customersData.json'); // Import the JSON data

  // Columns for the customer table
  const columns = [
    { title: 'Customer Name', dataIndex: 'name', key: 'name' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  // Calculate the index range for the current page
  const startIdx = (currentPage - 1) * entriesPerPage;
  const endIdx = startIdx + entriesPerPage;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const sortByAmount = () => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setFilteredData(sortedData);
    setSortBy('Amount')
  };
 

  return (
    <Layout className={styles.layoutWrapper}>
      {/* Hamburger Menu */}
      <Sider breakpoint="lg" collapsedWidth="0" theme="light">
        {/* Company logo here (replace this with your company logo) */}
        <div className={styles.companyLogo}></div>

        {/* Menu */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onSelect={({ key }) => setSelectedMenuItem(key)}
        >
          <Menu.Item key="reports" icon={
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.6656 0.85L17.2058 2.29L11.9863 7.17L8.46745 3.88C8.05032 3.49 7.37649 3.49 6.95936 3.88L0.541974 9.89C0.124843 10.28 0.124843 10.91 0.541974 11.3C0.959104 11.69 1.63293 11.69 2.05006 11.3L7.70806 6L11.2269 9.29C11.6441 9.68 12.3179 9.68 12.735 9.29L18.7139 3.71L20.2541 5.15C20.5856 5.46 21.1632 5.24 21.1632 4.8V0.5C21.1739 0.22 20.9386 0 20.6391 0H16.0507C15.5694 0 15.3341 0.54 15.6656 0.85Z" fill="black" />
            </svg>
          }>
            Reports
          </Menu.Item>
          <Menu.Item key="workspaces" icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1079_255)">
          <path d="M5 11H8C8.55 11 9 10.55 9 10V6C9 5.45 8.55 5 8 5H5C4.45 5 4 5.45 4 6V10C4 10.55 4.45 11 5 11ZM5 18H8C8.55 18 9 17.55 9 17V13C9 12.45 8.55 12 8 12H5C4.45 12 4 12.45 4 13V17C4 17.55 4.45 18 5 18ZM11 18H14C14.55 18 15 17.55 15 17V13C15 12.45 14.55 12 14 12H11C10.45 12 10 12.45 10 13V17C10 17.55 10.45 18 11 18ZM17 18H20C20.55 18 21 17.55 21 17V13C21 12.45 20.55 12 20 12H17C16.45 12 16 12.45 16 13V17C16 17.55 16.45 18 17 18ZM11 11H14C14.55 11 15 10.55 15 10V6C15 5.45 14.55 5 14 5H11C10.45 5 10 5.45 10 6V10C10 10.55 10.45 11 11 11ZM16 6V10C16 10.55 16.45 11 17 11H20C20.55 11 21 10.55 21 10V6C21 5.45 20.55 5 20 5H17C16.45 5 16 5.45 16 6Z" fill="#1B59F8"/>
          </g>
          <defs>
          <clipPath id="clip0_1079_255">
          <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          
        }>
            Workspaces
          </Menu.Item>
          <Menu.Item key="settings" icon={
          <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5109 12.98C21.5544 12.66 21.587 12.34 21.587 12C21.587 11.66 21.5544 11.34 21.5109 11.02L23.8044 9.37C24.0109 9.22 24.0653 8.95 23.9349 8.73L21.7609 5.27C21.6305 5.05 21.337 4.97 21.0979 5.05L18.3914 6.05C17.8262 5.65 17.2175 5.32 16.5544 5.07L16.1414 2.42C16.1088 2.18 15.8805 2 15.6088 2H11.2609C10.9892 2 10.7609 2.18 10.7283 2.42L10.3153 5.07C9.65225 5.32 9.04355 5.66 8.47834 6.05L5.77181 5.05C5.52181 4.96 5.23921 5.05 5.10877 5.27L2.93486 8.73C2.79355 8.95 2.85877 9.22 3.06529 9.37L5.35877 11.02C5.31529 11.34 5.28268 11.67 5.28268 12C5.28268 12.33 5.31529 12.66 5.35877 12.98L3.06529 14.63C2.85877 14.78 2.80442 15.05 2.93486 15.27L5.10877 18.73C5.23921 18.95 5.53268 19.03 5.77181 18.95L8.47834 17.95C9.04355 18.35 9.65225 18.68 10.3153 18.93L10.7283 21.58C10.7609 21.82 10.9892 22 11.2609 22H15.6088C15.8805 22 16.1088 21.82 16.1414 21.58L16.5544 18.93C17.2175 18.68 17.8262 18.34 18.3914 17.95L21.0979 18.95C21.3479 19.04 21.6305 18.95 21.7609 18.73L23.9349 15.27C24.0653 15.05 24.0109 14.78 23.8044 14.63L21.5109 12.98ZM13.4349 15.5C11.337 15.5 9.63051 13.93 9.63051 12C9.63051 10.07 11.337 8.5 13.4349 8.5C15.5327 8.5 17.2392 10.07 17.2392 12C17.2392 13.93 15.5327 15.5 13.4349 15.5Z" fill="black"/>
          </svg>          
          }>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className={styles.layoutWrapper2}>
        {/* Main Content */}
        <Content className={styles.mainContent}>
          <div className={styles.ordersHeader}>
            <h2 className={styles.ordersHeading}>Orders</h2>
            <button className={styles.addButton}>
              + Add Order</button>
          </div>
          <div className={styles.ordersSeparator}></div>

          <Row gutter={[24, 24]}>
            {/* All Customers */}
            <Col span={12}>
              <Card className={styles.cardSection}>
                <h3 className={styles.cardSectionHeading}>All Customers</h3>
                <div className={styles.circularProgressSection}>
                  {/* Circles with percentages */}
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={75} width={80} format={() => '75%'} />
                    <div className={styles.progressLabel}>Customer Success</div>
                  </div>
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={50} width={80} format={() => '50%'} />
                    <div className={styles.progressLabel}>New Customer</div>
                  </div>
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={30} width={80} format={() => '30%'} />
                    <div className={styles.progressLabel}>Target Customer</div>
                  </div>
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={20} width={80} format={() => '20%'} />
                    <div className={styles.progressLabel}>Retarget Customer</div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Status Overview */}
            <Col span={12}>
              <Card className={styles.cardSection}>
                <h3 className={styles.cardSectionHeading}>Status Overview</h3>
                <div className={styles.progressBarSection}>
                  {/* Progress bars */}
                  <div className={styles.progressBar}>
                    <div className={styles.progressBarLabel}>Active</div>
                    <Progress percent={80} status="active" />
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressBarLabel}>Inactive</div>
                    <Progress percent={20} status="exception" />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Customer Details */}
          <div className={styles.customerDetails}>
            {/* Navbar */}
            <div className={styles.navbar}>
              <h2 className={styles.activeMembersHeading}>Active Members</h2>
              <div className={styles.searchBar}>
                <Input placeholder="Search..." prefix={<SearchOutlined />} className={styles.searchInput} />
                <Select defaultValue="Sort By" className={styles.sortBySelect}>
                  <Option value="name">Name</Option>
                  <Option value="company">Company</Option>
                  {/* Add other options as needed */}
                </Select>
              </div>
            </div>

            {/* Customer List */}
            <Table dataSource={customersData.slice(startIdx, endIdx)} columns={columns} pagination={false} />

            {/* Pagination */}
            <div className={styles.pagination}>
              <div className={styles.data}>
                {`Showing data ${startIdx + 1} to ${endIdx < customersData.length ? endIdx : customersData.length
                  } of ${customersData.length} entries`}
              </div>
              <Pagination
                total={customersData.length}
                pageSize={entriesPerPage}
                current={currentPage}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;





