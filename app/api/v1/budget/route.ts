import { NextResponse } from "next/server";
import { BudgetSchema } from "@/validations/budgetSchema";
import rawBudgetData from "@/data/dipolog/budget.json";

const budgetData = BudgetSchema.parse(rawBudgetData);

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      meta: {
        total: budgetData.years.length,
        lastUpdated: new Date().toISOString(),
        source: "BetterDipolog Open Data API",
        description:
          "Dipolog City annual revenue and expenditure breakdown (PHP millions), sourced from BLGF's Statement of Receipts and Expenditures by LGU.",
      },
      data: budgetData,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
