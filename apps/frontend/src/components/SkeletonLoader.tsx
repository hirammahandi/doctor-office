import { Skeleton } from "@mui/material";

type Props = {
  isLoading: boolean;
  component: JSX.Element;
};

const SkeletonLoader = ({ isLoading, component }: Props) => {
  return isLoading ? <Skeleton variant="rounded" /> : component;
};

export default SkeletonLoader;
