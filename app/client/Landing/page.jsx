"use client";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LandingCard from "@/app/components/Course/LandingCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import withAuth from "@/app/auth/WithAuth";
import { UserAuth } from "@/app/auth/AuthContext";

// const dummyOfferedCoursesData = [
//   {
//     _id: "65702602b5fe0cd9b23847aa",
//     title: "Principles of Statistics",
//     Prerequisite: ["None"],
//     Location: "TrueLab",
//   },
//   {
//     _id: "65702671b5fe0cd9b23847ab",
//     title: "Fundamentals of Programming",
//     Prerequisite: ["None"],
//     Location: "TrueLab",
//   },
//   {
//     _id: "657026fab5fe0cd9b23847ac",
//     title: "Object-Oriented Programming",
//     Location: "TrueLab",
//     Prerequisite: ["CSX3001"],
//   },
//   {
//     _id: "65702746b5fe0cd9b23847ad",
//     title: "Data Structure & Algorithms",
//     Prerequisite: ["CSX3002"],
//     Location: "TrueLab",
//   },
// ];

const BannerSlideshow = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative lg:h-96">
      <img
        src={images[currentImage]}
        alt={`Banner ${currentImage + 1}`}
        className="w-full h-50 object-cover object-center lg:h-full transition-opacity duration-500"
      />
    </div>
  );
};

const Page = () => {
  const { user } = UserAuth();

  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/client/Login");
    } else {
      setRender(true);
    }
  }, []);

  const [offeredCoursesData, setOfferedCoursesData] = useState([]);

  const router = useRouter();

  const handleSignOut = () => {
    localStorage.clear();
    router.replace("/client/Login");
  };

  useEffect(() => {
    // Attempt to load data from localStorage first
    const cachedData = localStorage.getItem("cachedOfferedCoursesData");
    if (cachedData) {
      console.log("Loading data from cache...", cachedData);
      setOfferedCoursesData(JSON.parse(cachedData));
      setLoading(false);
      // Still fetch in background
      const fetchData = async () => {
        try {
          console.log("Fetching offeredCoursesData in background...");
          const response = await fetch(
            "https://tutorplus-backend.vercel.app/api/offeredCourses"
          );
          const data = await response.json();
          setOfferedCoursesData(data);
          localStorage.setItem(
            "cachedOfferedCoursesData",
            JSON.stringify(data)
          ); // Cache the fetched data
          console.log("Fetched", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      // If no data in localStorage, fetch it from the API
      const fetchData = async () => {
        try {
          console.log("Fetching offeredCoursesData...");
          const response = await fetch(
            "https://tutorplus-backend.vercel.app/api/offeredCourses"
          );
          const data = await response.json();
          setOfferedCoursesData(data);
          localStorage.setItem(
            "cachedOfferedCoursesData",
            JSON.stringify(data)
          ); // Cache the fetched data
          setLoading(false);
          console.log("Fetched", data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false even if there's an error
        }
      };
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   // Attempt to load data from localStorage first
  //   const cachedData = localStorage.getItem("cachedOfferedCoursesData");
  //   if (cachedData) {
  //     console.log("Loading data from cache...");
  //     setOfferedCoursesData(JSON.parse(cachedData));
  //     // Don't setLoading(false) here to allow fetch update
  //   }

  //   // Fetch new data from the API
  //   console.log("Fetching offeredCoursesData from API...");
  //   fetch("https://tutorplus-backend.vercel.app/api/offeredCourses")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched", data);
  //       // Update state with fetched data
  //       setOfferedCoursesData(data);
  //       // Cache the fetched data
  //       localStorage.setItem("cachedOfferedCoursesData", JSON.stringify(data));
  //       // Now setLoading(false) after fetching and caching
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false); // Ensure loading is false even in case of error
  //     });
  // }, []);

  const titleStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "#D21F3C",
    textAlign: "center",
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [isSuccessNotificationOpen, setIsSuccessNotificationOpen] =
    useState(false);

  const showSuccessNotification = () => {
    setIsSuccessNotificationOpen(true);
  };

  const closeSuccessNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSuccessNotificationOpen(false);
  };

  const [loading, setLoading] = useState(true);

  if (render) {
    if (loading) {
      return (
        <div className="flex justify-center items-center">
          <h1>Cooking your courses ^^</h1>
          <img src="/loading1.gif" alt="Loading..." />
        </div>
      );
    }
    return (
      <>
        <div className="banner">
          <BannerSlideshow />
          <h1 className="lg:pt-5 pt-1 text-2xl md:text-5xl" style={titleStyle}>
            Welcome to VMS Tutoring
          </h1>
        </div>
        <div className="p-5 lg:pl-20 lg:pr-20 ">
          <div>
            <h1
              className="pb-3 text-xl md:pt-10 md:text-2xl"
              style={{
                textAlign: "left",
                fontFamily: "Helvetica, sans-serif",
              }}
            >
              Offered Courses:
            </h1>
          </div>
          <Grid container spacing={4}>
            {offeredCoursesData.map((course, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <LandingCard course={course} onCardClick={handleCardClick} />
              </Grid>
            ))}
          </Grid>
        </div>
        <Button onClick={handleSignOut}>Sign out</Button>

        {/* Confirmation Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="confirmation-dialog-title"
          aria-describedby="confirmation-dialog-description"
        >
          <Slide
            direction="up"
            in={isDialogOpen}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 700, exit: 700 }}
          >
            <div>
              <DialogTitle
                id="confirmation-dialog-title"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1em",
                  textAlign: "center",
                  paddingTop: "1.5em",
                }}
              >
                Do you confirm to register for {selectedCourse?.title}?
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="confirmation-dialog-description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1em",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="/confirm.svg"
                    alt="Confirmation Image"
                    style={{
                      width: "100px",
                      height: "auto",
                      marginRight: "1em",
                    }}
                  />
                  <span>Select your schedule after confirmation.</span>
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1em",
                  textAlign: "center",
                }}
              >
                <Button onClick={handleCloseDialog} color="primary">
                  No, thanks
                </Button>
                <Button
                  onClick={() => {
                    handleCloseDialog();
                    showSuccessNotification();
                  }}
                  color="primary"
                >
                  Confirm
                </Button>
              </DialogActions>
            </div>
          </Slide>
        </Dialog>
        <Snackbar
          open={isSuccessNotificationOpen}
          autoHideDuration={4000}
          onClose={closeSuccessNotification}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          style={{
            paddingTop: "20px",
            transition: "opacity 2s ease-in-out",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={closeSuccessNotification}
            severity="success"
          >
            You&apos;ve successfully registered for {selectedCourse?.title}.{" "}
            <Link href="/client/Courses">Take me there</Link>.
          </MuiAlert>
        </Snackbar>
      </>
    );
  } else {
    return null;
  }
};

export default Page;
