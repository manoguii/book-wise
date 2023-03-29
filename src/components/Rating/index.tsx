import Rating from '@mui/material/Rating'
import { useState } from 'react'

export default function BasicRating() {
  const [value, setValue] = useState<number | null>(2)

  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      sx={{
        svg: {
          color: '#8381D9',
        },
      }}
    />
  )
}
