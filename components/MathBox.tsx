import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  border: boolean
}

const MathBox = ({ children, border = true }: Props) => (
  <div
    className={`${border ? 'border border-solid border-gray-300' : ''} p-3  text-base`}
  >
    {children}
  </div>
)

export default MathBox
