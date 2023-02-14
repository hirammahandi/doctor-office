import { IMedicalRecord } from "@common/lib";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { formatDate } from "../shared";

type Props = {
  medicalRecord: Omit<IMedicalRecord, "patient">;
};

const MedicalRecordCard = ({ medicalRecord }: Props) => {
  const { updatedAt, description } = medicalRecord;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-label="Expand"
        aria-controls="medical-record-content"
        id="medical-record-header"
      >
        <Typography>{formatDate(updatedAt)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </AccordionDetails>
    </Accordion>
  );
};

export default MedicalRecordCard;
