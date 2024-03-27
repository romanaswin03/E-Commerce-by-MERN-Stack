import React from 'react'
import { Helmet } from 'react-helmet-async'

function Metadata({title}) {
  return (
   <Helmet>
    <title>{`${title} - ShopppingCart`}</title>
   </Helmet>
  )
}

export default Metadata
