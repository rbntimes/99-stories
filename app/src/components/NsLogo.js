import React from 'react';
import styled from 'styled-components';

const Logo = styled.svg`
  width: 52px;
  height: 20px;
`

export default function({
  color,
  width = 52,
  height = 20,
}) {
  return (
    <Logo viewBox={`0 0 ${width} ${height}`}>
    	<g>
    		<path
          fill={color} 
          d="M25.4,18.4c1,1,2.4,1.6,4,1.6h11.8l10-10l-10-10h-5.6l8,8H32.8c-0.4,0-0.8-0.2-1.2-0.4l-5.8-6
    			c-1-1-2.4-1.6-4-1.6H10L0,10l10,10h5.6l-8-8h10.8c0.4,0,0.8,0.2,1.2,0.4L25.4,18.4z M22.4,9.6c-1-1-2.4-1.6-4-1.6H7.6l4-4h10.2
    			c0.4,0,0.8,0.2,1.2,0.4l5.8,6c1,1,2.4,1.6,4,1.6h10.8l-4,4H29.4c-0.4,0-0.8-0.2-1.2-0.4L22.4,9.6z"/>
    	</g>
    </Logo>
  )
}
