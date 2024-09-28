import { Star } from "../star";

interface RateProps {
  numberRate: number;
}

const Rate: React.FC<RateProps> = ({ numberRate }) => {
  console.log(numberRate);
  const fullStars = Math.floor(numberRate);

  const hasHalfStar = numberRate - fullStars >= 0.5;

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-3">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} filled={true} halfFilled={false} />
      ))}
      {hasHalfStar && <Star filled={false} halfFilled={true} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i + fullStars + 1} filled={false} halfFilled={false} />
      ))}
    </div>
  );
};

export default Rate;
