import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const idInt = Number(context.params.id);
    if (isNaN(idInt)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // چک کن که آیا پلن وجود دارد یا نه
    const existingPlan = await prisma.plan.findUnique({
      where: { id: idInt },
    });

    if (!existingPlan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    const deletedPlan = await prisma.plan.delete({
      where: { id: idInt },
    });

    return NextResponse.json(
      { message: "Plan deleted successfully", deletedPlan },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong, ${error.message}` },
      { status: 500 }
    );
  }
}
