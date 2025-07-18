import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;

  if (!token || !token.value) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/ruleChain/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error deleteing ruleChain" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "RuleChain deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  const {
    connections,
    firstNodeIndex,
    nodes,
    ruleChainConnections,
    ruleChainId,
    version,
  } = await req.json();

  const finalData = {
    ruleChainId,
    firstNodeIndex,
    version,
    nodes,
    connections,
    ruleChainConnections,
  };

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/ruleChain/metadata`,
      {
        method: "POST",
        body: JSON.stringify(finalData),
        headers: {
          "Content-type": "application/json",
          'x-custom-lang': 'fa',
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
        { message: data.message },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "RuleChain updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
