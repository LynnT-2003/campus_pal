import connectMongoDB from "@/app/libs/connectMongoDB";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

// Export a named function for the POST method
export async function POST(req, res) {
  console.log("User post request", req.body);
  const { uid, email, displayName } = await req.json();
  await connectMongoDB();
  // let user = await User.findOne({ uid });
  // if (!user) {
  //   await User.create({ uid, email, displayName });
  // }
  await User.create({ uid, email, displayName });
  return NextResponse.json(
    { message: "Model created successfully!" },
    { status: 200 }
  );
}

// import connectMongoDB from "@/app/libs/connectMongoDB";
// import User from "@/app/models/User";

// // Handling POST request
// export async function POST(req, res) {
//   try {
//     // Await the parsing of JSON body
//     const { uid, email, displayName } = await req.json();

//     // Ensure connection to MongoDB
//     await connectMongoDB();

//     // Check if the user already exists
//     let user = await User.findOne({ uid });
//     if (!user) {
//       // Create a new user if it doesn't exist
//       user = await User.create({ uid, email, displayName });
//       console.log("User created successfully");
//       return NextResponse.json(
//         { message: "Model created successfully!" },
//         { status: 200 }
//       );
//     } else {
//       console.log("User already exists");
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 200 }
//       );
//     }
//   } catch (error) {
//     console.error("Error storing user:", error);
//     return NextResponse.json(
//       { message: "Error created successfully!" },
//       { status: 500 }
//     );
//   }
// }

// // Handling GET request (Example function, adjust according to your needs)
// export async function GET(req, res) {
//   try {
//     await connectMongoDB();
//     const users = await User.find({});
//     return res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return res.status(500).json({ message: "Error fetching users" });
//   }
// }
