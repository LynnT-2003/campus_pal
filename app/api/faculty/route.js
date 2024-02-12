import connectMongoDB from "@/app/libs/connectMongoDB";
import Faculty from "@/app/models/Faculty";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  console.log("Faculty post request");
  console.log("This is testing for Requsest JSON (the data should be here):");
  console.log(req.body);
  const { facultyName, courses } = await req.json();
  console.log("Faulty name:", facultyName);
  console.log("Faculty courses:", courses);
  await connectMongoDB();
  try {
    const faculty = await Faculty.create({ facultyName, courses });
    console.log("Successfully created Faculty!");
    return NextResponse.json(
      { message: "Faculty created successfully!" },
      { status: 200 }
    );
    // return { status: 200, body: { message: "Model created successfully!" } };
  } catch (err) {
    console.log("Error creating Faculty", err);
    return NextResponse.json(
      { message: "Error creating Faculty." },
      { status: 400 }
    );
    // return { status: 500, body: { message: "Error creating model" } };
  }
}

export async function GET(req, res) {
  console.log("Faculty GET request", req.body);
  await connectMongoDB();
  try {
    const faculties = await Faculty.find({});
    console.log("Successfully received Faculties.");
    return NextResponse.json(
      { message: "Successfully received Faculties." },
      { status: 400 }
    );
  } catch (err) {
    console.log("Error retrieving Faculties", err);
    return NextResponse.json({ message: "Error receiving Faculties." });
  }
}

// TODO: PUT method for updating Faculty (eg. new Courses, new Course Schedules, etc.)
export async function PUT(req, res) {
  console.log("Faculty PUT request", req.body);
}

// I dont think we will have DELETE method
// just use [...] and PUT method for updating Faculty to delete a course, etc.
