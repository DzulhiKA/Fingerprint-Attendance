import User from '@/model/user';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
  
    const users = await User.destroy({
      where: { id: params.id },
    });
  
    return NextResponse.json({
      success: true,
      message: "Delete Data User successfully",
      data: users,
    })};