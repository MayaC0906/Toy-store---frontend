
// export function ToyList({ toys, onRemoveToy }) {
//   return (
//     <section className="toy-list">
//       {toys.map((toy) => (
//         <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
//       ))}
//     </section>
//   )
// }
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ToyPreview } from './ToyPreview';

export function ToyList({ toys, onRemoveToy }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '40px',
          mt: '15px'
        }}
      >
        {toys.map((toy) => (
          <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
        ))}
      </Container>
    </React.Fragment>
  );
}
