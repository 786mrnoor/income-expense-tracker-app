import useTitle from "@/hooks/use-title";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router";
import {
  transactionBaseSchema,
  type TransactionBaseSchema,
} from "@/schemas/transactions/base.schema";
import { ErrorScreen } from "@/components/error-screen";
import { UpdateForm } from "./UpdateForm";

export default function EditTransactionPage() {
  useTitle("Add Transaction");

  const { id } = useParams();
  const navigate = useNavigate();

  let transactionId: TransactionBaseSchema["id"];

  const result = transactionBaseSchema.shape.id.safeParse(id);
  if (result.success) {
    transactionId = result.data;
  } else {
    navigate("/");
    return;
  }

  return (
    <div className="my-container p-3 p-lg-4 index-page">
      <ErrorScreen>
        <Suspense>
          <UpdateForm id={transactionId} />
        </Suspense>
      </ErrorScreen>
    </div>
  );
}
