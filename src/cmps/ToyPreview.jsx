import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth:350, mb:'15px', mr:'15px' }}>
      <CardContent>
        <Typography sx={{ fontSize: '1rem' }} color="text.secondary" gutterBottom>
         {toy.name}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }} color="text.secondary" gutterBottom>
        Price: {toy.price}
        </Typography>
        <Typography sx={{ mb: 1.5 ,fontSize: '0.8rem' }}  color="text.secondary">
          {toy.inStock? 'In Stock' : 'Out Of Stock'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ backgroundColor:'#ee9b00',
         color:'black',
         '&:hover': {
           backgroundColor: '#ae2012',
           color:'white'
         }
   }} onClick={() =>onRemoveToy(toy._id) } size="small">Delete</Button>
        <Button  sx={{ backgroundColor:'#ee9b00',
         color:'black',
         '&:hover': {
           backgroundColor: '#ae2012',
           color:'white'
         }
   }}
   size="small" > <Link to={`/toy/${toy._id}`}>Details</Link></Button>
        <Button  sx={{ backgroundColor:'#ee9b00',
         color:'black',
         '&:hover': {
           backgroundColor: '#ae2012',
           color:'white'
         }
         
   }}
    size="small"> <Link to={`/toy/Edit/${toy._id}`}>Edit</Link></Button>
      </CardActions>
    </Card>
  );
}