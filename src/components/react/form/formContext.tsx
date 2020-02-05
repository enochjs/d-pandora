import React from 'react'
import { FormProps } from './interface'

const FormContext: React.Context<FormProps> = React.createContext({} as any)

export default FormContext
