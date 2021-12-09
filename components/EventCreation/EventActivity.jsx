import { Button } from '@mui/material';

export default function EventActivity({ stage, setStage }) {
  return (
    <>
      <p>Event Activity</p>
      <p>{`Step ${stage} of 4`}</p>
      <Button variant="outlined" onClick={() => setStage(stage - 1)}>
        Back
      </Button>
      <Button variant="outlined" onClick={() => setStage(stage + 1)}>
        Next
      </Button>
    </>
  );
}
