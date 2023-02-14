import { Button } from "@mui/material";
import Link from "next/link";

type Props = {
  href: string;
  textContent: string;
};

const LinkButton = ({ href, textContent }: Props) => (
  <Button LinkComponent={Link} variant="outlined" color="primary" href={href}>
    {textContent}
  </Button>
);

export default LinkButton;
