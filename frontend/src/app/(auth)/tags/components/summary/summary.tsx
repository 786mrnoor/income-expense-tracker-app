import { SummaryContainer } from "@/components/summary/summary";
import { useAppSelector } from "@/redux/hooks";
import { selectTags } from "@/redux/tag/tag.selectors";
import formatAmount from "@/utils/format-amount";

export default function Summary() {
  const tags = useAppSelector(selectTags);

  const summary = tags.reduce(
    (acc, item) => {
      acc.total += item.balance;

      if (item.balance > 0)
        acc.positive += item.balance;
      else
        acc.negative += item.balance;

      return acc;
    },
    { total: 0, positive: 0, negative: 0 }
  );

  return (
    <SummaryContainer>
      <li>
        <p>Total Balance</p>
        <h2 className='text-success'>{formatAmount(summary.total)}</h2>
      </li>
      <li className='text-danger'>
        <p>Negative Balance</p>
        <h2>₹{Math.abs(summary.negative)}</h2>
      </li>
      <li className='text-success'>
        <p>Positive Balance</p>
        <h2>₹{summary.positive}</h2>
      </li>
    </SummaryContainer>
  )
};
