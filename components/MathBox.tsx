import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  border: boolean
}

const MathBox = ({ children, border = true }: Props) => (
  <div
    className={`${border ? 'border border-solid border-black' : ''} p-3 font-latin-roman text-base`}
  >
    {children}
  </div>
)

export default MathBox
