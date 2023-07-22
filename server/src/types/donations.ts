export interface Donation {
  donorId: string;
  donationType: "In kind" | "Money";
  ammount: number;
  description: string;
}
