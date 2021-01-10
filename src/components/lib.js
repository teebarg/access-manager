/** @jsx jsx */
import {jsx} from '@emotion/react'

import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import * as colors from '../styles/colors'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

export const Centered = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
})

export const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

export const AccessListUL = styled.ul({
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridGap: '1em',
})

export function Spinner(props) {
  return (
    <FaSpinner
      css={{animation: `${spin} 1s linear infinite`}}
      aria-label="loading"
      {...props}
    />
  )
}

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}
export const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

export const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px'
})

export const FormInput = styled.input({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '2px',
  border: 'none',
  borderBottom: '1px solid #E0E0E0',
  boxShadow: '0 1px 5px -2px rgba(0,0,0,.2)',
  height: '20px',
  minWidth: '20vw',
  '&:focus': {
    boxShadow: '0 1px 5px -2px #42A5F5',
    borderBottom: '1px solid #2196F3'
  }
})

export const FormSelect = styled.select({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '2px',
  border: 'none',
  borderBottom: '1px solid #E0E0E0',
  boxShadow: '0 1px 5px -2px rgba(0,0,0,.2)',
  height: '30px',
  '&:focus': {
    boxShadow: '0 1px 5px -2px #42A5F5',
    borderBottom: '1px solid #2196F3'
  }
})

export const Label = styled.label({
  marginBottom: '5px'
})

export function FullPageSpinner() {
  return (
    <div css={{marginTop: '3em', fontSize: '4em'}}>
      <Spinner />
    </div>
  )
}
