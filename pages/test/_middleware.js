import { NextResponse } from "next/server";

export default async function middleware(req, event) {
  console.log(req);
  return NextResponse.next();
}
