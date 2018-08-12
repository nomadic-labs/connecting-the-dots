import React from 'react'

const PartnerLogo = props => {
  return (
    <div className="col-xs-12 col-sm-3 col-md-3 text-center no-margin-bottom xs-margin-nineteen xs-no-margin-lr xs-no-margin-top logo-container">
      <img src={props.imageSrc} alt={props.name} />
      <span className="text-uppercase text-small display-block letter-spacing-2 margin-twelve no-margin-bottom black-text xs-margin-three xs-no-margin-lr xs-no-margin-bottom">{props.name}</span>
    </div>
  )
}

export default PartnerLogo;