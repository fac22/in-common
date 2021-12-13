import {
  Button,
  Container,
  Card,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import moment from 'moment';

export default function EventSummary({
  stage,
  setStage,
  setNewEvent,
  newEvent,
  stages,
}) {
  const handleChange = (e) => {
    setNewEvent((oldEvent) => ({ ...oldEvent, notes: e.target.value }));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Card
        sx={{
          minWidth: 275,
          padding: 5,
          borderRadius: 3,
          mt: 5,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h8">{`Step ${stage} of ${stages}`}</Typography>
          <Typography variant="h6">Event Summary</Typography>
          <p>{`${newEvent.activity} at ${newEvent.location}`}</p>
          <p>Group size: {newEvent.size} people</p>
          <p>Proposed dates:</p>
          {newEvent.date.map((date, i) => (
            <p key={i}>{`${moment(date).format('LLL')}`}</p>
          ))}
          <TextField
            id="notes-label"
            label="Add notes"
            value={newEvent.notes}
            multiline
            rows={6}
            onChange={handleChange}
          />
          <Button
            sx={{ padding: 1.85 }}
            variant="outlined"
            onClick={() => setStage(stage - 1)}
          >
            Back
          </Button>
          <Button
            sx={{ padding: 1.85 }}
            variant="outlined"
            onClick={() => {
              console.log('submit');
              console.log({ newEvent });
            }}
          >
            Submit
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}
