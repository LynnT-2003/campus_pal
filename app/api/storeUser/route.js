import connectMongoDB from "@/app/libs/connectMongoDB";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

// Export a named function for the POST method
export async function POST(req, res) {
  // console.log("User post request", req.body);
  const { uid, email, displayName } = await req.json();
  // console.log("User post request", uid, email, displayName);
  await connectMongoDB();
  // let user = await User.findOne({ uid });
  // if (!user) {
  //   await User.create({ uid, email, displayName });
  // }
  await User.create({ uid, email, displayName });
  return NextResponse.json(
    { message: "User created successfully!" },
    { status: 200 }
  );
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find({});
  return NextResponse.json(users, { status: 200 });
}

// import connectMongoDB from "@/app/libs/connectMongoDB";
// import User from "@/app/models/User";
// import { NextResponse } from "next/server";

// // Handling POST request with improved error handling and response
// export async function POST(req, res) {
//   try {
//     const { uid, email, displayName } = await req.json();
//     await connectMongoDB();

//     // Check if the user already exists to prevent duplicate entries
//     let user = await User.findOne({ uid });
//     if (!user) {
//       user = await User.create({ uid, email, displayName });
//       console.log("User created successfully");
//       res.status(200).json({ message: "User created successfully!" });
//     } else {
//       console.log("User already exists");
//       res.status(200).json({ message: "User already exists" });
//     }
//   } catch (error) {
//     console.error("Error storing user:", error);
//     res.status(500).json({ message: "Error storing user" });
//   }
// }
