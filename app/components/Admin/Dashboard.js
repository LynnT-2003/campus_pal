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
import React from "react";

const Dashboard = ({ bookingRequests }) => {
  return (
    <div>
      <Box className="pb-20">
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={2}>
            <Paper
              sx={{
                padding: 2,
                paddingBottom: 0,
                paddingTop: 7,
                display: "flex",
                alignItems: "center",
                gap: 0,
              }}
            >
              <Avatar src="/logo.png" sx={{ width: 90, height: 90 }}></Avatar>
              <Typography
                style={{ color: "#68172B", fontWeight: "bold" }}
                variant="h5"
                // sx={{ fontFamily: "Outfit, sans-serif" }}
                className="brandName"
              >
                Tutor Plus
                <Typography
                  style={{ color: "#68172B", fontWeight: "bold" }}
                  variant="h6"
                  // sx={{ fontFamily: "Outfit, sans-serif" }}
                  className="brandName"
                >
                  A. Chayapol
                </Typography>
              </Typography>
            </Paper>
            <Paper
              sx={{
                padding: 1.5,
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                gap: 0,
              }}
            >
              Dashboard
            </Paper>
            <Paper
              sx={{
                padding: 1.5,
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                gap: 0,
              }}
            >
              Users
            </Paper>
            <Paper
              sx={{
                padding: 1.5,
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                gap: 0,
              }}
            >
              Tutors
            </Paper>
            <Paper
              sx={{
                padding: 1.5,
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                gap: 0,
              }}
            >
              Courses
            </Paper>
            <Paper
              sx={{
                padding: 1.5,
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                gap: 0,
              }}
            >
              Sessions
            </Paper>
            <Paper
              sx={{
                padding: 1.5,
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                gap: 0,
                // backgroundColor: "#661529",
              }}
            >
              <Typography style={{ color: "#661529", fontWeight: "bold" }}>
                Back to Landing
              </Typography>
            </Paper>
          </Grid>

          {/* Main content */}
          <Grid item xs={10}>
            <Paper sx={{ padding: 2 }}>
              {/* Summary cards */}
              <Grid container spacing={2} className="pb-5 pt-5">
                <Grid item xs={3}>
                  <Paper
                    sx={{
                      padding: 1.5,
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                      gap: 0,
                    }}
                  >
                    <Grid container spacing={0}>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Badge badgeContent={224} color="primary">
                          <img
                            src="/confirm.svg"
                            alt="Total Users"
                            style={{ width: 100, height: 100 }}
                          />
                        </Badge>
                      </Grid>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center", // Center horizontally
                            alignItems: "center", // Center vertically
                            height: "100%", // Ensure the Box takes full height of its parent
                          }}
                        >
                          <Typography>Registered Users</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper
                    sx={{
                      padding: 1.5,
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                      gap: 0,
                    }}
                  >
                    <Grid container spacing={0}>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Badge badgeContent={10} color="secondary">
                          <img
                            src="/confirm.svg"
                            alt="Total Users"
                            style={{ width: 100, height: 100 }}
                          />
                        </Badge>
                      </Grid>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center", // Center horizontally
                            alignItems: "center", // Center vertically
                            height: "100%", // Ensure the Box takes full height of its parent
                          }}
                        >
                          <Typography>Active Tutors</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper
                    sx={{
                      padding: 1.5,
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                      gap: 0,
                    }}
                  >
                    <Grid container spacing={0}>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Badge badgeContent={6} color="success">
                          <img
                            src="/confirm.svg"
                            alt="Total Users"
                            style={{ width: 100, height: 100 }}
                          />
                        </Badge>
                      </Grid>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center", // Center horizontally
                            alignItems: "center", // Center vertically
                            height: "100%", // Ensure the Box takes full height of its parent
                          }}
                        >
                          <Typography>Total Courses</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper
                    sx={{
                      padding: 1.5,
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                      gap: 0,
                    }}
                  >
                    <Grid container spacing={0}>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Badge badgeContent={24} color="primary">
                          <img
                            src="/confirm.svg"
                            alt="Total Users"
                            style={{ width: 100, height: 100 }}
                          />
                        </Badge>
                      </Grid>
                      <Grid item xs={6} sx={{ padding: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center", // Center horizontally
                            alignItems: "center", // Center vertically
                            height: "100%", // Ensure the Box takes full height of its parent
                          }}
                        >
                          <Typography>Total Sessions</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* <Grid item xs={3}>
                  <Badge badgeContent={24} color="secondary">
                    <Typography>Active Tutors</Typography>
                  </Badge>
                </Grid>
                <Grid item xs={3}>
                  <Badge badgeContent={14} color="success">
                    <Typography>Total Subjects</Typography>
                  </Badge>
                </Grid>
                <Grid item xs={3}>
                  <Badge badgeContent={9} color="error">
                    <Typography>Today's Classes</Typography>
                  </Badge>
                </Grid> */}
              </Grid>

              {/* Table */}
              <TableContainer className="mt-50" component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="booking requests table"
                >
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#661529" }}>
                      <TableCell className="text-white font-bold">No</TableCell>
                      <TableCell className="text-white font-bold">ID</TableCell>
                      <TableCell className="text-white font-bold">
                        Name
                      </TableCell>
                      <TableCell className="text-white font-bold">
                        Subject
                      </TableCell>
                      <TableCell className="text-white font-bold">
                        Schedule
                      </TableCell>
                      <TableCell className="text-white font-bold">
                        Location
                      </TableCell>
                      <TableCell className="text-white font-bold">
                        Tutor
                      </TableCell>
                      <TableCell className="text-white font-bold">
                        Details
                      </TableCell>
                      <TableCell className="text-white font-bold">
                        Accept/Reject
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookingRequests.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.schedule}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.tutor}</TableCell>
                        <TableCell>
                          <Button>Details</Button>
                        </TableCell>
                        <TableCell>
                          <Button color="primary">Accept</Button>
                          <Button color="secondary">Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      )
    </div>
  );
};

export default Dashboard;
