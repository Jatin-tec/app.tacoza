'use server'
import { cookies } from "next/headers";
import { encrypt } from "@/app/lib/auth/util/lib";
import { apiPost } from "@/handlers/apiHandler";

export async function verifyOTP(phone_number, otp) {
  try {
    const response = await apiPost("/api/auth/verify-otp/", {
      'phone_number': phone_number,
      'otp': otp
    });
    const session = await encrypt(response);
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  } catch (error) {
    return null;
  }
}
