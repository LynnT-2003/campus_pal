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
//     title: "Principles of Statistics",
//     prerequisite: "None",
//     location: "TrueLab",
//   },
//   {
//     title: "Fundamentals of Programming",
//     prerequisite: "None",
//     location: "TrueLab",
//   },
//   {
//     title: "Object-Oriented Programming",
//     prerequisite: "CSX-3001",
//     location: "TrueLab",
//   },
//   {
//     title: "Data Structure & Algorithms",
//     prerequisite: "None",
//     location: "TrueLab",
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
      // const fetchData = async () => {
      //   try {
      //     const response = await fetch(
      //       "https://tutorplus-backend.vercel.app/api/offeredCourses"
      //     ); // Replace with your actual API endpoint
      //     const data = await response.json();
      //     setOfferedCoursesData(data);
      //     setLoading(false); // Assuming your API response is an array of anime objects
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // };

      // fetchData();
    }
  }, []);

  const [offeredCoursesData, setOfferedCoursesData] = useState([]);

  // Add the useRouter hook
  const router = useRouter();

  // Function to handle signout
  const handleSignOut = () => {
    // Clear isLoggedIn state in local storage
    localStorage.clear();

    // Redirect the user to the login page
    router.replace("/client/Login");
  };

  const handlePost = () => {
    console.log("User has signed in, attempting to post user info");
    fetch("/api/storeUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully posted user login info to MongoDB", data);
        // Redirect or perform additional actions upon successful POST
        router.push("/");
      })
      .catch((error) => console.error("Error storing user:", error));
  };

  useEffect(() => {
    if (user) {
      console.log("User has signed in, attempting to post user info");
      fetch("/api/storeUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Successfully posted user login info to MongoDB", data);
          // Redirect or perform additional actions upon successful POST
          router.push("/");
        })
        .catch((error) => console.error("Error storing user:", error));
    }
  }, user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tutorplus-backend.vercel.app/api/offeredCourses"
        ); // Replace with your actual API endpoint
        const data = await response.json();
        setOfferedCoursesData(data);
        setLoading(false); // Assuming your API response is an array of anime objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const titleStyle = {
    // fontWeight: "bold", // Make it bold
    fontFamily: "Poppins, sans-serif", // Choose a suitable font family
    fontWeight: "bold",
    color: "#D21F3C", // Set your desired text color
    textAlign: "center", // Center align the title
  };

  // State to control the visibility of the dialog
  const [isDialogOpen, setDialogOpen] = useState(false);

  // State to store the selected course when a card is clicked
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Event handler to open the dialog and set the selected course
  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  // Event handler to close the dialog
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
      // Render the loading GIF while fetching tasks
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
                    src="/confirm.svg" // Replace with the actual path to your image in the public folder
                    alt="Confirmation Image"
                    style={{
                      width: "100px", // Adjust the width as needed
                      height: "auto", // Maintain aspect ratio
                      marginRight: "1em", // Add spacing between the image and text
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
            vertical: "top", // Show the notification at the top
            horizontal: "center", // Center it horizontally
          }}
          style={{
            paddingTop: "20px", // Add padding to the top
            transition: "opacity 2s ease-in-out", // Adjust the duration as needed
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
    // do nothing
  }
};
// export default Page;

export default Page;
