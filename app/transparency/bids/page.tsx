import { Metadata } from "next";
import BidsClient from "./BidsClient";

export const metadata: Metadata = {
  title: "Bids & Awards",
  description:
    "Invitations to bid, notices of award, and notices to proceed from the Bids and Awards Committee of the City Government of Dipolog, with direct links to the city's PDFs.",
};

export default function BidsPage() {
  return <BidsClient />;
}
