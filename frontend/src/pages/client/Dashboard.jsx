import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Heart, User, Star, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:3000';

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const token = localStorage.getItem('accessToken');
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      try {
        const response = await axios.get(`${BASE_URL}/api/orders/recent-order/${userId}`);
        console.log(response.data.data);
        setRecentOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);

  const stats = [
    {
      title: 'Cart Items',
      value: '0',
      icon: ShoppingCart,
      color: 'text-baby-pink-600',
      bg: 'bg-baby-pink-50'
    },
    {
      title: 'Cart Value',
      value: '$0.00',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: '0',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Wishlist',
      value: '0',
      icon: Heart,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-pink rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back! 🌸
            </h1>
            <p className="text-gray-600">
              Ready to brighten someone's day with beautiful flowers?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white rounded-full p-4">
              <User className="h-16 w-16 text-baby-pink-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/shop"
            className="bg-gradient-primary text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Browse Flowers</h3>
            <p className="text-sm opacity-90">Discover our latest collection</p>
          </Link>
          
          <Link
            to="/cart"
            className="bg-baby-pink-500 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            <Package className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">View Cart</h3>
            <p className="text-sm opacity-90">Review and checkout items</p>
          </Link>
          
          <Link
            to="/orders"
            className="bg-purple-500 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            <Star className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">My Orders</h3>
            <p className="text-sm opacity-90">Track your purchases</p>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <Link
            to="/orders"
            className="text-baby-pink-600 hover:text-baby-pink-700 font-semibold"
          >
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-baby-pink-600">#{order.id}</td>
                  <td className="py-3 px-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-gray-800">{order.OrderItems[0].Flower.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;