import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Dashboard = ({ url, adminToken }) => {
  const [stats, setStats] = useState({
    todayOrders: 0,
    totalOrders: 0,
    menuItems: 0,
    pendingDeliveries: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [foodRes, orderRes] = await Promise.all([
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/order/list`,{
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
      ]);

      if (!foodRes.data.success || !orderRes.data.success) {
        toast.error("Failed to load dashboard data");
        return;
      }

      const foods = foodRes.data.data || [];
      const orders = orderRes.data.data || [];

      const menuItems = foods.length;
      const totalOrders = orders.length;

      const totalRevenue = orders.reduce(
        (sum, o) => sum + (o.amount || 0),
        0
      );

      const pendingDeliveries = orders.filter(
        (o) => o.status !== "Delivered"
      ).length;

      const todayStr = new Date().toISOString().slice(0, 10);

      const todayOrdersList = orders.filter((o) => {
        if (!o.createdAt) return false;
        return o.createdAt.slice(0, 10) === todayStr;
      });

      const todayOrders = todayOrdersList.length;
      const todayRevenue = todayOrdersList.reduce(
        (sum, o) => sum + (o.amount || 0),
        0
      );

      const avgOrderValue =
        totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // build last 7 days revenue chart
      const now = new Date();
      const dataForChart = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const iso = d.toISOString().slice(0, 10);

        const dayRevenue = orders
          .filter((o) => o.createdAt && o.createdAt.slice(0, 10) === iso)
          .reduce((sum, o) => sum + (o.amount || 0), 0);

        const label = d.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        });

        dataForChart.push({ date: label, revenue: dayRevenue });
      }

      setStats({
        todayOrders,
        totalOrders,
        menuItems,
        pendingDeliveries,
        todayRevenue,
        totalRevenue,
        avgOrderValue,
      });

      setChartData(dataForChart);
    } catch (err) {
      console.error("Dashboard stats fetch error:", err);
      toast.error("Error fetching dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [url]);

  const displayNumber = (value, digits = 0) =>
    loading ? "…" : value.toFixed ? value.toFixed(digits) : value;

  return (
    <div className="admin-dashboard">
      {/* Hero Section */}
      <div className="admin-hero">
        <div className="admin-hero-left">
          <p className="admin-badge">BlizzBazar Admin</p>
          <h1>Control your kitchen like a boss 👨‍🍳🔥</h1>
          <p className="admin-hero-text">
            Live overview of orders, revenue and menu items. Adjust your
            strategy in real-time and keep BlizzBazar cooking.
          </p>

          <div className="admin-hero-actions">
            <Link to="/add" className="admin-btn primary">
              ➕ Add New Item
            </Link>
            <Link to="/orders" className="admin-btn ghost">
              📦 View Orders
            </Link>
          </div>
        </div>

        <div className="admin-hero-right">
          <img
            src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=80"
            alt="Food dashboard"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Today’s Orders</h3>
          <p className="stat-number">
            {displayNumber(stats.todayOrders)}
          </p>
          <p className="stat-caption">Orders placed today</p>
        </div>

        <div className="stat-card">
          <h3>Today’s Revenue</h3>
          <p className="stat-number">
            ₹{displayNumber(stats.todayRevenue, 2)}
          </p>
          <p className="stat-caption">Revenue generated today</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">
            ₹{displayNumber(stats.totalRevenue, 2)}
          </p>
          <p className="stat-caption">All-time revenue</p>
        </div>

        <div className="stat-card">
          <h3>Avg. Order Value</h3>
          <p className="stat-number">
            ₹{displayNumber(stats.avgOrderValue, 2)}
          </p>
          <p className="stat-caption">Per completed order</p>
        </div>

        <div className="stat-card">
          <h3>Menu Items</h3>
          <p className="stat-number">
            {displayNumber(stats.menuItems)}
          </p>
          <p className="stat-caption">Active dishes on BlizzBazar</p>
        </div>

        <div className="stat-card">
          <h3>Pending Deliveries</h3>
          <p className="stat-number">
            {displayNumber(stats.pendingDeliveries)}
          </p>
          <p className="stat-caption">Not delivered yet</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="admin-chart-section">
        <div className="admin-chart-header">
          <h2>Last 7 days revenue</h2>
          <span className="chart-subtitle">
            Track how your daily earnings are moving
          </span>
        </div>

        <div className="admin-chart-wrapper">
          {chartData.length === 0 ? (
            <p className="chart-empty">
              Not enough data yet. Start getting some orders 🚀
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`₹${value.toFixed(2)}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ea580c"
                  fill="url(#revGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="admin-quick-links">
        <h2>Quick actions</h2>
        <div className="quick-grid">
          <Link to="/add" className="quick-card">
            <span className="emoji">🧾</span>
            <h4>Add New Food Item</h4>
            <p>Upload image, set price & category in seconds.</p>
          </Link>

          <Link to="/list" className="quick-card">
            <span className="emoji">📚</span>
            <h4>Manage Menu</h4>
            <p>Edit or remove items that are out of stock.</p>
          </Link>

          <Link to="/orders" className="quick-card">
            <span className="emoji">🛵</span>
            <h4>Track All Orders</h4>
            <p>Update order status & keep deliveries on time.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
