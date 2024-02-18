"use client";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Badge,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState, useEffect } from "react";
import DashboardComponent from "@/app/components/Admin/Dashboard";

const Dashboard = () => {
  // Dummy data for the table
  const bookingRequests = [
    {
      id: "u6410935",
      name: "Min Khant Kyaw",
      subject: "Algorithm Design",
      schedule: "09:00 - 10:00",
      location: "True Lab",
      tutor: "Saw Zwe",
    },
    {
      id: "u6410935",
      name: "Min Khant Kyaw",
      subject: "Algorithm Design",
      schedule: "09:00 - 10:00",
      location: "True Lab",
      tutor: "Saw Zwe",
    },
    {
      id: "u6410935",
      name: "Min Khant Kyaw",
      subject: "Algorithm Design",
      schedule: "09:00 - 10:00",
      location: "True Lab",
      tutor: "Saw Zwe",
    },
    {
      id: "u6410935",
      name: "Min Khant Kyaw",
      subject: "Algorithm Design",
      schedule: "09:00 - 10:00",
      location: "True Lab",
      tutor: "Saw Zwe",
    },
    // ... other booking requests
  ];

  return <DashboardComponent bookingRequests={bookingRequests} />;
};

export default Dashboard;
